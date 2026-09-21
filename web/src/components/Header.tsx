import React from 'react'
import { Menu } from 'lucide-react'
import type { FullDoc } from '../lib/api'

/** Thin bar: the menu button on mobile, and where you are. */
export const Header: React.FC<{ doc: FullDoc | null; onMenuClick: () => void }> = ({
  doc,
  onMenuClick,
}) => (
  <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--background)] px-4 md:px-6">
    <button
      onClick={onMenuClick}
      aria-label="Open menu"
      className="-ml-1 rounded-md p-1.5 hover:bg-[var(--muted)] md:hidden"
    >
      <Menu size={20} strokeWidth={1.5} />
    </button>

    {doc ? (
      <div className="flex min-w-0 items-center gap-2 text-sm">
        {doc.day !== null && (
          <span className="shrink-0 rounded-md bg-[var(--primary-subtle-2)] px-2 py-0.5 font-mono text-xs text-[var(--primary-strong)]">
            Day {String(doc.day).padStart(2, '0')}
          </span>
        )}
        <span className="truncate text-[var(--muted-foreground)]">{doc.title}</span>
      </div>
    ) : (
      <span className="text-sm text-[var(--muted-foreground)]">Full Stack + AI Bootcamp</span>
    )}
  </header>
)
