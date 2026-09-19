import React, { useEffect, useState } from 'react'
import { api, type DiagramScene, type FullDoc, type Section } from './lib/api'
import { Sidebar } from './components/Sidebar'
import { Reader } from './pages/Reader'

export const App: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([])
  const [doc, setDoc] = useState<FullDoc | null>(null)
  const [diagrams, setDiagrams] = useState<DiagramScene[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.sections().then(setSections).catch((e) => setError(String(e)))
  }, [])

  const pick = (slug: string) => {
    setError(null)
    setDiagrams([])
    api.doc(slug).then(setDoc).catch((e) => setError(String(e)))
    // A guide without a scene spec simply has none — never an error.
    api.diagrams(slug).then(setDiagrams).catch(() => setDiagrams([]))
  }

  return (
    <div className="app">
      <Sidebar sections={sections} current={doc?.slug ?? null} onPick={pick} />
      <Reader doc={doc} diagrams={diagrams} error={error} />
    </div>
  )
}
