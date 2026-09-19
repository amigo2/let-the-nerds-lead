import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { FullDoc } from '../lib/api'

/**
 * Renders a guide exactly as it is written in the repo.
 *
 * Nothing is transformed on the way in: the markdown in git is what the student
 * reads. Tables, callouts and checklists are house style, so GFM is on.
 */
export const Reader: React.FC<{ doc: FullDoc | null; error: string | null }> = ({ doc, error }) => {
  if (error) return <div className="reader"><p className="error">Could not load: {error}</p></div>
  if (!doc) {
    return (
      <div className="reader">
        <div className="placeholder">
          <h1>Pick a guide</h1>
          <p>
            Everything on the left is read straight from the markdown in this repository.
            Edit a guide, reload, and the change is here — there is no copy of the course
            in a database.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="reader">
      <article className="prose">
        <Markdown remarkPlugins={[remarkGfm]}>{doc.markdown}</Markdown>
      </article>
    </div>
  )
}
