import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BookOpen, TriangleAlert } from 'lucide-react'
import type { DiagramScene, FullDoc } from '../lib/api'
import { Diagrams } from '../components/Diagrams'

/**
 * The guide, rendered exactly as it is written in the repository.
 *
 * Nothing is transformed on the way in — the markdown in git is what the
 * student reads. Tables, callouts and self-check boxes are house style, so GFM
 * is on and the styling lives in styles.css.
 */
export const Reader: React.FC<{
  doc: FullDoc | null
  diagrams: DiagramScene[]
  error: string | null
}> = ({ doc, diagrams, error }) => {
  if (error) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-[var(--destructive)]/30 bg-[#fef2f2] p-4 text-sm">
        <TriangleAlert size={18} className="mt-0.5 shrink-0 text-[var(--destructive)]" />
        <div>
          <p className="font-semibold text-[var(--destructive)]">Could not load that</p>
          <p className="mt-1 text-[var(--muted-foreground)]">{error}</p>
        </div>
      </div>
    )
  }

  if (!doc) {
    return (
      <div className="mx-auto mt-[12vh] max-w-xl text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-subtle-2)]">
          <BookOpen size={22} strokeWidth={1.5} className="text-[var(--primary)]" />
        </div>
        <h1 className="text-2xl font-semibold">Full Stack + AI Bootcamp</h1>
        <p className="mt-3 text-[var(--muted-foreground)]">
          Learn to design, build, test and validate software with AI as your copilot —
          not as a replacement for your judgment.
        </p>
        <p className="mt-4 text-sm text-[var(--muted-foreground)]">
          Sixty-five guides, one per day. Python first, then FastAPI and PostgreSQL,
          TypeScript and React, testing, containers and DevOps, applied AI, mobile, and a
          final project. Deployment is taught hands-on on a real VPS rather than described.
        </p>
        <p className="mt-6 text-sm text-[var(--muted-foreground)]">
          Pick a guide on the left to begin.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-[46rem]">
      {diagrams.length > 0 && <Diagrams key={doc.slug} scenes={diagrams} />}
      <article className="prose">
        <Markdown remarkPlugins={[remarkGfm]}>{doc.markdown}</Markdown>
      </article>
    </div>
  )
}
