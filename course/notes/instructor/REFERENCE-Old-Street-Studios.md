# Reference — Old Street Studios

**Captured:** 19 September 2026 · Instructor note.

Two documents in this repo lean on a separate project — the architecture the course website
copies, and the student projects the music strand proposes. **This is that information, written
down here so the bootcamp repo does not depend on a folder sitting next to it.**

Nothing in the bootcamp needs the studio project present any more. Everything below is a
snapshot; if the studio changes, this does not, and that is fine — what matters here is the
pattern, not the live code.

> No credentials are recorded in this document, deliberately. The studio project holds live
> third-party logins in an untracked, gitignored file.

---

## What it is

A booking, invoicing and remote-visibility system for a 28-year-old recording studio in Hoxton,
London. Grade II listed building, SSL Matrix 2 console, vintage Neumann / Neve / API outboard.

The business problem it solves: enquiries arrive and are not the bottleneck; what happens
*after* one arrives is unmeasured and partly manual. The owner is frequently abroad, so it has
to work remotely.

Relevant to us for exactly two things: **an architecture worth copying**, and **a set of real
projects for learners**.

---

## 1. The architecture the course website copies

This is what [`ROADMAP-Course-Production.md`](ROADMAP-Course-Production.md) refers to. It is
deployed and understood, which is why it was chosen over inventing something.

```
  ┌──────────────────── OVH VPS via Dokploy ────────────────────┐
  │  ┌─────────┐   ┌──────────────────────┐   ┌──────────────┐  │
  │  │ Traefik │──►│  app                 │──►│  Postgres    │  │
  │  │ :80/:443│   │  FastAPI + built     │   │  (Dokploy    │  │
  │  │   TLS   │   │  React — ONE container│   │   service)   │  │
  │  └─────────┘   └──────────────────────┘   └──────────────┘  │
  └─────────────────────────────────────────────────────────────┘
```

**The decisions worth stealing:**

| Decision | Why it matters |
|---|---|
| **One container** | A Node stage builds the React bundle; FastAPI serves it from the same origin. No CORS, one deploy target, no separate static host |
| **Postgres as a Dokploy service** | Not a container anyone babysits |
| **Traefik terminates TLS** | Certificates stop being a task |
| **Vite proxies `/api` in development** | Same-origin in production, proxied in development — the frontend code never knows the difference |
| **Types generated from OpenAPI** | `make types` regenerates the TypeScript types from FastAPI's schema. The single best defence against frontend and backend drifting apart |

**Layout:**

```
app/           FastAPI — JSON API only
  api/routers/     endpoints
  api/services/    business logic, kept out of the routers
  models/          SQLAlchemy
  ml/              local scikit-learn training
web/           React + TypeScript + Vite + TanStack Query
  src/pages/       one file per screen
  src/components/  shared UI
  src/lib/         API client, helpers
```

**Makefile as the interface**, which is worth copying wholesale: `install`, `db`, `dev`, `api`,
`web`, `build`, `stack`, `types`, `seed`, `demo`, `typecheck`. One verb per thing a developer
needs, so nobody has to remember a command.

**On hosted AI:** the Claude API is called outbound over HTTPS with an API key set as an
environment variable. No model on the box, no GPU, no container. Used for drafting replies
only — classification stays local scikit-learn, so client personal data never leaves the
server to be categorised, and enquiries keep being routed if the API is down. Cost at that
volume: a few dollars a year.

That split — **local model for the routine path, hosted model for the quality path** — is a
genuinely good teaching example for phase 8.

---

## 2. The learner projects

This is what [`MUSIC-HARDWARE-AI-Track.md`](MUSIC-HARDWARE-AI-Track.md) refers to. The studio's
app has a **Lab** section listing projects for people learning on real equipment.

The rule that makes them safe to hand to a beginner, quoted from that page:

> *"Everything here is deliberately off the booking path — nothing in this list can stop a
> session being booked or an invoice going out if it breaks."*

**Keep that constraint in anything we build for students.** Real work, zero blast radius.

| Project | Level | What it teaches |
|---|---|---|
| **Room conditions monitor** — temperature and humidity in the live room, charted, with an alert on drift | Starter | Sensor → network → API → UI, in physical form. The only hardware item with a real business case: humidity protects six figures of irreplaceable valve gear in a listed building |
| **Console control over MCP** — expose the SSL Matrix 2 to an assistant as tools | Hard | MCP, tool design, and a hard safety boundary. Read-only first, never during a live session. Note the catch: MCU and HUI reach the motorised faders and the DAW layer, **not** the analogue signal path |
| **Enquiry classifier, properly labelled** | Starter | 453 real enquiries over five years, currently labelled by regex. The existing ~88% partly measures "can it learn my rules", not truth. Teaches the most under-taught thing in ML: your evaluation is only as honest as your labels |
| **Reply quality evaluation** | Intermediate | Turning "the AI writes good emails" into a number. Building an eval set, scoring against what a good engineer would have sent |
| **Session provenance** — hash a master plus its metadata, anchor it publicly | Intermediate | Anchor the hash, never the audio. Be precise that the only thing it buys is verifiability by someone who does not trust you |

**The dataset is the valuable part.** 453 labelled enquiries spanning five years is a real,
messy, small dataset with a known flaw — worth more as teaching material than any tidy public
one.

---

## 3. What we are not taking

- The booking domain itself. Studios, sessions and invoices are that business's problem.
- Anything touching revenue. The Lab rule exists for a reason.
- Live credentials of any kind.

---

## If the studio is ever needed again

It is a separate git repository with its own README, `ROADMAP.md`, `KNOWLEDGE_BASE.md` and
`SPEC-V1-BOOKING-SPINE.md`. Nothing in the bootcamp links to it any more, and nothing should.
