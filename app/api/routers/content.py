from fastapi import APIRouter, HTTPException

from app.api.services import content, diagrams

router = APIRouter(prefix="/api", tags=["content"])


@router.get("/sections")
def sections():
    """The sidebar: every section and the documents in it."""
    return content.list_sections()


@router.get("/docs/{slug}")
def doc(slug: str):
    """One document, as markdown. The frontend renders it."""
    found = content.get_doc(slug)
    if found is None:
        raise HTTPException(status_code=404, detail="No such document")
    return found


@router.get("/docs/{slug}/diagrams")
def doc_diagrams(slug: str):
    """The diagram scenes for this document, for stepping through on the page."""
    return diagrams.for_slug(slug)


@router.get("/health")
def health():
    """Is the app alive and can it see the course?"""
    sections = content.list_sections()
    total = sum(len(s["docs"]) for s in sections)
    if total == 0:
        raise HTTPException(status_code=503, detail="No course content found")
    return {"status": "ok", "documents": total}
