import React, { useMemo, useState } from 'react'
import ReactFlow, { Background, Controls, MarkerType, type Edge, type Node } from 'reactflow'
import 'reactflow/dist/style.css'
import type { DiagramScene } from '../lib/api'

/**
 * The guide's diagrams, as something you step through rather than watch.
 *
 * These read the same scene specs the video renderer reads, so the picture on
 * this page and the picture in the lesson video cannot disagree. The difference
 * is who controls the pace: in the video it is the narrator, here it is you.
 */

const ACCENTS: Record<string, { fill: string; border: string; text: string }> = {
  blue:  { fill: '#1E3A5F', border: '#38BDF8', text: '#E0F2FE' },
  green: { fill: '#14432F', border: '#34D399', text: '#D1FAE5' },
  amber: { fill: '#45320E', border: '#FBBF24', text: '#FEF3C7' },
  slate: { fill: '#1E293B', border: '#94A3B8', text: '#E2E8F0' },
  red:   { fill: '#4C1D24', border: '#FB7185', text: '#FFE4E6' },
}

export const Diagrams: React.FC<{ scenes: DiagramScene[] }> = ({ scenes }) => {
  const [index, setIndex] = useState(0)
  const scene = scenes[index]

  // Every distinct moment something appears, in order. Stepping walks these.
  const cues = useMemo(() => {
    const times = [...scene.nodes.map((n) => n.appearAt), ...scene.edges.map((e) => e.appearAt)]
    return Array.from(new Set(times)).sort((a, b) => a - b)
  }, [scene])

  const [step, setStep] = useState(cues.length)
  const upTo = cues[step - 1] ?? -1

  const pick = (i: number) => {
    setIndex(i)
    setStep(Infinity) // a newly chosen diagram starts complete
  }

  const nodes: Node[] = scene.nodes
    .filter((n) => n.appearAt <= upTo)
    .map((n) => ({
      id: n.id,
      position: { x: n.at[0], y: n.at[1] },
      data: {
        label: (
          <div style={{ padding: 8 }}>
            {n.caption && <div className="dg-caption">{n.caption}</div>}
            <div className="dg-label">{n.label}</div>
            {n.sublabel && <div className="dg-sub">{n.sublabel}</div>}
            {n.bullets?.map((b) => <div key={b} className="dg-bullet">· {b}</div>)}
          </div>
        ),
      },
      style: {
        ...(ACCENTS[n.accent] ?? ACCENTS.slate),
        background: (ACCENTS[n.accent] ?? ACCENTS.slate).fill,
        border: `2px solid ${(ACCENTS[n.accent] ?? ACCENTS.slate).border}`,
        color: (ACCENTS[n.accent] ?? ACCENTS.slate).text,
        width: n.size[0] / 2,
        borderRadius: 14,
      },
    }))

  const edges: Edge[] = scene.edges
    .filter((e) => e.appearAt <= upTo)
    .map((e) => ({
      id: e.id,
      source: e.from,
      target: e.to,
      label: e.label,
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, color: '#64748B' },
      style: { stroke: '#64748B', strokeWidth: 2 },
      labelStyle: { fill: '#E2E8F0', fontSize: 12 },
      labelBgStyle: { fill: '#0F172A' },
    }))

  const shown = Math.min(step, cues.length)

  return (
    <section className="diagrams">
      <div className="dg-head">
        <div>
          <div className="dg-title">Explore the diagrams</div>
          <div className="dg-hint">Step through it yourself. Drag the boxes — they are yours.</div>
        </div>
        <div className="dg-tabs">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              className={`dg-tab ${i === index ? 'is-on' : ''}`}
              onClick={() => pick(i)}
              title={s.source ?? undefined}
            >
              {s.heading ?? s.id}
            </button>
          ))}
        </div>
      </div>

      <div className="dg-canvas">
        <ReactFlow nodes={nodes} edges={edges} fitView proOptions={{ hideAttribution: true }}>
          <Background color="#1E293B" gap={22} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      <div className="dg-controls">
        <button onClick={() => setStep(Math.max(0, shown - 1))} disabled={shown === 0}>← Back</button>
        <button onClick={() => setStep(Math.min(cues.length, shown + 1))} disabled={shown >= cues.length}>
          Next →
        </button>
        <span className="dg-step">step {shown} of {cues.length}</span>
        <button className="dg-ghost" onClick={() => setStep(cues.length)}>show all</button>
      </div>
    </section>
  )
}
