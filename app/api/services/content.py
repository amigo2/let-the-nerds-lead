"""
Reads the course out of the markdown files.

The guides are the source of truth. This never copies them into a database — it
reads them off disk on request. That is what "content is rebuilt, never
migrated" means in practice: edit a guide, reload the page, it is there.
"""
from __future__ import annotations

import re
from pathlib import Path
from typing import Optional

# app/api/services/content.py -> repo root
ROOT = Path(__file__).resolve().parents[3]

SECTIONS = [
    {
        "id": "onboarding",
        "label": "Start here",
        "directory": "course/00-onboarding",
        "blurb": "Set up the workspace and the agent",
    },
    {
        "id": "guides",
        "label": "Guides",
        "directory": "course/guides",
        "blurb": "One day, one topic, one outcome",
    },
    {
        "id": "projects",
        "label": "Projects",
        "directory": "course/projects",
        "blurb": "What you build with it",
    },
    {
        "id": "curriculum",
        "label": "Curriculum",
        "directory": "course/curriculum",
        "blurb": "The whole 65 days",
    },
]

# GUIDE-07-Something.md -> day 7.  CLASS-00-... and PROJECT-01-... too.
NUMBER = re.compile(r"^(?:GUIDE|CLASS|PROJECT|ASSIGNMENT)-(\d+)-", re.IGNORECASE)
KIND = re.compile(r"^([A-Z]+)-", re.IGNORECASE)


def _title_of(path: Path) -> str:
    """The first heading, which every document in this repo has."""
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return path.stem


def _number_of(name: str) -> Optional[int]:
    match = NUMBER.match(name)
    return int(match.group(1)) if match else None


def _kind_of(name: str) -> str:
    match = KIND.match(name)
    return match.group(1).lower() if match else "doc"


def list_sections() -> list[dict]:
    """The sidebar: every section, with the documents inside it."""
    out = []
    for section in SECTIONS:
        directory = ROOT / section["directory"]
        docs = []
        if directory.is_dir():
            for path in sorted(directory.glob("*.md")):
                docs.append(
                    {
                        "slug": path.stem,
                        "title": _title_of(path),
                        "day": _number_of(path.name),
                        "kind": _kind_of(path.name),
                    }
                )
        out.append({**section, "docs": docs})
    return out


def _find(slug: str) -> Optional[Path]:
    """Resolve a slug without letting it escape the course directory."""
    for section in SECTIONS:
        candidate = (ROOT / section["directory"] / f"{slug}.md").resolve()
        # Never serve anything outside the section it claims to be in.
        if candidate.is_file() and candidate.is_relative_to((ROOT / section["directory"]).resolve()):
            return candidate
    return None


def get_doc(slug: str) -> Optional[dict]:
    path = _find(slug)
    if path is None:
        return None
    text = path.read_text(encoding="utf-8")
    return {
        "slug": slug,
        "title": _title_of(path),
        "day": _number_of(path.name),
        "kind": _kind_of(path.name),
        "markdown": text,
    }
