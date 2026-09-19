import React from 'react'
import { Composition, Series, staticFile } from 'remotion'
import { getAudioDurationInSeconds } from '@remotion/media-utils'
import { SceneRenderer } from './scenes/SceneRenderer'
import { FPS, HEIGHT, WIDTH } from './theme'
import type { GuideSpec, Scene } from './types'
import spec from '../scenes/guide-01.json'

const guide = spec as unknown as GuideSpec

/**
 * Decision 3 of the spec: a scene is as long as its voiceover, plus a short tail
 * so the picture does not cut the instant the voice stops. `durationSeconds` is
 * only the fallback used before a recording exists.
 */
const TAIL_SECONDS = 1.2

/**
 * Resolves a scene against its recording, in one place.
 *
 * If the wav is missing, `audio` is stripped from the props so the component
 * never tries to play a file that is not there — a scene with a script but no
 * recording still renders, silently, at its fallback length.
 */
async function resolve(scene: Scene): Promise<{ durationInFrames: number; scene: Scene }> {
  const fallback = Math.round(scene.durationSeconds * FPS)
  if (!scene.audio) return { durationInFrames: fallback, scene }
  try {
    const seconds = await getAudioDurationInSeconds(staticFile(`audio/${scene.audio}`))
    return { durationInFrames: Math.round((seconds + TAIL_SECONDS) * FPS), scene }
  } catch {
    const { audio, ...withoutAudio } = scene
    return { durationInFrames: fallback, scene: withoutAudio }
  }
}

/** The whole lesson, end to end. Each shot as long as its own voiceover. */
const Lesson: React.FC<{ scenes: { scene: Scene; durationInFrames: number }[] }> = ({ scenes }) => (
  <Series>
    {scenes.map(({ scene, durationInFrames }) => (
      <Series.Sequence key={scene.id} durationInFrames={durationInFrames}>
        <SceneRenderer scene={scene} />
      </Series.Sequence>
    ))}
  </Series>
)

export const RemotionRoot: React.FC = () => (
  <>
    {/* One composition per shot, for working on a shot in isolation. */}
    {guide.scenes.map((scene) => (
      <Composition
        key={scene.id}
        id={compositionId(scene)}
        component={SceneRenderer}
        durationInFrames={Math.round(scene.durationSeconds * FPS)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{ scene }}
        calculateMetadata={async ({ props }) => {
          const { durationInFrames, scene: resolved } = await resolve(props.scene)
          return { durationInFrames, props: { scene: resolved } }
        }}
      />
    ))}

    {/* And the whole thing stitched together. */}
    <Composition
      id="Lesson"
      component={Lesson}
      durationInFrames={Math.round(
        guide.scenes.reduce((total, s) => total + s.durationSeconds, 0) * FPS,
      )}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{ scenes: [] as { scene: Scene; durationInFrames: number }[] }}
      calculateMetadata={async () => {
        const resolved = await Promise.all(guide.scenes.map(resolve))
        return {
          durationInFrames: resolved.reduce((total, r) => total + r.durationInFrames, 0),
          props: { scenes: resolved },
        }
      }}
    />
  </>
)

/** "client-server" as shot 2 -> "S02ClientServer": sorts, and is unambiguous on the CLI. */
function compositionId(scene: Scene) {
  const name = scene.id
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
  return scene.shot ? `S${String(scene.shot).padStart(2, '0')}${name}` : name
}
