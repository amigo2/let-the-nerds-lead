import React, { useMemo, useState } from 'react'
import ReactFlow, { Background, Controls, MarkerType, type Edge, type Node } from 'reactflow'
import 'reactflow/dist/style.css'
import type { Accent, Scene } from '../src/types'
import { theme } from '../src/theme'

/**
 * The same scene spec, as something a student can touch.
 *
 * This is the second half of decision 2: one artifact, two outputs. The video is
 * for distribution — you watch it once. This is for learning — you step through
 * it at your own pace, drag the boxes around, and come back to it later.
 *
 * Nothing here is generated. It reads exactly the JSON the renderer reads, so
 * the diagram on the lesson page and the diagram in the video cannot disagree.
 */

function paint(accent: Accent) {
  const a = theme.accents[accent]
  return { background: a.fill, border: `2px solid ${a.border}`, color: a.text }
}

export const Interactive: React.FC<{ scene: Scene }> = ({ scene }) => {
  const cues = useMemo(() => {
    const list: number[] = [
      ...(scene.nodes ?? []).map((n) => n.appearAt),
      ...(scene.edges ?? []).map((e) => e.appearAt),
    ]
    return Array.from(new Set(list)).sort((a, b) => a - b)
  }, [scene])

  // How far through the reveal the student has stepped.
  const [step, setStep] = useState(cues.length)
  const upTo = cues[step - 1] ?? -1

  const nodes: Node[] = useMemo(
    () =>
      (scene.nodes ?? [])
        .filter((n) => n.appearAt <= upTo)
        .map((n) => ({
          id: n.id,
          position: { x: n.at[0], y: n.at[1] },
          data: {
            label: (
              <div style={{ padding: 10 }}>
                {n.caption && (
                  <div style={{ fontSize: 11, letterSpacing: 1.5, opacity: 0.6 }}>{n.caption}</div>
                )}
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{n.label}</div>
                {n.sublabel && <div style={{ fontSize: 13, opacity: 0.75 }}>{n.sublabel}</div>}
                {n.bullets?.map((b) => (
                  <div key={b} style={{ fontSize: 13, opacity: 0.8, marginTop: 6, textAlign: 'left' }}>
                    · {b}
                  </div>
                ))}
              </div>
            ),
          },
          style: {
            ...paint(n.accent),
            width: n.size[0] / 2,
            borderRadius: 14,
            fontFamily: theme.font,
          },
        })),
    [scene, upTo],
  )

  const edges: Edge[] = useMemo(
    () =>
      (scene.edges ?? [])
        .filter((e) => e.appearAt <= upTo)
        .map((e) => ({
          id: e.id,
          source: e.from,
          target: e.to,
          label: e.label,
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed, color: theme.edge.colour },
          style: { stroke: theme.edge.colour, strokeWidth: 2 },
          labelStyle: { fill: theme.text, fontSize: 13, fontFamily: theme.font },
          labelBgStyle: { fill: theme.bg },
        })),
    [scene, upTo],
  )

  if (!(scene.nodes ?? []).length) {
    return (
      <div style={{ padding: 40, color: theme.textMuted, fontSize: 18 }}>
        Shot {scene.shot} is a <b>{scene.kind}</b> scene — no boxes to explore.
        Interactive view is for diagrams; this one is video only.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', border: '1px solid #1E293B' }}>
        <ReactFlow nodes={nodes} edges={edges} fitView proOptions={{ hideAttribution: true }}>
          <Background color="#1E293B" gap={24} />
          <Controls />
        </ReactFlow>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} style={btn}>← Back</button>
        <button onClick={() => setStep((s) => Math.min(cues.length, s + 1))} style={btn}>Next →</button>
        <div style={{ color: theme.textMuted, fontSize: 14 }}>
          step {step} of {cues.length} — drag the boxes, they are yours
        </div>
      </div>
    </div>
  )
}

const btn: React.CSSProperties = {
  padding: '9px 16px', borderRadius: 8, border: '1px solid #334155',
  background: '#0F172A', color: '#F1F5F9', fontSize: 14, cursor: 'pointer',
}
