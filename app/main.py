"""
The course app.

Same shape as the studio booking app it is modelled on: FastAPI serves a JSON
API, and in production also serves the built React bundle from the same origin —
so there is no CORS, one container, and one deploy target.

No database yet, deliberately. Nothing has state until there are accounts and
progress to store. Content lives in git and is read off disk.
"""
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.routers import content

ROOT = Path(__file__).resolve().parents[1]
BUNDLE = ROOT / "web" / "dist"

app = FastAPI(title="Full Stack + AI Bootcamp", version="0.1.0")

# Development only: Vite serves the frontend on :5173 and proxies /api here.
# In production the bundle is served below, from this same origin, so this
# never applies.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(content.router)

# Built frontend, if it exists. Last, so it never shadows /api.
if BUNDLE.is_dir():
    app.mount("/", StaticFiles(directory=BUNDLE, html=True), name="web")
