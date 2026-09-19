"""
Finds the diagram scenes that belong to a guide.

The scene specs are written for the video renderer, but they are just data —
boxes, arrows and labels with times on them. The lesson page reads exactly the
same files, so the diagram a student steps through and the diagram in the video
cannot drift apart. That is the whole reason the spec is JSON and not code.
"""
from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Optional

ROOT = Path(__file__).resolve().parents[3]
SCENES = ROOT / "video-studio" / "scenes"

# GUIDE-01-What-Is-A-Web-App-FE-And-BE -> GUIDE-01
GUIDE_ID = re.compile(r"^((?:GUIDE|CLASS|PROJECT|ASSIGNMENT)-\d+)", re.IGNORECASE)


def _guide_id(slug: str) -> Optional[str]:
    match = GUIDE_ID.match(slug)
    return match.group(1).upper() if match else None


def for_slug(slug: str) -> list[dict]:
    """
    Every diagram scene belonging to this document, in order.

    Only `kind: "diagram"` scenes come back — a title card or a statement has
    nothing to explore, and offering an empty canvas would be worse than
    offering nothing.
    """
    guide = _guide_id(slug)
    if guide is None or not SCENES.is_dir():
        return []

    for path in sorted(SCENES.glob("*.json")):
        try:
            spec = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            # A spec being edited should not take the lesson page down.
            continue
        if str(spec.get("guide", "")).upper() != guide:
            continue
        return [
            {
                "id": scene["id"],
                "shot": scene.get("shot"),
                "heading": scene.get("heading"),
                "source": scene.get("source"),
                "nodes": scene.get("nodes") or [],
                "edges": scene.get("edges") or [],
            }
            for scene in spec.get("scenes", [])
            if scene.get("kind") == "diagram" and (scene.get("nodes") or [])
        ]
    return []
