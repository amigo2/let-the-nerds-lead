# Deploying to OVH

**Audience:** whoever is putting this on a server.
Same shape as the studio app this copies — see
[`course/notes/instructor/REFERENCE-Old-Street-Studios.md`](course/notes/instructor/REFERENCE-Old-Street-Studios.md).

---

## The shape of it

```
                ┌──────────────────── OVH VPS via Dokploy ────────────────────┐
                │                                                             │
  yourdomain    │   ┌─────────┐        ┌──────────────────────────────┐       │
      │         │   │ Traefik │───────►│  course-app                  │       │
      └─────────┼──►│  :80    │        │  FastAPI + built React       │       │
                │   │  :443   │        │  ONE container, one origin   │       │
                │   │  TLS    │        │                              │       │
                │   └─────────┘        │  course/*.md baked in        │       │
                │                      └──────────────────────────────┘       │
                └─────────────────────────────────────────────────────────────┘
```

**One container.** A Node stage builds the React bundle; FastAPI serves it from the same origin
as the API. No CORS, one deploy target, no separate static host.

**No database.** There is nothing to store yet — no accounts, no progress, no quiz answers. The
course is read from markdown baked into the image. Postgres arrives with login, and not before.

**No login.** Everything is public, deliberately, for now.

---

## What is in the image, and what is not

| In | Why |
|---|---|
| `app/` | The API |
| `course/guides`, `projects`, `curriculum`, `00-onboarding` | Read off disk on every request |
| `video-studio/scenes/` | Drives the interactive diagrams on a lesson page |
| `web/dist/` | The built React app |

| Out | Why |
|---|---|
| **`course/notes/`** | **Instructor only: business, pricing, correspondence. Must never ship.** |
| `course/video/` | Audio and rendered MP4s — large, and served elsewhere |
| `.claude/` | Agent configuration |
| `video-studio/` (bar `scenes/`) | The renderer and its `node_modules` |

`.dockerignore` enforces this. Its rules are ordered so nothing re-includes `course/notes` —
in Docker a later rule beats an earlier one, so that ordering is load-bearing.

**Verify it after any change to `.dockerignore`:**

```bash
docker build -t course-app .
docker run --rm course-app sh -c 'ls course/notes 2>/dev/null && echo LEAKED || echo clean'
```

---

## Environment

Copy `.env.example`. There are two real variables and that is all:

| Variable | What |
|---|---|
| `PORT` | Port the container listens on. Default 8000 |
| `APP_PORT` | Host port for local `docker compose` only. Default 8011 |

Nothing else is needed. No secrets exist yet, which is the main reason this deploy is simple.

---

## Locally, before it goes anywhere

```bash
docker compose up --build        # http://localhost:8011
curl localhost:8011/api/health   # {"status":"ok","documents":8}
```

Day-to-day development stays `make dev` — faster, with hot reload. Compose is for proving the
container.

---

## On Dokploy

1. **Create an Application**, source: this GitHub repository, branch `main`.
2. **Build type: Dockerfile.** The repository root is the build context.
3. **Port: 8000** — what the container listens on.
4. **Environment:** `PORT=8000`. That is the whole list.
5. **Domain:** add it in Dokploy; Traefik issues the certificate.
6. **Health check path:** `/api/health` — returns 503 if the app cannot see the course, so a
   broken image fails loudly instead of serving an empty sidebar.
7. **Deploy.**

### Publishing new course material

**A guide is not live until the image is rebuilt.** The markdown is baked in, so:

```
edit a guide  →  commit  →  push  →  redeploy on Dokploy
```

That is the trade for having no database and no CMS: publishing is a rebuild. If that becomes
tiresome, turn on Dokploy's auto-deploy webhook so a push to `main` redeploys on its own.

---

## What this deliberately does not do yet

- **No accounts.** Anyone with the URL reads everything.
- **No progress tracking.** Nothing is remembered between visits.
- **No rate limiting.** Fine at this size, worth revisiting if it is ever linked publicly.
- **No backups.** Nothing to back up — the content is in git and that is the source of truth.

Each of those arrives with Postgres, and Postgres arrives with login.
