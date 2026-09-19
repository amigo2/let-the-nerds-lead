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

async function get<T>(path: string): Promise<T> {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

export const api = {
  sections: () => get<Section[]>('/api/sections'),
  doc: (slug: string) => get<FullDoc>(`/api/docs/${slug}`),
}
