import React from 'react'
import type { Scene } from '../types'
import { DiagramScene } from './DiagramScene'
import { ScreencastScene, StatementScene, StepsScene, TableScene, TitleScene } from './OtherScenes'

/** One entry point, so Root and the capture tool never diverge on how a scene draws. */
export const SceneRenderer: React.FC<{ scene: Scene }> = ({ scene }) => {
  switch (scene.kind) {
    case 'title': return <TitleScene scene={scene} />
    case 'statement': return <StatementScene scene={scene} />
    case 'table': return <TableScene scene={scene} />
    case 'steps': return <StepsScene scene={scene} />
    case 'screencast': return <ScreencastScene scene={scene} />
    case 'diagram':
    default: return <DiagramScene scene={scene} />
  }
}
