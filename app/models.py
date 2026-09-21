"""
What the database stores.

One table, because there is one thing worth remembering before accounts exist:
how far someone has got. A `learner` is a random id the browser generates and
keeps — no email, no password, nothing personal. When login arrives, an account
claims its learner id and the history carries over rather than being lost.
"""
from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String, UniqueConstraint

from app.api.db import Base


class Progress(Base):
    """One row per learner per document."""

    __tablename__ = "progress"
    __table_args__ = (UniqueConstraint("learner_id", "slug", name="uq_progress_learner_slug"),)

    id = Column(Integer, primary_key=True, index=True)

    # Generated in the browser, stored in localStorage. Not a person.
    learner_id = Column(String(64), nullable=False, index=True)

    # The document, e.g. GUIDE-02-Terminal-And-First-Projects.
    slug = Column(String(200), nullable=False, index=True)

    opened_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    last_seen_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    # Set when the learner says they are done, not inferred from scrolling.
    completed = Column(Boolean, nullable=False, default=False)
    completed_at = Column(DateTime, nullable=True)
