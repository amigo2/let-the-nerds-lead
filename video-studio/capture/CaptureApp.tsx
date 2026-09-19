import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Player, type PlayerRef } from '@remotion/player'
import { SceneRenderer } from '../src/scenes/SceneRenderer'
import { FPS, HEIGHT, WIDTH } from '../src/theme'
import type { GuideSpec, Scene } from '../src/types'
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

export const CaptureApp: React.FC = () => {
  const [shot, setShot] = useState(0)
  const [beat, setBeat] = useState(1)      // how many things are showing
  const [arrivedAt, setArrivedAt] = useState(0) // when the newest one landed
  const playerRef = useRef<PlayerRef>(null)

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

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      padding: '20px 24px 0', gap: 14, overflow: 'hidden',
    }}>
      <Player
        ref={playerRef}
        component={SceneRenderer}
        inputProps={{ scene: live }}
        durationInFrames={CANVAS_FRAMES}
        fps={FPS}
        compositionWidth={WIDTH}
        compositionHeight={HEIGHT}
        style={{ width: '100%', flexShrink: 0, borderRadius: 12, overflow: 'hidden' }}
      />

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', fontSize: 19, lineHeight: 1.6, color: '#CBD5E1' }}>
        {scene.script}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        borderTop: '1px solid #1E293B', padding: '12px 0 16px', flexShrink: 0,
      }}>
        <button onClick={back} disabled={isFirst} style={arrow(isFirst)}>←</button>
        <button onClick={forward} disabled={isLast} style={arrow(isLast)}>→</button>
        <span style={{ fontSize: 14, color: '#94A3B8' }}>
          Shot {shot + 1} of {total}
          <span style={{ color: '#475569' }}>
            {beats > 1 ? ` · ${beat} of ${beats}` : ''} · {scene.id}
          </span>
        </span>
      </div>
    </div>
  )
}

const arrow = (disabled: boolean): React.CSSProperties => ({
  padding: '10px 22px', borderRadius: 8, border: '1px solid #334155',
  background: '#0F172A', color: disabled ? '#334155' : '#F1F5F9',
  fontSize: 18, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
})
