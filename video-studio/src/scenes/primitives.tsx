import React from 'react'
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import type { Scene } from '../types'
import { theme } from '../theme'

/** Shared bits every scene kind uses, so 65 videos look like one course. */

export const at = (seconds: number, fps: number) => Math.round(seconds * fps)

/** Fade in and rise a few pixels. Nothing spins. */
export function useEntrance(appearAtSeconds: number) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const progress = spring({
    frame: frame - at(appearAtSeconds, fps),
    fps,
    config: { damping: 200, mass: 0.6 },
  })
  return {
    progress,
    opacity: interpolate(progress, [0, 1], [0, 1]),
    lift: interpolate(progress, [0, 1], [18, 0]),
  }
}

/** The board: background, grid, heading, voiceover. */
export const Stage: React.FC<{ scene: Scene; children: React.ReactNode }> = ({ scene, children }) => {
  const heading = useEntrance(0)
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        fontFamily: theme.font,
        backgroundImage: `
          linear-gradient(${theme.bgGrid} 1px, transparent 1px),
          linear-gradient(90deg, ${theme.bgGrid} 1px, transparent 1px)
        `,
        backgroundSize: `${theme.gridSize}px ${theme.gridSize}px`,
      }}
    >
      {/* The voiceover. Its length is what set this scene's duration — see Root.tsx. */}
      {scene.audio && <Audio src={staticFile(`audio/${scene.audio}`)} />}

      {scene.heading && (
        <div
          style={{
            position: 'absolute', top: 88, width: '100%', textAlign: 'center',
            color: theme.text, fontSize: 52, fontWeight: 700, opacity: heading.opacity,
          }}
        >
          {scene.heading}
        </div>
      )}

      {children}

      {scene.footer && <Footer text={scene.footer.text} appearAt={scene.footer.appearAt} />}
    </AbsoluteFill>
  )
}

export const Footer: React.FC<{ text: string; appearAt: number }> = ({ text, appearAt }) => {
  const { opacity } = useEntrance(appearAt)
  return (
    <div
      style={{
        position: 'absolute', bottom: 120, width: '100%', textAlign: 'center',
        color: theme.textMuted, fontSize: 38, fontWeight: 500, opacity,
      }}
    >
      {text}
    </div>
  )
}
