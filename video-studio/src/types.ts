/**
 * The scene spec.
 *
 * Mirrors `scenes/*.json`, the artifact an LLM will eventually generate from a
 * guide. Data, never generated code — decision 1 of SPEC-Video-Studio.md — so a
 * human can read thirty lines and picture the frame.
 */

export type Accent = 'blue' | 'green' | 'amber' | 'slate' | 'red'

export type SceneKind = 'title' | 'diagram' | 'table' | 'steps' | 'statement' | 'screencast'

export interface SceneNode {
  id: string
  label: string
  sublabel?: string
  /** Small caption above the box, e.g. "YOUR COMPUTER". */
  caption?: string
  /** Small note under the box. */
  footnote?: string
  /** Lines listed inside the box, revealed one at a time after the box lands. */
  bullets?: string[]
  /** Top-left in a 1920x1080 frame. Explicit, because auto-layout looks auto-laid-out. */
  at: [number, number]
  size: [number, number]
  accent: Accent
  appearAt: number
}

export interface SceneEdge {
  id: string
  from: string
  to: string
  label?: string
  direction: 'forward' | 'backward'
  /** Vertical nudge off the centre line, so two arrows fit between one pair. */
  offset?: number
  /** Draw down the frame rather than across it. */
  vertical?: boolean
  appearAt: number
}

export interface TableRow {
  cells: string[]
  accent?: Accent
  appearAt: number
}

export interface Step {
  text: string
  appearAt: number
}

export interface Scene {
  id: string
  /** Which shot of the lesson this is, matching the shot list in
   *  VIDEO-Diagram-First-Approach.md. Shot 1 is the title card. */
  shot?: number
  kind: SceneKind
  /** Where in the guide this came from. Traceability back to the source of truth. */
  source: string
  heading?: string
  /**
   * Fallback only. Once `audio` exists the recording sets the length — decision 3.
   * Never hand-tune this to match a take; re-run the capture tool instead.
   */
  durationSeconds: number
  /** Voiceover file, relative to course/video/audio/. Its length sets the duration. */
  audio?: string
  /** What gets read aloud. Lives with the scene so words and timings cannot drift. */
  script?: string

  // kind: diagram
  nodes?: SceneNode[]
  edges?: SceneEdge[]
  footer?: { text: string; appearAt: number }

  // kind: title
  title?: string
  subtitle?: string

  // kind: statement — one idea, full screen, the thing to remember
  statement?: string
  attribution?: string

  // kind: table
  columns?: string[]
  rows?: TableRow[]

  // kind: steps
  steps?: Step[]

  // kind: screencast — real footage; the file is recorded by hand
  video?: string
  placeholder?: string
}

export interface GuideSpec {
  guide: string
  title: string
  theme: string
  scenes: Scene[]
}
