import React from 'react'
import type { Section } from '../lib/api'

/**
 * The sidebar is the course's own folder structure, as buttons.
 *
 * `locked` sections are visible but not open — Studio is the first of these.
 * Showing what exists and is not yours yet is better than hiding it: it tells a
 * student the thing is there, without pretending they have it.
 */
export const Sidebar: React.FC<{
  sections: Section[]
  current: string | null
  onPick: (slug: string) => void
}> = ({ sections, current, onPick }) => (
  <nav className="sidebar">
    <div className="brand">
      <div className="brand-title">Full Stack + AI</div>
      <div className="brand-sub">65 days · 3 written</div>
    </div>

    {sections.map((section) => (
      <div key={section.id} className="section">
        <div className="section-label">{section.label}</div>
        <div className="section-blurb">{section.blurb}</div>
        {section.docs.map((doc) => (
          <button
            key={doc.slug}
            className={`doc ${current === doc.slug ? 'is-current' : ''}`}
            onClick={() => onPick(doc.slug)}
          >
            {doc.day !== null && <span className="day">{String(doc.day).padStart(2, '0')}</span>}
            <span className="doc-title">{doc.title}</span>
          </button>
        ))}
        {section.docs.length === 0 && <div className="empty">nothing here yet</div>}
      </div>
    ))}

    <div className="section">
      <div className="section-label">Studio</div>
      <div className="section-blurb">Build the lesson videos</div>
      <button className="doc is-locked" disabled title="Instructor only">
        <span className="day">🔒</span>
        <span className="doc-title">Video studio</span>
      </button>
    </div>
  </nav>
)
