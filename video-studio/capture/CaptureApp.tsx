import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Player, type PlayerRef } from '@remotion/player'
import { SceneRenderer } from '../src/scenes/SceneRenderer'
import { FPS, HEIGHT, WIDTH } from '../src/theme'
import type { GuideSpec, Scene } from '../src/types'
import { Interactive } from './Interactive'
import { startRecording, toBase64, type Recording } from './recorder'
import rawSpec from '../scenes/guide-01.json'

/**
 * The lesson, driven by arrow keys.
 *
 * It opens on the title card. → reveals the next thing; when a shot has nothing
 * left to reveal, → moves to the next shot. ← walks back. That is everything.
 *
 * Built for practising the read: the script for the current shot sits under the
 * picture, and you set the pace yourself.
 */

const UNFIRED = 10_000
const CANVAS_FRAMES = 90 * FPS

const spec = rawSpec as unknown as GuideSpec

interface Cue {
  id: string
  label: string
}

/** What is coming, in the order it arrives. */
function cuesOf(scene: Scene): Cue[] {
  return [
    ...(scene.nodes ?? []).map((n) => ({ id: n.id, label: n.label })),
    ...(scene.edges ?? []).map((e) => ({ id: e.id, label: e.label ?? e.id })),
    ...(scene.rows ?? []).map((r, i) => ({ id: `row-${i}`, label: r.cells[0] })),
    ...(scene.steps ?? []).map((st, i) => ({ id: `step-${i}`, label: st.text })),
    ...(scene.footer ? [{ id: '__footer', label: scene.footer.text }] : []),
  ]
}

function cueIdsOf(scene: Scene): string[] {
  return [
    ...(scene.nodes ?? []).map((n) => n.id),
    ...(scene.edges ?? []).map((e) => e.id),
    ...(scene.rows ?? []).map((_, i) => `row-${i}`),
    ...(scene.steps ?? []).map((_, i) => `step-${i}`),
    ...(scene.footer ? ['__footer'] : []),
  ]
}

/** How many arrow presses a shot is worth. A title card is one. */
function beatsOf(scene: Scene): number {
  return Math.max(1, cueIdsOf(scene).length)
}

/** The scene with the first `reveal` things shown, the newest one arriving now. */
function reveal(scene: Scene, count: number, now: number): Scene {
  const ids = cueIdsOf(scene)
  const at = (id: string) => {
    const i = ids.indexOf(id)
    if (i < 0 || i >= count) return UNFIRED
    // Everything before the newest is simply already there.
    return i === count - 1 ? now : 0
  }
  return {
    ...scene,
    audio: undefined,
    nodes: scene.nodes?.map((n) => ({ ...n, appearAt: at(n.id) })),
    edges: scene.edges?.map((e) => ({ ...e, appearAt: at(e.id) })),
    rows: scene.rows?.map((r, i) => ({ ...r, appearAt: at(`row-${i}`) })),
    steps: scene.steps?.map((st, i) => ({ ...st, appearAt: at(`step-${i}`) })),
    footer: scene.footer ? { ...scene.footer, appearAt: at('__footer') } : undefined,
  }
}

/** Matches the id Root.tsx registers: shot 2 "client-server" -> S02ClientServer. */
function compositionIdOf(scene: Scene, index: number): string {
  const name = scene.id.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')
  return `S${String(scene.shot ?? index + 1).padStart(2, '0')}${name}`
}

export const CaptureApp: React.FC = () => {
  const [shot, setShot] = useState(0)
  const [beat, setBeat] = useState(1)      // how many things are showing
  const [arrivedAt, setArrivedAt] = useState(0) // when the newest one landed
  const playerRef = useRef<PlayerRef>(null)

  const [rec, setRec] = useState<{ stop: () => Promise<Recording>; cancel: () => void } | null>(null)
  const [take, setTake] = useState<Recording | null>(null)
  const [times, setTimes] = useState<Record<string, number>>({})
  const [status, setStatus] = useState<string | null>(null)
  const [interactive, setInteractive] = useState(false)

  const scene = spec.scenes[shot]
  const beats = beatsOf(scene)
  const live = useMemo(() => reveal(scene, beat, arrivedAt), [scene, beat, arrivedAt])

  const total = spec.scenes.length
  const isFirst = shot === 0 && beat === 1
  const isLast = shot === total - 1 && beat === beats

  const enter = useCallback((index: number, showAll: boolean) => {
    setShot(index)
    setBeat(showAll ? beatsOf(spec.scenes[index]) : 1)
    setArrivedAt(0)
    playerRef.current?.seekTo(0)
    playerRef.current?.play()
  }, [])

  const forward = useCallback(() => {
    if (beat < beats) {
      const frame = playerRef.current?.getCurrentFrame() ?? 0
      setArrivedAt(frame / FPS)
      // While recording, every step is also a cue time — one take, both jobs.
      if (rec) {
        const id = cueIdsOf(scene)[beat]
        if (id) setTimes((prev) => ({ ...prev, [id]: Number((frame / FPS).toFixed(2)) }))
      }
      setBeat((b) => b + 1)
    } else if (shot < total - 1) {
      enter(shot + 1, false)
    }
  }, [beat, beats, shot, total, enter])

  const back = useCallback(() => {
    if (beat > 1) {
      setBeat((b) => b - 1)
      setArrivedAt(0)
    } else if (shot > 0) {
      enter(shot - 1, true)   // step back into the previous shot, fully shown
    }
  }, [beat, shot, enter])

  const record = useCallback(async () => {
    try {
      const handle = await startRecording()
      setTake(null)
      setStatus(null)
      setTimes({ [cueIdsOf(scene)[0] ?? '__first']: 0 })
      setBeat(1)
      setArrivedAt(0)
      playerRef.current?.seekTo(0)
      playerRef.current?.play()
      setRec(handle)
    } catch {
      setStatus('No microphone — check the browser permission')
    }
  }, [scene])

  const stopRecording = useCallback(async () => {
    if (!rec) return
    const result = await rec.stop()
    setRec(null)
    setTake(result)
  }, [rec])

  const discard = useCallback(() => {
    setTake(null)
    setTimes({})
    setStatus(null)
  }, [])

  /** Write the wav beside the guides, and the timings into the spec. */
  const keep = useCallback(async () => {
    if (!take) return
    setStatus('saving…')
    const file = `guide-01/${String(scene.shot ?? shot + 1).padStart(2, '0')}-${scene.id}.wav`

    const audioRes = await fetch('/__write-audio', {
      method: 'POST',
      body: JSON.stringify({ file, base64: await toBase64(take.wav) }),
    })
    if (!(await audioRes.json()).ok) return setStatus('could not write the audio')

    const updated: GuideSpec = {
      ...spec,
      scenes: spec.scenes.map((sc, i) =>
        i !== shot ? sc : {
          ...sc,
          audio: file,
          nodes: sc.nodes?.map((n) => ({ ...n, appearAt: times[n.id] ?? n.appearAt })),
          edges: sc.edges?.map((e) => ({ ...e, appearAt: times[e.id] ?? e.appearAt })),
          rows: sc.rows?.map((r, j) => ({ ...r, appearAt: times[`row-${j}`] ?? r.appearAt })),
          steps: sc.steps?.map((st, j) => ({ ...st, appearAt: times[`step-${j}`] ?? st.appearAt })),
          footer: sc.footer ? { ...sc.footer, appearAt: times.__footer ?? sc.footer.appearAt } : undefined,
        },
      ),
    }
    const specRes = await fetch('/__write-spec', {
      method: 'POST',
      body: JSON.stringify({ file: 'guide-01.json', contents: updated }),
    })
    const json = await specRes.json()
    if (!json.ok) return setStatus(`spec failed: ${json.error}`)
    setTake(null)

    // The take is only really kept once there is a movie with the voice in it.
    setStatus('rendering the shot…')
    const composition = compositionIdOf(scene, shot)
    const started = await fetch('/__render', {
      method: 'POST',
      body: JSON.stringify({ composition, out: `${composition}.mp4` }),
    }).then((r) => r.json())

    const poll = setInterval(async () => {
      const job = await fetch(`/__render?id=${started.id}`).then((r) => r.json())
      if (job.status === 'running') return
      clearInterval(poll)
      setStatus(
        job.status === 'done'
          ? `done — course/video/out/${composition}.mp4`
          : `render failed — ${job.log.split('\n').filter(Boolean).slice(-1)[0] ?? 'see the terminal'}`,
      )
    }, 1500)
  }, [take, scene, shot, times])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight') { e.preventDefault(); forward() }
      if (e.code === 'ArrowLeft') { e.preventDefault(); back() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [forward, back])

  // Start playing so the first thing animates in rather than snapping.
  useEffect(() => { playerRef.current?.play() }, [])

  const cues = useMemo(() => cuesOf(scene), [scene])

  return (
    <div style={{
      height: '100%', display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) 290px',
      gridTemplateRows: 'minmax(0, 1fr) auto auto',
      overflow: 'hidden',
    }}>
      {/* ---- the picture ---- */}
      <main style={{ gridRow: '1 / 2', minWidth: 0, padding: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {interactive ? (
          <div style={{ flex: 1, minHeight: 0 }}><Interactive scene={scene} /></div>
        ) : (
          <Player
            ref={playerRef}
            component={SceneRenderer}
            inputProps={{ scene: live }}
            durationInFrames={CANVAS_FRAMES}
            fps={FPS}
            compositionWidth={WIDTH}
            compositionHeight={HEIGHT}
            style={{ width: '100%', borderRadius: 12, overflow: 'hidden' }}
          />
        )}
      </main>

      {/* ---- what is coming ---- */}
      <aside style={{
        gridRow: '1 / 2', borderLeft: '1px solid #1E293B',
        overflowY: 'auto', padding: '18px 14px',
      }}>
        {spec.scenes.map((sc, i) => {
          const current = i === shot
          const done = i < shot
          return (
            <div key={sc.id} style={{ marginBottom: current ? 10 : 2 }}>
              <div
                onClick={() => !rec && enter(i, false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px',
                  borderRadius: 7, background: current ? '#14263D' : 'transparent',
                  opacity: done ? 0.4 : current ? 1 : 0.6,
                  cursor: rec ? 'not-allowed' : 'pointer',
                }}
              >
                <span style={{
                  fontSize: 11, color: current ? '#38BDF8' : '#475569',
                  fontVariantNumeric: 'tabular-nums', width: 16,
                }}>
                  {String(sc.shot ?? i + 1).padStart(2, '0')}
                </span>
                <span style={{
                  fontSize: 13, flex: 1, minWidth: 0, overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  fontWeight: current ? 700 : 400,
                  color: current ? '#F1F5F9' : '#94A3B8',
                }}>
                  {sc.heading ?? sc.title ?? sc.id}
                </span>
              </div>

              {/* the current shot opens up to show what lands next */}
              {current && cues.length > 1 && (
                <div style={{ marginLeft: 22, marginTop: 4 }}>
                  {cues.map((c, ci) => {
                    const shown = ci < beat
                    const isNext = ci === beat
                    return (
                      <div key={c.id} style={{
                        display: 'flex', alignItems: 'center', gap: 7, padding: '5px 6px',
                        borderRadius: 5, background: isNext ? '#0B2740' : 'transparent',
                        opacity: shown ? 0.55 : isNext ? 1 : 0.35,
                      }}>
                        <span style={{ fontSize: 11, width: 11, color: shown ? '#34D399' : '#475569' }}>
                          {shown ? '✓' : '○'}
                        </span>
                        <span style={{
                          fontSize: 12, flex: 1, minWidth: 0, overflow: 'hidden',
                          textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          color: isNext ? '#E0F2FE' : '#94A3B8',
                        }}>
                          {c.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </aside>

      {/* ---- the script, across the bottom ---- */}
      <section style={{
        gridColumn: '1 / -1', borderTop: '1px solid #1E293B',
        padding: '16px 24px', maxHeight: 190, overflowY: 'auto',
      }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: '#475569', marginBottom: 6 }}>
          READ THIS ALOUD
        </div>
        <div style={{ fontSize: 18, lineHeight: 1.6, color: '#CBD5E1', maxWidth: 1100 }}>
          {scene.script ?? <em style={{ color: '#475569' }}>No script for this shot.</em>}
        </div>
      </section>

      {/* ---- arrows ---- */}
      <footer style={{
        gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 14,
        borderTop: '1px solid #1E293B', padding: '12px 24px',
      }}>
        <button onClick={back} disabled={isFirst} style={arrow(isFirst)}>←</button>
        <button onClick={forward} disabled={isLast} style={arrow(isLast)}>→</button>
        <button
          onClick={() => { playerRef.current?.seekTo(0); playerRef.current?.play() }}
          disabled={interactive}
          style={recBtn('#0F172A', interactive ? '#334155' : '#94A3B8')}
        >
          ▶ Play
        </button>
        <button
          onClick={() => setInteractive((v) => !v)}
          style={recBtn(interactive ? '#2563EB' : '#0F172A', interactive ? 'white' : '#94A3B8')}
        >
          Interactive
        </button>
        <span style={{ fontSize: 14, color: '#94A3B8' }}>
          Shot {shot + 1} of {total}
          <span style={{ color: '#475569' }}>{beats > 1 ? ` · ${beat} of ${beats}` : ''}</span>
        </span>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          {status && <span style={{ fontSize: 12.5, color: '#34D399' }}>{status}</span>}

          {!rec && !take && (
            <button
              onClick={async () => {
                setStatus('rendering the whole lesson…')
                const started = await fetch('/__render', {
                  method: 'POST',
                  body: JSON.stringify({ composition: 'Lesson', out: 'guide-01-lesson.mp4' }),
                }).then((r) => r.json())
                const poll = setInterval(async () => {
                  const job = await fetch(`/__render?id=${started.id}`).then((r) => r.json())
                  if (job.status === 'running') return
                  clearInterval(poll)
                  setStatus(job.status === 'done'
                    ? 'done — course/video/out/guide-01-lesson.mp4'
                    : 'lesson render failed — see the terminal')
                }, 2000)
              }}
              style={recBtn('#0F172A', '#94A3B8')}
            >
              Render lesson
            </button>
          )}

          {take ? (
            <>
              <span style={{ fontSize: 13, color: '#94A3B8' }}>
                take: {take.seconds.toFixed(1)}s
              </span>
              <audio controls src={URL.createObjectURL(take.wav)} style={{ height: 32 }} />
              <button onClick={discard} style={recBtn('#0F172A', '#94A3B8')}>Discard</button>
              <button onClick={keep} style={recBtn('#14432F', '#D1FAE5')}>Keep &amp; render</button>
            </>
          ) : rec ? (
            <button onClick={stopRecording} style={recBtn('#DC2626', 'white')}>
              ● Recording — stop
            </button>
          ) : (
            <button onClick={record} style={recBtn('#0F172A', '#F1F5F9')}>
              ● Record this shot
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}

const recBtn = (bg: string, fg: string): React.CSSProperties => ({
  padding: '9px 15px', borderRadius: 8, border: '1px solid #334155',
  background: bg, color: fg, fontSize: 13.5, cursor: 'pointer',
  fontFamily: 'inherit', fontWeight: 600, whiteSpace: 'nowrap',
})

const arrow = (disabled: boolean): React.CSSProperties => ({
  padding: '10px 22px', borderRadius: 8, border: '1px solid #334155',
  background: '#0F172A', color: disabled ? '#334155' : '#F1F5F9',
  fontSize: 18, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
})
