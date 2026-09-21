import React, { useEffect, useState } from 'react'
import { api, type DiagramScene, type FullDoc, type Section } from './lib/api'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { Reader } from './pages/Reader'

export const App: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([])
  const [doc, setDoc] = useState<FullDoc | null>(null)
  const [diagrams, setDiagrams] = useState<DiagramScene[]>([])
  const [error, setError] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

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
    <div className="flex h-[100dvh] min-h-0 overflow-hidden bg-[var(--background)]">
      {/* Reserves the column on desktop; on mobile the drawer is fixed. */}
      <div className="w-0 shrink-0 md:w-64">
        <Sidebar
          sections={sections}
          current={doc?.slug ?? null}
          onPick={pick}
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </div>

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Header doc={doc} onMenuClick={() => setMenuOpen(true)} />
        {/* min-h-0 + basis-0 so the scroll lives here and not on the page. */}
        <main className="flex min-h-0 w-full min-w-0 flex-1 basis-0 flex-col overflow-auto p-4 sm:p-6 lg:p-10">
          <Reader doc={doc} diagrams={diagrams} error={error} />
        </main>
      </div>
    </div>
  )
}
