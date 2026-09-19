import React from 'react'
import { AbsoluteFill } from 'remotion'
import type { Scene, SceneEdge, SceneNode } from '../types'
import { theme } from '../theme'
import { Stage, useEntrance } from './primitives'

/**
 * Boxes, arrows, labels.
 *
 * Deliberately plain SVG rather than React Flow: React Flow's value is pan, zoom,
 * drag and viewport measurement, none of which exist in a fixed 1920x1080 frame,
 * and its measurement is fragile headless. The spec mandates explicit coordinates,
 * so there is no layout engine to borrow. React Flow stays right for the website,
 * reading this same JSON.
 */

const Bullet: React.FC<{ text: string; appearAt: number; colour: string }> = ({ text, appearAt, colour }) => {
  const { opacity, lift } = useEntrance(appearAt)
  return (
    <div style={{ opacity, transform: `translateY(${lift}px)`, color: colour, fontSize: 25, lineHeight: 1.5 }}>
      · {text}
    </div>
  )
}

const Box: React.FC<{ node: SceneNode }> = ({ node }) => {
  const { opacity, lift } = useEntrance(node.appearAt)
  const accent = theme.accents[node.accent]
  const [x, y] = node.at
  const [w, h] = node.size
  const hasBullets = !!node.bullets?.length

  return (
    <div style={{ position: 'absolute', left: x, top: y + lift, width: w, height: h, opacity }}>
      {node.caption && (
        <div style={{
          position: 'absolute', top: -46, width: w, textAlign: 'center',
          color: theme.textFaint, fontSize: 22, letterSpacing: 2.4, fontWeight: 600,
        }}>
          {node.caption}
        </div>
      )}

      <div style={{
        width: w, height: h, background: accent.fill,
        border: `${theme.card.border}px solid ${accent.border}`,
        borderRadius: theme.card.radius,
        boxShadow: `${theme.card.shadow}, 0 0 90px ${accent.glow}`,
        display: 'flex', flexDirection: 'column',
        alignItems: hasBullets ? 'flex-start' : 'center',
        justifyContent: 'center',
        gap: hasBullets ? 12 : 10,
        padding: hasBullets ? '30px 36px' : 0,
        boxSizing: 'border-box',
      }}>
        <div style={{ color: accent.text, fontSize: hasBullets ? 42 : 54, fontWeight: 700, letterSpacing: 1 }}>
          {node.label}
        </div>
        {node.sublabel && (
          <div style={{ color: theme.textMuted, fontSize: 26, fontWeight: 500 }}>{node.sublabel}</div>
        )}
        {node.bullets?.map((b, i) => (
          <Bullet key={b} text={b} colour={theme.textMuted} appearAt={node.appearAt + 0.5 + i * 0.45} />
        ))}
      </div>

      {node.footnote && (
        <div style={{
          position: 'absolute', top: h + 22, width: w, textAlign: 'center',
          color: theme.textFaint, fontSize: 22,
        }}>
          {node.footnote}
        </div>
      )}
    </div>
  )
}

/** Where an arrow leaves and lands, given the two boxes it joins. */
function anchors(edge: SceneEdge, nodes: SceneNode[]) {
  const a = nodes.find((n) => n.id === edge.from)!
  const b = nodes.find((n) => n.id === edge.to)!
  const gap = 24
  const offset = edge.offset ?? 0

  if (edge.vertical) {
    const x = a.at[0] + a.size[0] / 2 + offset
    const down = a.at[1] < b.at[1]
    return {
      x1: x, x2: x,
      y1: down ? a.at[1] + a.size[1] + gap : a.at[1] - gap,
      y2: down ? b.at[1] - gap : b.at[1] + b.size[1] + gap,
    }
  }

  const y1 = a.at[1] + a.size[1] / 2 + offset
  const y2 = b.at[1] + b.size[1] / 2 + offset
  const right = a.at[0] < b.at[0]
  return {
    x1: right ? a.at[0] + a.size[0] + gap : a.at[0] - gap,
    x2: right ? b.at[0] - gap : b.at[0] + b.size[0] + gap,
    y1, y2,
  }
}

const Arrow: React.FC<{ edge: SceneEdge; nodes: SceneNode[] }> = ({ edge, nodes }) => {
  const { progress, opacity } = useEntrance(edge.appearAt)
  const { x1, y1, x2, y2 } = anchors(edge, nodes)

  const length = Math.hypot(x2 - x1, y2 - y1)
  const drawn = length * (1 - progress)
  const head = 16
  const vertical = !!edge.vertical
  const forward = vertical ? y2 > y1 : x2 > x1

  // Head and label only arrive once the line has finished travelling.
  const tail = Math.max(0, Math.min(1, (progress - 0.75) / 0.25))

  const headPoints = vertical
    ? forward
      ? `${x2},${y2} ${x2 - head},${y2 - head * 1.6} ${x2 + head},${y2 - head * 1.6}`
      : `${x2},${y2} ${x2 - head},${y2 + head * 1.6} ${x2 + head},${y2 + head * 1.6}`
    : forward
      ? `${x2},${y2} ${x2 - head * 1.6},${y2 - head} ${x2 - head * 1.6},${y2 + head}`
      : `${x2},${y2} ${x2 + head * 1.6},${y2 - head} ${x2 + head * 1.6},${y2 + head}`

  return (
    <g opacity={opacity}>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={theme.edge.colour} strokeWidth={theme.edge.width} strokeLinecap="round"
        strokeDasharray={length} strokeDashoffset={drawn}
      />
      <polygon points={headPoints} fill={theme.edge.colour} opacity={tail} />
      {edge.label && (
        <text
          x={vertical ? x1 + 26 : (x1 + x2) / 2}
          y={vertical ? (y1 + y2) / 2 : y1 - 22}
          fill={theme.text} fontSize={30} fontFamily={theme.font}
          textAnchor={vertical ? 'start' : 'middle'} opacity={tail}
        >
          {edge.label}
        </text>
      )}
    </g>
  )
}

export const DiagramScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const nodes = scene.nodes ?? []
  const edges = scene.edges ?? []
  return (
    <Stage scene={scene}>
      {/* Arrows under the boxes, so they tuck behind the rounded corners. */}
      <AbsoluteFill>
        <svg width="100%" height="100%">
          {edges.map((edge) => <Arrow key={edge.id} edge={edge} nodes={nodes} />)}
        </svg>
      </AbsoluteFill>
      {nodes.map((node) => <Box key={node.id} node={node} />)}
    </Stage>
  )
}
