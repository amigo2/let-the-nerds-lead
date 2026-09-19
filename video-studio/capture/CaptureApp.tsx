import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Player, type PlayerRef } from '@remotion/player'
import { SceneRenderer } from '../src/scenes/SceneRenderer'
import { FPS, HEIGHT, WIDTH, theme } from '../src/theme'
import type { GuideSpec, Scene } from '../src/types'
import { Interactive } from './Interactive'
import rawSpec from '../scenes/guide-01.json'

/**
 * Cue capture.
 *
 * Instead of guessing `appearAt` values and then recording a voiceover that has
 * to match them, you play the scene, read the script aloud, and tap SPACE at the
 * moment each element should land. The performance writes the timings.
 *
 * The clock is the Player's own frame counter, not wall time, so a captured cue
 * is exactly the frame the rendered video will show it on.
 */

const UNFIRED = 10_000
const TAIL_SECONDS = 1.2
const CAPTURE_LIMIT_FRAMES = 60 * FPS

const spec = rawSpec as unknown as GuideSpec

interface Cue {
  id: string
  kind: 'node' | 'edge' | 'row' | 'step' | 'footer'
  label: string
}

function cuesOf(scene: Scene): Cue[] {
  return [
    ...(scene.nodes ?? []).map((n): Cue => ({ id: n.id, kind: 'node', label: n.label })),
    ...(scene.edges ?? []).map((e): Cue => ({ id: e.id, kind: 'edge', label: e.label ?? e.id })),
    ...(scene.rows ?? []).map((r, i): Cue => ({ id: `row-${i}`, kind: 'row', label: r.cells[0] })),
    ...(scene.steps ?? []).map((st, i): Cue => ({ id: `step-${i}`, kind: 'step', label: st.text })),
    ...(scene.footer ? [{ id: '__footer', kind: 'footer' as const, label: scene.footer.text }] : []),
  ]
}

/** The scene as it should look given the cues fired so far. */
function withCues(scene: Scene, fired: Record<string, number>): Scene {
  return {
    ...scene,
    audio: undefined, // during capture you are the audio
    nodes: scene.nodes?.map((n) => ({ ...n, appearAt: fired[n.id] ?? UNFIRED })),
    edges: scene.edges?.map((e) => ({ ...e, appearAt: fired[e.id] ?? UNFIRED })),
    rows: scene.rows?.map((r, i) => ({ ...r, appearAt: fired[`row-${i}`] ?? UNFIRED })),
    steps: scene.steps?.map((st, i) => ({ ...st, appearAt: fired[`step-${i}`] ?? UNFIRED })),
    footer: scene.footer ? { ...scene.footer, appearAt: fired.__footer ?? UNFIRED } : undefined,
  }
}

export const CaptureApp: React.FC = () => {
  const [sceneIndex, setSceneIndex] = useState(0)
  const scene = spec.scenes[sceneIndex]
  const cues = useMemo(() => cuesOf(scene), [scene])

  const [fired, setFired] = useState<Record<string, number>>({})
  const [running, setRunning] = useState(false)
  const [saved, setSaved] = useState<string | null>(null)
  const [mode, setMode] = useState<'video' | 'interactive'>('video')
  const playerRef = useRef<PlayerRef>(null)

  const nextCue = cues.find((c) => fired[c.id] === undefined)

  /** Every moment something appears in the scene as specced, in order. */
  const marks = useMemo(() => {
    const times = [
      ...(scene.nodes ?? []).map((n) => n.appearAt),
      ...(scene.edges ?? []).map((e) => e.appearAt),
      ...(scene.rows ?? []).map((r) => r.appearAt),
      ...(scene.steps ?? []).map((st) => st.appearAt),
      ...(scene.footer ? [scene.footer.appearAt] : []),
    ].filter((t) => t < 9000)
    return Array.from(new Set([0, ...times])).sort((a, b) => a - b)
  }, [scene])

  const [mark, setMark] = useState(0)

  /** Move to a moment and park there. Review, not playback. */
  const goToMark = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(marks.length - 1, i))
    setMark(clamped)
    playerRef.current?.pause()
    // A shade past the cue, so the thing that lands on it has actually landed.
    playerRef.current?.seekTo(Math.round((marks[clamped] + 0.45) * FPS))
  }, [marks])
  const liveScene = useMemo(() => withCues(scene, fired), [scene, fired])

  const start = useCallback(() => {
    setFired({})
    setSaved(null)
    setRunning(true)
    playerRef.current?.seekTo(0)
    playerRef.current?.play()
  }, [])

  const stop = useCallback(() => {
    setRunning(false)
    playerRef.current?.pause()
  }, [])

  const fire = useCallback(() => {
    if (!running || !nextCue) return
    const frame = playerRef.current?.getCurrentFrame() ?? 0
    setFired((prev) => ({ ...prev, [nextCue.id]: Number((frame / FPS).toFixed(2)) }))
  }, [running, nextCue])

  const goTo = useCallback((i: number) => {
    if (i < 0 || i >= spec.scenes.length) return
    setSceneIndex(i)
    setFired({})
    setSaved(null)
    setRunning(false)
    setMark(0)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Arrows always step through the scene. This is the everyday interaction.
      if (e.code === 'ArrowRight') { e.preventDefault(); goToMark(mark + 1) }
      if (e.code === 'ArrowLeft') { e.preventDefault(); goToMark(mark - 1) }
      // SPACE only means anything during a take, and a take only starts on Enter.
      if (e.code === 'Space' && running) { e.preventDefault(); fire() }
      if (e.code === 'Enter') { e.preventDefault(); running ? stop() : start() }
      if (!running && e.code === 'BracketLeft') { e.preventDefault(); goTo(sceneIndex - 1) }
      if (!running && e.code === 'BracketRight') { e.preventDefault(); goTo(sceneIndex + 1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fire, running, start, stop, goTo, sceneIndex, goToMark, mark])

  // Once every cue has landed, the take is over.
  useEffect(() => {
    if (running && cues.every((c) => fired[c.id] !== undefined)) stop()
  }, [running, cues, fired, stop])

  const lastCue = Math.max(0, ...Object.values(fired))
  const duration = Number((lastCue + TAIL_SECONDS).toFixed(2))
  const complete = cues.every((c) => fired[c.id] !== undefined)

  const save = async () => {
    const updated: GuideSpec = {
      ...spec,
      scenes: spec.scenes.map((s, i) =>
        i !== sceneIndex
          ? s
          : {
              ...s,
              durationSeconds: duration,
              nodes: s.nodes?.map((n) => ({ ...n, appearAt: fired[n.id] ?? n.appearAt })),
              edges: s.edges?.map((e) => ({ ...e, appearAt: fired[e.id] ?? e.appearAt })),
              rows: s.rows?.map((r, i) => ({ ...r, appearAt: fired[`row-${i}`] ?? r.appearAt })),
              steps: s.steps?.map((st, i) => ({ ...st, appearAt: fired[`step-${i}`] ?? st.appearAt })),
              footer: s.footer ? { ...s.footer, appearAt: fired.__footer ?? s.footer.appearAt } : undefined,
            },
      ),
    }
    const res = await fetch('/__write-spec', {
      method: 'POST',
      body: JSON.stringify({ file: 'guide-01.json', contents: updated }),
    })
    const json = await res.json()
    setSaved(json.ok ? `saved → ${json.target}` : `failed: ${json.error}`)
  }

  const saveAndNext = async () => {
    await save()
    goTo(sceneIndex + 1)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', height: '100%', overflow: 'hidden' }}>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0, overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['video', 'interactive'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '7px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
                border: '1px solid #334155',
                background: mode === m ? '#2563EB' : '#0F172A',
                color: mode === m ? 'white' : '#94A3B8',
              }}
            >
              {m === 'video' ? 'Video — as it renders' : 'Interactive — as the student gets it'}
            </button>
          ))}
        </div>

        {mode === 'video' ? (
          <Player
            ref={playerRef}
            component={SceneRenderer}
            inputProps={{ scene: liveScene }}
            durationInFrames={CAPTURE_LIMIT_FRAMES}
            fps={FPS}
            compositionWidth={WIDTH}
            compositionHeight={HEIGHT}
            style={{ width: '100%', borderRadius: 12, overflow: 'hidden' }}
            controls
          />
        ) : (
          <div style={{ height: 520 }}><Interactive scene={scene} /></div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => goToMark(mark - 1)} disabled={mark === 0} style={navBtn}>
            ‹ Previous
          </button>
          <button
            onClick={() => goToMark(mark + 1)}
            disabled={mark >= marks.length - 1}
            style={{ ...navBtn, background: mark >= marks.length - 1 ? '#0F172A' : '#2563EB', borderColor: 'transparent' }}
          >
            Next ›
          </button>
          <span style={{ fontSize: 13, color: '#64748B' }}>
            step {mark + 1} of {marks.length} · at {marks[mark]?.toFixed(1)}s · ← → arrows
          </span>
          <button onClick={() => playerRef.current?.play()} style={{ ...navBtn, marginLeft: 'auto' }}>
            ▶ Play it through
          </button>
        </div>

        <div style={{ fontSize: 21, lineHeight: 1.65, color: '#CBD5E1', overflowY: 'auto' }}>
          <div style={{ fontSize: 13, letterSpacing: 2, color: '#64748B', marginBottom: 8 }}>
            READ THIS ALOUD
          </div>
          {scene.script ?? <em>No script in the spec for this scene.</em>}
        </div>
      </div>

      <div style={{ borderLeft: '1px solid #1E293B', padding: 20, display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0, overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button onClick={() => goTo(sceneIndex - 1)} disabled={sceneIndex === 0} style={stepBtn}>‹</button>
          <select
            value={sceneIndex}
            onChange={(e) => goTo(Number(e.target.value))}
            style={{ flex: 1, padding: 8, borderRadius: 8, background: '#0F172A', color: '#F1F5F9', border: '1px solid #334155' }}
          >
            {spec.scenes.map((s, i) => (
              <option key={s.id} value={i}>{s.shot ? `Shot ${s.shot} — ` : ''}{s.id}</option>
            ))}
          </select>
          <button onClick={() => goTo(sceneIndex + 1)} disabled={sceneIndex === spec.scenes.length - 1} style={stepBtn}>›</button>
        </div>
        <div style={{ fontSize: 12, color: '#64748B', textAlign: 'center' }}>
          shot {sceneIndex + 1} of {spec.scenes.length} · <b>[</b> and <b>]</b> to move
        </div>

        <div style={{ borderTop: '1px solid #1E293B', paddingTop: 12, marginTop: 4 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.5, color: '#475569', fontWeight: 700 }}>
            RE-TIME THIS SHOT
          </div>
          <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 3, lineHeight: 1.45 }}>
            Only if you want to change when things land. Reads aloud, taps SPACE.
          </div>
        </div>

        <button
          onClick={running ? stop : start}
          style={{
            padding: '14px 18px', fontSize: 17, fontWeight: 700, borderRadius: 10, cursor: 'pointer',
            border: 'none', background: running ? '#DC2626' : '#2563EB', color: 'white',
          }}
        >
          {running ? '● RECORDING — stop (Enter)' : 'Start take  (Enter)'}
        </button>

        <div style={{ fontSize: 13.5, color: '#94A3B8', lineHeight: 1.5 }}>
          {running
            ? <>Hit <b>SPACE</b> as you say each line. The cue lands on the frame you tap.</>
            : <>Hit <b>SPACE</b> to begin — then <b>SPACE</b> again for each cue as you read.</>}
        </div>

        {nextCue && (
          <div style={{ padding: 14, borderRadius: 10, background: '#1E3A5F', border: '1px solid #38BDF8' }}>
            <div style={{ fontSize: 12, letterSpacing: 1.5, color: '#7DD3FC' }}>NEXT CUE</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>{nextCue.label}</div>
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cues.map((c) => {
            const done = fired[c.id] !== undefined
            const isNext = nextCue?.id === c.id
            return (
              <div key={c.id} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 6px',
                borderBottom: '1px solid #1E293B', borderRadius: 6,
                background: isNext ? '#14263D' : 'transparent',
                opacity: done || isNext ? 1 : 0.45,
              }}>
                <span style={{ color: done ? '#34D399' : '#475569', fontSize: 13, width: 14 }}>
                  {done ? '✓' : '○'}
                </span>
                <span style={{
                  fontSize: 13, flex: 1, minWidth: 0,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {c.label}
                </span>
                <span style={{
                  fontVariantNumeric: 'tabular-nums', fontSize: 13, flexShrink: 0,
                  color: done ? '#38BDF8' : '#475569',
                }}>
                  {done ? `${fired[c.id].toFixed(2)}s` : '—'}
                </span>
              </div>
            )
          })}
        </div>

        <div style={{ fontSize: 14, color: '#94A3B8' }}>
          Scene length: <b style={{ color: '#F1F5F9' }}>{complete ? `${duration}s` : '—'}</b>
          {complete && <span style={{ color: '#64748B' }}> (last cue + {TAIL_SECONDS}s tail)</span>}
        </div>

        <button
          onClick={save}
          disabled={!complete}
          style={{
            padding: '12px 16px', fontSize: 15, fontWeight: 600, borderRadius: 10,
            border: '1px solid #334155', background: complete ? '#14432F' : '#0F172A',
            color: complete ? '#D1FAE5' : '#475569', cursor: complete ? 'pointer' : 'not-allowed',
          }}
        >
          Save timings to spec
        </button>

        <button
          onClick={saveAndNext}
          disabled={!complete || sceneIndex === spec.scenes.length - 1}
          style={{
            padding: '12px 16px', fontSize: 15, fontWeight: 700, borderRadius: 10,
            border: 'none', background: complete && sceneIndex < spec.scenes.length - 1 ? '#2563EB' : '#0F172A',
            color: complete && sceneIndex < spec.scenes.length - 1 ? 'white' : '#475569',
            cursor: complete && sceneIndex < spec.scenes.length - 1 ? 'pointer' : 'not-allowed',
          }}
        >
          Save &amp; next shot →
        </button>

        {saved && <div style={{ fontSize: 12, color: '#34D399', wordBreak: 'break-all' }}>{saved}</div>}
      </div>
    </div>
  )
}

const navBtn: React.CSSProperties = {
  padding: '9px 16px', borderRadius: 8, border: '1px solid #334155',
  background: '#0F172A', color: '#F1F5F9', fontSize: 14, cursor: 'pointer',
  fontFamily: 'inherit',
}

const stepBtn: React.CSSProperties = {
  padding: '8px 12px', borderRadius: 8, border: '1px solid #334155',
  background: '#0F172A', color: '#F1F5F9', fontSize: 15, cursor: 'pointer',
}
