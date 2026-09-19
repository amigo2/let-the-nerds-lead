---
name: course-navigator
description: Locate the correct bootcamp material and respect prerequisites. Use when the student asks what to do next, which guide covers a topic, whether they are ready for something, where a file is, or asks about a topic from a later phase than their current class. Prevents teaching ahead of the curriculum.
---

# Course Navigator

## Repository map

| Path | Audience | Contents |
|---|---|---|
| `README.md` | Everyone | Entry point and setup |
| `CLAUDE.md` | Agent | Persistent behaviour contract |
| `course/00-onboarding/` | Students | Class 00, first contact |
| `course/curriculum/` | Both | Master syllabus and content index |
| `course/guides/` | Students | Daily learning material |
| `course/projects/` | Students | Assignments and applied builds |
| `course/notes/` | **Instructors only** | Private: business, pricing, production |

`course/notes/**` is off limits in a student session. Do not read it, quote it, or summarise
it to a student.

## Phase map — 65 guides, days 00–64

| Phase | Guides | Topic |
|---|---|---|
| 0 | 00–03 | Setup, Claude Code, web concepts, first guided project |
| 1 | 04–08 | Python foundations |
| 2 | 09–14 | FastAPI and backend engineering |
| 3 | 15–19 | PostgreSQL and persistent data |
| 4 | 20–24 | TypeScript as second language |
| 5 | 25–30 | React with TypeScript |
| 6 | 31–34 | Testing and quality |
| 7 | 35–46 | Containers, DevOps, and deployment (Dokploy on OVH; Terraform and AWS compared) |
| 8 | 47–52 | Applied AI engineering |
| 9 | 53–56 | Mobile with Expo |
| 10 | 57–59 | Employability |
| 11 | 60–64 | Final project |

Authoritative detail: `course/curriculum/CURRICULUM-Full-Stack-AI-Bootcamp.md` and
`course/curriculum/INDICE-MAESTRO-CONTENIDO.md` (with links to each written guide). Read them
rather than trusting this summary if there is any doubt.

## Existing material

Not all 65 guides are written yet. Currently in the repo:

- `course/00-onboarding/CLASS-00-First-Contact-VS-Code-Claude-and-Starter-Prompt.md` → day 00
- `course/guides/GUIDE-01-What-Is-A-Web-App-FE-And-BE.md` → day 01
- `course/guides/GUIDE-02-Terminal-And-First-Projects.md` → day 02
- `course/guides/GUIDE-03-Concepts-For-Your-First-Project.md` → day 03
- `course/projects/PROJECT-01-Health-App-Step-By-Step.md`
- `course/projects/ASSIGNMENT-01-The-Basket-FE-BE-And-GitHub.md`

**The guide number is the day number.** Day NN is `GUIDE-NN-*.md`; day 00 is the onboarding
`CLASS-00` document. If a filename and a day ever disagree, the master index wins — report the
mismatch rather than guessing.

**This list goes out of date — the course is being written while students are enrolled.** If a
guide the index references is not on disk, do **not** conclude it does not exist. Run
`git fetch origin && git status -sb` first: the student is probably behind. See `course-sync`.

Only after fetching, if the guide is genuinely unwritten, say so plainly and offer the nearest
available material. **Do not invent a guide or fabricate its contents.**

## Prerequisite discipline

Before answering a technical question, establish the student's current day.

- Answering with a later-phase tool is harmful even when correct. A student on day 05 gets a
  `for` loop, not a list comprehension. A student on day 10 gets a plain function, not a
  dependency injection.
- If a student asks about a much later topic, give a two-sentence honest preview, say which
  guide covers it properly, and steer back to the current objective.
- If a student is missing a prerequisite, name the specific earlier guide and offer a short
  refresher rather than pushing forward on a broken foundation.

## Routing common requests

| Student says | Route to |
|---|---|
| "what's next" | Master index → next day → its practical outcome |
| "I don't get frontend vs backend" | GUIDE-01 (day 01) |
| "terminal scares me" | GUIDE-02 (day 02) |
| "how do FastAPI and fetch connect" | GUIDE-03 (day 03) |
| "I want to build something real" | PROJECT-01 or ASSIGNMENT-01 |
| "am I ready for React" | Check phases 1–4 outcomes are demonstrable, not just read |

## Readiness is demonstrated, not claimed

A day is complete when the student can produce the **practical outcome** and pass the
self-check — not when they have read the document. Students with prior experience may validate
a guide through its outcome instead of repeating setup, but the outcome still has to be shown.
