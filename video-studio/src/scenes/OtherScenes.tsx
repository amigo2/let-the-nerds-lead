import React from 'react'
import { AbsoluteFill } from 'remotion'
import type { Scene } from '../types'
import { theme } from '../theme'
import { Stage, useEntrance } from './primitives'

/** Shot 1 and the close: one line, centred, nothing else competing. */
export const TitleScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const title = useEntrance(0.3)
  const sub = useEntrance(1.2)
  return (
    <Stage scene={scene}>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 28 }}>
        <div style={{
          color: theme.text, fontSize: 92, fontWeight: 800, textAlign: 'center',
          maxWidth: 1500, lineHeight: 1.15,
          opacity: title.opacity, transform: `translateY(${title.lift}px)`,
        }}>
          {scene.title}
        </div>
        {scene.subtitle && (
          <div style={{
            color: theme.textMuted, fontSize: 40, textAlign: 'center', maxWidth: 1300,
            opacity: sub.opacity, transform: `translateY(${sub.lift}px)`,
          }}>
            {scene.subtitle}
          </div>
        )}
      </AbsoluteFill>
    </Stage>
  )
}

/** The one thing to remember. Deliberately nothing else on screen. */
export const StatementScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const main = useEntrance(0.3)
  const attr = useEntrance(1.6)
  return (
    <Stage scene={scene}>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 40, padding: 140 }}>
        <div style={{
          color: theme.accents.amber.border, fontSize: 76, fontWeight: 800,
          textAlign: 'center', lineHeight: 1.25,
          opacity: main.opacity, transform: `translateY(${main.lift}px)`,
        }}>
          {scene.statement}
        </div>
        {scene.attribution && (
          <div style={{ color: theme.textMuted, fontSize: 34, textAlign: 'center', opacity: attr.opacity }}>
            {scene.attribution}
          </div>
        )}
      </AbsoluteFill>
    </Stage>
  )
}

/** Rows arriving one at a time, so the voice can walk them. */
export const TableScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const columns = scene.columns ?? []
  const rows = scene.rows ?? []
  const head = useEntrance(0.2)

  return (
    <Stage scene={scene}>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '200px 150px 160px' }}>
        <div style={{ width: '100%', maxWidth: 1500 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
            gap: 18, paddingBottom: 14, borderBottom: `2px solid ${theme.textFaint}`,
            opacity: head.opacity,
          }}>
            {columns.map((c) => (
              <div key={c} style={{ color: theme.textFaint, fontSize: 24, letterSpacing: 2, fontWeight: 700 }}>
                {c.toUpperCase()}
              </div>
            ))}
          </div>

          {rows.map((row, i) => <Row key={i} row={row} columns={columns.length} />)}
        </div>
      </AbsoluteFill>
    </Stage>
  )
}

const Row: React.FC<{ row: NonNullable<Scene['rows']>[number]; columns: number }> = ({ row, columns }) => {
  const { opacity, lift } = useEntrance(row.appearAt)
  const accent = row.accent ? theme.accents[row.accent] : null
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 18,
      padding: '20px 16px', marginTop: 12, borderRadius: 14,
      background: accent ? accent.fill : 'transparent',
      border: `1px solid ${accent ? accent.border : 'transparent'}`,
      opacity, transform: `translateY(${lift}px)`,
    }}>
      {row.cells.map((cell, i) => (
        <div key={i} style={{
          color: i === 0 && accent ? accent.text : theme.text,
          fontSize: 30, fontWeight: i === 0 ? 700 : 400, lineHeight: 1.35,
        }}>
          {cell}
        </div>
      ))}
    </div>
  )
}

/** A numbered sequence building up — shot 7, the journey of a click. */
export const StepsScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const steps = scene.steps ?? []
  return (
    <Stage scene={scene}>
      <AbsoluteFill style={{ justifyContent: 'center', padding: '200px 220px 160px' }}>
        {steps.map((step, i) => <StepRow key={i} index={i + 1} step={step} />)}
      </AbsoluteFill>
    </Stage>
  )
}

const StepRow: React.FC<{ index: number; step: { text: string; appearAt: number } }> = ({ index, step }) => {
  const { opacity, lift } = useEntrance(step.appearAt)
  return (
    <div style={{
      display: 'flex', gap: 26, alignItems: 'baseline', padding: '11px 0',
      opacity, transform: `translateY(${lift}px)`,
    }}>
      <div style={{
        color: theme.accents.blue.border, fontSize: 30, fontWeight: 800,
        minWidth: 46, fontVariantNumeric: 'tabular-nums',
      }}>
        {index}
      </div>
      <div style={{ color: theme.text, fontSize: 34, lineHeight: 1.4 }}>{step.text}</div>
    </div>
  )
}

/** Real footage. Until the recording exists, a card saying what to film. */
export const ScreencastScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { opacity } = useEntrance(0.3)
  return (
    <Stage scene={scene}>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: 160 }}>
        <div style={{
          border: `3px dashed ${theme.textFaint}`, borderRadius: 20, padding: '70px 90px',
          textAlign: 'center', opacity, maxWidth: 1400,
        }}>
          <div style={{ color: theme.textFaint, fontSize: 24, letterSpacing: 3, fontWeight: 700 }}>
            SCREENCAST
          </div>
          <div style={{ color: theme.text, fontSize: 44, marginTop: 20, lineHeight: 1.35 }}>
            {scene.placeholder ?? 'Footage to be recorded'}
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  )
}
