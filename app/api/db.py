"""
The database connection.

Content is not in here — the guides stay in git and are read off disk. This
holds only *state*: what a person has done. That split is the rule the whole
project runs on, so it is worth restating where the engine is created.
"""
from __future__ import annotations

import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Local default matches docker-compose. Dokploy supplies the real one.
DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql+psycopg://course:course@localhost:5436/course",
)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)
Base = declarative_base()


def get_db():
    """Open a session, lend it out, and close it whatever happens."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
