import React from 'react'
import { BookOpen, FlaskConical, GraduationCap, Layers, Lock, Rocket, X } from 'lucide-react'
import type { Section } from '../lib/api'

/**
 * The course's own folder structure, as navigation.
 *
 * Same shape as the sidebar in the other product: a brand block, grouped
 * sections separated by rules, and a filled pill for the active item rather
 * than a pale tint — so where you are is unambiguous at a glance.
 */

const ICONS: Record<string, React.ElementType> = {
  onboarding: Rocket,
  guides: BookOpen,
  projects: FlaskConical,
  curriculum: Layers,
}

interface Props {
  sections: Section[]
  current: string | null
  onPick: (slug: string) => void
  isOpen: boolean
  onClose: () => void
}

export const Sidebar: React.FC<Props> = ({ sections, current, onPick, isOpen, onClose }) => {
  const total = sections.reduce((n, s) => n + s.docs.length, 0)

  return (
    <>
      {/* Mobile: dim the page behind the drawer. */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/30 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r
                    border-[var(--sidebar-border)] bg-[var(--sidebar)]
                    transition-transform duration-200 md:translate-x-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Mobile drawer header */}
        <div className="flex shrink-0 items-center justify-between px-4 py-3 md:hidden">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={onClose} aria-label="Close menu">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Brand */}
        <div className="hidden shrink-0 border-b border-[var(--sidebar-border)] p-2 md:block">
          <div className="flex items-center gap-2 rounded-md p-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#171717] text-white">
              <GraduationCap size={17} strokeWidth={1.75} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-semibold leading-5">Full Stack + AI</span>
              <span className="truncate text-xs leading-4 text-[var(--foreground)]/60">
                {total} of 65 days written
              </span>
            </div>
          </div>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto">
          {sections.map((section, i) => {
            const Icon = ICONS[section.id] ?? BookOpen
            return (
              <div
                key={section.id}
                className={`p-2 ${i > 0 ? 'border-t border-[var(--sidebar-border)]' : ''}`}
              >
                <p className="flex h-8 items-center gap-2 px-2 text-xs text-[var(--muted-foreground)]">
                  <Icon size={13} strokeWidth={1.75} />
                  {section.label}
                </p>

                <div className="space-y-1">
                  {section.docs.map((doc) => {
                    const active = current === doc.slug
                    return (
                      <button
                        key={doc.slug}
                        onClick={() => { onPick(doc.slug); onClose() }}
                        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5
                                    text-left text-sm transition-colors
                                    ${active
                                      ? 'bg-[var(--sidebar-active)] text-[var(--primary-foreground)]'
                                      : 'text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-hover)]'}`}
                      >
                        <span
                          className={`w-5 shrink-0 text-right font-mono text-xs ${
                            active ? 'text-white/70' : 'text-[var(--muted-foreground)]'
                          }`}
                        >
                          {doc.day !== null ? String(doc.day).padStart(2, '0') : '·'}
                        </span>
                        <span className="min-w-0 flex-1 truncate">{doc.title}</span>
                      </button>
                    )
                  })}
                  {section.docs.length === 0 && (
                    <p className="px-2 py-1 text-xs italic text-[var(--muted-foreground)]">
                      nothing here yet
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </nav>

        {/* Not yours yet — shown rather than hidden, so it is clear it exists. */}
        <div className="shrink-0 border-t border-[var(--sidebar-border)] p-2">
          <button
            disabled
            title="Instructor only"
            className="flex w-full cursor-not-allowed items-center gap-2 rounded-md
                       px-2 py-1.5 text-left text-sm text-[var(--muted-foreground)] opacity-60"
          >
            <Lock size={13} strokeWidth={1.75} className="shrink-0" />
            <span className="flex-1 truncate">Video studio</span>
          </button>
        </div>
      </aside>
    </>
  )
}
