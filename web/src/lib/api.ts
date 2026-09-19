/** Everything the frontend knows about the backend. */

export interface Doc {
  slug: string
  title: string
  day: number | null
  kind: string
}

export interface Section {
  id: string
  label: string
  blurb: string
  docs: Doc[]
}

export interface FullDoc extends Doc {
  markdown: string
}

/** A box in a diagram. Mirrors the scene spec the video renderer reads. */
export interface DiagramNode {
  id: string
  label: string
  sublabel?: string
  caption?: string
  bullets?: string[]
  at: [number, number]
  size: [number, number]
  accent: string
  appearAt: number
}

export interface DiagramEdge {
  id: string
  from: string
  to: string
  label?: string
  appearAt: number
}

export interface DiagramScene {
  id: string
  shot: number | null
  heading: string | null
  source: string | null
  nodes: DiagramNode[]
  edges: DiagramEdge[]
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

export const api = {
  sections: () => get<Section[]>('/api/sections'),
  doc: (slug: string) => get<FullDoc>(`/api/docs/${slug}`),
  diagrams: (slug: string) => get<DiagramScene[]>(`/api/docs/${slug}/diagrams`),
}
