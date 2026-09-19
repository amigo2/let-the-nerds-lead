import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Player, type PlayerRef } from '@remotion/player'
import { SceneRenderer } from '../src/scenes/SceneRenderer'
import { FPS, HEIGHT, WIDTH } from '../src/theme'
import type { GuideSpec, Scene } from '../src/types'
import { Interactive } from './Interactive'
import rawSpec from '../scenes/guide-01.json'

/**
 * Step through a scene with the arrow keys. That is the whole interaction.
 *
 * → reveals the next thing. ← takes it back. Nothing else is needed, and
 * because each press is timestamped against the player's own clock, reading
 * the script aloud while you step *is* the timing pass — there is no separate
 * record mode to remember to turn on.
 */

const UNFIRED = 10_000
const TAIL_SECONDS = 1.2
const CANVAS_FRAMES = 90 * FPS

const spec = rawSpec as unknown as GuideSpec

interface Cue {
  id: string
  label: string
}

function cuesOf(scene: Scene): Cue[] {
  return [
    ...(scene.nodes ?? []).map((n) => ({ id: n.id, label: n.label })),
    ...(scene.edges ?? []).map((e) => ({ id: e.id, label: e.label ?? e.id })),
    ...(scene.rows ?? []).map((r, i) => ({ id: `row-${i}`, label: r.cells[0] })),
    ...(scene.steps ?? []).map((st, i) => ({ id: `step-${i}`, label: st.text })),
    ...(scene.footer ? [{ id: '__footer', label: scene.footer.text }] : []),
  ]
}

/** The scene as it looks given the steps taken so far. */
function withCues(scene: Scene, at: Record<string, number>): Scene {
  return {
    ...scene,
    audio: undefined,
    nodes: scene.nodes?.map((n) => ({ ...n, appearAt: at[n.id] ?? UNFIRED })),
    edges: scene.edges?.map((e) => ({ ...e, appearAt: at[e.id] ?? UNFIRED })),
    rows: scene.rows?.map((r, i) => ({ ...r, appearAt: at[`row-${i}`] ?? UNFIRED })),
    steps: scene.steps?.map((st, i) => ({ ...st, appearAt: at[`step-${i}`] ?? UNFIRED })),
    footer: scene.footer ? { ...scene.footer, appearAt: at.__footer ?? UNFIRED } : undefined,
  }
}

export const CaptureApp: React.FC = () => {
  const [shot, setShot] = useState(0)
  const scene = spec.scenes[shot]
  const cues = useMemo(() => cuesOf(scene), [scene])

  const [at, setAt] = useState<Record<string, number>>({})
  const [mode, setMode] = useState<'video' | 'interactive'>('video')
  const [saved, setSaved] = useState<string | null>(null)
  const playerRef = useRef<PlayerRef>(null)

  const taken = cues.filter((c) => at[c.id] !== undefined).length
  const next = cues[taken]
  const live = useMemo(() => withCues(scene, at), [scene, at])

  const reset = useCallback((i = shot) => {
    setShot(i)
    setAt({})
    setSaved(null)
    playerRef.current?.pause()
    playerRef.current?.seekTo(0)
  }, [shot])

  /** → reveal the next thing, at the moment you asked for it. */
  const forward = useCallback(() => {
    if (!next) return
    if (taken === 0) {
      playerRef.current?.seekTo(0)
      playerRef.current?.play()
      setAt({ [next.id]: 0 })
      return
    }
    const frame = playerRef.current?.getCurrentFrame() ?? 0
    setAt((prev) => ({ ...prev, [next.id]: Number((frame / FPS).toFixed(2)) }))
  }, [next, taken])

  /** ← take the last one back. */
  const back = useCallback(() => {
    if (taken === 0) return
    const last = cues[taken - 1]
    setAt((prev) => {
      const { [last.id]: _drop, ...rest } = prev
      return rest
    })
  }, [cues, taken])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight') { e.preventDefault(); forward() }
      if (e.code === 'ArrowLeft') { e.preventDefault(); back() }
      if (e.code === 'BracketRight') { e.preventDefault(); if (shot < spec.scenes.length - 1) reset(shot + 1) }
      if (e.code === 'BracketLeft') { e.preventDefault(); if (shot > 0) reset(shot - 1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [forward, back, reset, shot])

  const complete = taken === cues.length
  const last = Math.max(0, ...Object.values(at))
  const length = Number((last + TAIL_SECONDS).toFixed(2))

  // Stop the clock once everything has landed, so the timing is what you did.
  useEffect(() => {
    if (complete) playerRef.current?.pause()
  }, [complete])

  const save = async () => {
    const updated: GuideSpec = {
      ...spec,
      scenes: spec.scenes.map((s, i) =>
        i !== shot ? s : {
          ...s,
          durationSeconds: length,
          nodes: s.nodes?.map((n) => ({ ...n, appearAt: at[n.id] ?? n.appearAt })),
          edges: s.edges?.map((e) => ({ ...e, appearAt: at[e.id] ?? e.appearAt })),
          rows: s.rows?.map((r, j) => ({ ...r, appearAt: at[`row-${j}`] ?? r.appearAt })),
          steps: s.steps?.map((st, j) => ({ ...st, appearAt: at[`step-${j}`] ?? st.appearAt })),
          footer: s.footer ? { ...s.footer, appearAt: at.__footer ?? s.footer.appearAt } : undefined,
        },
      ),
    }
    const res = await fetch('/__write-spec', {
      method: 'POST',
      body: JSON.stringify({ file: 'guide-01.json', contents: updated }),
    })
    const json = await res.json()
    setSaved(json.ok ? 'saved' : `failed: ${json.error}`)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', height: '100%', overflow: 'hidden' }}>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0, overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['video', 'interactive'] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} style={{
              padding: '7px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
              border: '1px solid #334155', fontFamily: 'inherit',
              background: mode === m ? '#2563EB' : '#0F172A',
              color: mode === m ? 'white' : '#94A3B8',
            }}>
              {m === 'video' ? 'Video' : 'Interactive'}
            </button>
          ))}
        </div>

        {mode === 'video' ? (
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
        ) : (
          <div style={{ height: 500 }}><Interactive scene={scene} /></div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={back} disabled={taken === 0} style={navBtn}>←</button>
          <button onClick={forward} disabled={!next} style={{
            ...navBtn, flex: 1, fontWeight: 700,
            background: next ? '#2563EB' : '#0F172A', borderColor: 'transparent',
            color: next ? 'white' : '#475569',
          }}>
            {taken === 0 ? 'Start  →' : next ? `Next  →   ${next.label}` : 'Done'}
          </button>
          <span style={{ fontSize: 13, color: '#64748B', whiteSpace: 'nowrap' }}>
            {taken} / {cues.length}
          </span>
        </div>

        <div style={{ fontSize: 20, lineHeight: 1.6, color: '#CBD5E1' }}>
          <div style={{ fontSize: 12, letterSpacing: 2, color: '#64748B', marginBottom: 6 }}>
            READ THIS ALOUD AS YOU STEP
          </div>
          {scene.script ?? <em>No script for this shot.</em>}
        </div>
      </div>

      <div style={{ borderLeft: '1px solid #1E293B', padding: 20, display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0, overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button onClick={() => shot > 0 && reset(shot - 1)} disabled={shot === 0} style={stepBtn}>‹</button>
          <select value={shot} onChange={(e) => reset(Number(e.target.value))} style={{
            flex: 1, padding: 8, borderRadius: 8, background: '#0F172A',
            color: '#F1F5F9', border: '1px solid #334155',
          }}>
            {spec.scenes.map((s, i) => (
              <option key={s.id} value={i}>{s.shot ? `Shot ${s.shot} — ` : ''}{s.id}</option>
            ))}
          </select>
          <button onClick={() => shot < spec.scenes.length - 1 && reset(shot + 1)} disabled={shot === spec.scenes.length - 1} style={stepBtn}>›</button>
        </div>
        <div style={{ fontSize: 12, color: '#64748B', textAlign: 'center' }}>
          <b>←</b> <b>→</b> to step · <b>[</b> <b>]</b> to change shot
        </div>

        <div style={{ flex: 1, overflowY: 'auto', marginTop: 6 }}>
          {cues.map((c, i) => {
            const done = at[c.id] !== undefined
            const isNext = i === taken
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
                <span style={{ fontSize: 13, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {c.label}
                </span>
                <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: 13, flexShrink: 0, color: done ? '#38BDF8' : '#475569' }}>
                  {done ? `${at[c.id].toFixed(1)}s` : '—'}
                </span>
              </div>
            )
          })}
        </div>

        <button onClick={() => reset()} style={stepBtn}>Start over</button>

        <div style={{ fontSize: 13, color: '#94A3B8' }}>
          Length: <b style={{ color: '#F1F5F9' }}>{complete ? `${length}s` : '—'}</b>
        </div>

        <button onClick={save} disabled={!complete} style={{
          padding: '12px 16px', fontSize: 15, fontWeight: 600, borderRadius: 10,
          border: '1px solid #334155', background: complete ? '#14432F' : '#0F172A',
          color: complete ? '#D1FAE5' : '#475569', cursor: complete ? 'pointer' : 'not-allowed',
          fontFamily: 'inherit',
        }}>
          Save timings to spec
        </button>

        {saved && <div style={{ fontSize: 12, color: '#34D399' }}>{saved}</div>}
      </div>
    </div>
  )
}

const navBtn: React.CSSProperties = {
  padding: '11px 16px', borderRadius: 8, border: '1px solid #334155',
  background: '#0F172A', color: '#F1F5F9', fontSize: 14, cursor: 'pointer',
  fontFamily: 'inherit',
}

const stepBtn: React.CSSProperties = {
  padding: '8px 12px', borderRadius: 8, border: '1px solid #334155',
  background: '#0F172A', color: '#F1F5F9', fontSize: 14, cursor: 'pointer',
  fontFamily: 'inherit',
}
