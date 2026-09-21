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

// Light surfaces with a coloured edge, one per layer of the stack.
const ACCENTS: Record<string, { fill: string; border: string; text: string }> = {
  blue:  { fill: '#e0f2fe', border: '#0284c7', text: '#075985' },
  green: { fill: '#d1fae5', border: '#059669', text: '#065f46' },
  amber: { fill: '#fef3c7', border: '#b45309', text: '#92400e' },
  slate: { fill: '#f1f5f9', border: '#94a3b8', text: '#334155' },
  red:   { fill: '#fee2e2', border: '#dc2626', text: '#991b1b' },
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
      markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' },
      style: { stroke: '#94a3b8', strokeWidth: 2 },
      labelStyle: { fill: '#334155', fontSize: 12 },
      labelBgStyle: { fill: '#ffffff' },
    }))

  const shown = Math.min(step, cues.length)

  return (
    <section className="mb-8 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--border)] px-4 py-3">
        <div>
          <div className="text-sm font-semibold">Explore the diagrams</div>
          <div className="mt-0.5 text-xs text-[var(--muted-foreground)]">
            Step through it yourself. Drag the boxes — they are yours.
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              onClick={() => pick(i)}
              title={s.source ?? undefined}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                i === index
                  ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:border-[var(--border-hover)] hover:text-[var(--foreground)]'
              }`}
            >
              {s.heading ?? s.id}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[420px] bg-[var(--surface-subtle)]">
        <ReactFlow nodes={nodes} edges={edges} fitView proOptions={{ hideAttribution: true }}>
          <Background color="#e5e5e5" gap={22} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      <div className="flex items-center gap-2 border-t border-[var(--border)] px-4 py-2.5">
        <button
          onClick={() => setStep(Math.max(0, shown - 1))}
          disabled={shown === 0}
          className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm hover:border-[var(--border-hover)] disabled:opacity-40"
        >
          Back
        </button>
        <button
          onClick={() => setStep(Math.min(cues.length, shown + 1))}
          disabled={shown >= cues.length}
          className="rounded-md bg-[var(--primary)] px-3 py-1.5 text-sm font-medium text-[var(--primary-foreground)] hover:bg-[var(--primary-strong)] disabled:opacity-40"
        >
          Next
        </button>
        <span className="text-xs text-[var(--muted-foreground)]">
          step {shown} of {cues.length}
        </span>
        <button
          onClick={() => setStep(cues.length)}
          className="ml-auto text-xs text-[var(--muted-foreground)] underline underline-offset-2 hover:text-[var(--foreground)]"
        >
          show all
        </button>
      </div>
    </section>
  )
}
