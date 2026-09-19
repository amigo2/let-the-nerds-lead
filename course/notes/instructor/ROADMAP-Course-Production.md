# Course production roadmap — guides, website, video

**Author:** Fernando · **Created:** 19 September 2026 · **Status:** Phase A not started
Instructor planning doc. Companion to [`production/PIPELINE-PRODUCCION-IA.md`](production/PIPELINE-PRODUCCION-IA.md),
which stays the authority on **how video gets made**. This one covers **what gets built, in
what order, and what gates what**.

---

## Where we actually are

| | |
|---|---|
| Guides written | **3** of 65 (days 01, 02, 03) |
| Projects written | 2 (PROJECT-01 at day 03, ASSIGNMENT-01 at day 36) |
| Students enrolled | **2**, currently on day 03 |
| Website | does not exist |
| Video | does not exist |

**The students are the clock.** Everything below is paced against them, not against a
calendar we invented.

---

## The one principle that sequences everything

From the pipeline doc, and it still holds: **markdown in git is the source of truth.**
Everything else — the website, the video, the quizzes — is a *derived build*.

Adding a database does not change that. It draws a line:

```
CONTENT           →  git, markdown, reviewed in PRs      →  rebuild, never migrate
STATE             →  Postgres                            →  migrate, never rebuild
```

| Lives in git | Lives in Postgres |
|---|---|
| Guide and project prose | Users and sessions |
| Curriculum and index | Progress: which day, which self-check ticked |
| Diagrams, scripts, quiz definitions | Quiz *answers* and attempts |
| Video source (Remotion, screencasts) | Enrolments, payments later |

> **The rule that keeps this healthy:** if a guide's text ever gets edited in a web admin
> form, we have lost. Content is code — it gets branched, reviewed and rebuilt. The day that
> stops being true, maintaining the course becomes a project again instead of a `rebuild`.

---

## Decisions taken (19 September 2026)

| Decision | Choice | Why |
|---|---|---|
| **Naming** | `GUIDE-NN-Title-In-Kebab-Case.md`, `PROJECT-NN-`, `ASSIGNMENT-NN-` | English throughout. Sorts, greps, pairs. URLs are *derived*, so a retitle never breaks a shared link |
| **Writing strategy** | Outline all 65 → write full guides just ahead of the students, 5–10 guide buffer | Real feedback per guide, always shippable, nothing wasted when the curriculum moves |
| **Website stack** | FastAPI + React + TypeScript + Postgres, same architecture as Old Street Studios | Proven, already deployed once, and it *is* the course's own stack |
| **Video** | Unchanged from the pipeline doc: 70–80% screencast, 10–15% diagrams, 10–15% face | Already decided, already correct |
| **Own LLM** | **Parked** | Scripts are the cheapest layer in the cost table. Self-hosting optimises the wrong one |

---

## Architecture — copied deliberately, not reinvented

Mirrors `~/Desktop/old-street-studios`, which is deployed and understood:

```
  ┌──────────────────── OVH VPS via Dokploy ────────────────────┐
  │  ┌─────────┐   ┌──────────────────────┐   ┌──────────────┐  │
  │  │ Traefik │──►│  course-app          │──►│  Postgres    │  │
  │  │ :80/:443│   │  FastAPI + built     │   │  (Dokploy    │  │
  │  │   TLS   │   │  React — ONE container│   │   service)   │  │
  │  └─────────┘   └──────────┬───────────┘   └──────────────┘  │
  └───────────────────────────┼─────────────────────────────────┘
                              │ reads at build time
                    ┌─────────┴──────────┐
                    │  course/guides/*.md │  ← git, the source of truth
                    └────────────────────┘
```

Inherited wholesale, because it already works:

- **One container.** Node stage builds the React bundle, FastAPI serves it same-origin →
  no CORS, one deploy target, no separate static host.
- **`make dev` / `make build` / `make stack`** — same shape of Makefile.
- **`make types`** — regenerate TS types from FastAPI's OpenAPI schema. Worth copying on day
  one; it is the thing that stops frontend and backend drifting.
- **Postgres as a Dokploy service**, not a container we babysit.

**This is also the course's own Phase 7 in miniature** — days 35–46 teach Docker, Compose,
reverse proxy, TLS, Dokploy and OVH. The site a student is reading the lesson on *is* the
worked example of the lesson. Say that out loud on the site; it is a genuine selling point.

---

## Phases

### Phase A — Make the cheap-now things cheap (days, not weeks)

Everything here gets more expensive the longer it waits.

| Step | Why it is first |
|---|---|
| **A1** Rename to English (`GUIDE-`, `PROJECT-`, `ASSIGNMENT-`) | 5 files today. After 54 guides and live URLs it is a migration with redirects |
| **A2** Update `CLAUDE.md`, `guide-authoring`, `course-navigator` to the new convention | The agent teaches the convention; it has to know it |
| **A3** Tell the two students to pull | Second rename in a week — warn them *before*, not after |

**Gate → B:** repo renamed, links resolve, students updated.

> A1 is the second rename in a fortnight. That is annoying and it is still right: doing it at
> 3 guides costs an hour, doing it at 57 with a live site costs a weekend and breaks links.

### Phase B — Outline all 65 (one pass, one sitting to review)

Not prose. Per day: title, one-paragraph framing, section headings, the practical outcome,
the self-check items, glossary stubs. The house structure from `guide-authoring`.

**Why the whole 65 at once when the guides are written just-in-time:** the outline is where
you catch the things that are expensive to find later —

- a concept used on day 22 that is not taught until day 27,
- the same idea explained twice in two phases,
- a day with two unrelated major topics, which the condensation rule forbids,
- a day whose stated practical outcome cannot actually be produced with what has been taught.

Finding those in 65 skeletons is an afternoon. Finding them in 43,000 written lines is a
rewrite. Run `curriculum-auditor` over the outlines when they exist — that is exactly what it
is for.

**Gate → C:** 65 outlines exist, audited, prerequisite order clean.

### Phase C — The pilot: one guide, all the way through

Deliberately one, deliberately end to end, before committing to a pipeline. This is section 10
of the pipeline doc, unchanged, plus the website:

1. Write **GUIDE-04** in full, from its outline.
2. Stand up the website skeleton and render guides 01–04 from markdown.
3. Produce the **video for GUIDE-01** (already written, conceptual, diagram-heavy): clone the
   voice, generate and hand-correct the script, Mermaid diagrams, screencast the DevTools
   exercise, assemble 10–15 minutes.
4. **Show both students.** Is it better than the YouTube links they have now?

**Measure and write down:** hours spent per layer, cost per guide, and what the students said.

**Gate → D:** the numbers exist. If a video costs more than it is worth, we stop at markdown
and a website and that is a perfectly good course.

### Phase D — Scale, paced by the students

- Write guides in curriculum order, staying **5–10 ahead** of where the students are.
- Video only for guides where video earns its place. Not all 65 need one.
- Build the pipeline properly only once it is doing ≥20 guides — the threshold your own
  section 9 sets.
- Login, progress and quizzes land here, not before. They are worth nothing with 4 guides.

---

## What each thing is gated on

```
A  rename ──────────────► nothing. Do it now
                │
B  outline 65 ──┴───────► A, so the filenames are final
                │
C  pilot ───────┴───────► B for GUIDE-04's outline; guides 01-03 already exist
     │
     ├── website skeleton    ← not blocked on content. Can start during B
     └── video for GUIDE-01  ← not blocked on anything. Can start today
                │
D  scale ───────┴───────► C's numbers existing and being acceptable
```

Two things are **not** blocked and can run in parallel with everything: the website skeleton,
and the GUIDE-01 video pilot.

---

## The traps

| Trap | Why it is likely |
|---|---|
| **Building the pipeline before the guides** | It is the fun part. Your own section 9 puts the payoff at ~20 guides; we have 3 |
| **Writing all 54 before teaching them** | 43,000 lines with zero student feedback, obsolete the next time the curriculum moves |
| **Content drifting into the database** | A CMS feels like progress. It ends "rebuild, never migrate" and the course starts ageing again |
| **Login before there is a course to log into** | Auth is a fortnight. Four guides do not need accounts |
| **The site becoming a React project instead of a course** | Ship the ugliest thing that renders markdown, then stop touching it until the guides exist |
| **Quality of the video deciding the course's reputation** | Section 9 again: a bootcamp sold on a real instructor cannot look AI-generated. Declare the AI use openly — it is also literally on the syllabus |

---

## Open questions

- **Does the website have a public face, or is it students-only?** Marketing site and course
  app are different products; decide before building either.
- **Which guides genuinely need video?** Probably the conceptual and the setup ones. Days of
  pure syntax may be better as text plus exercises. Decide with data after Phase C.
- **Where does PROJECT-01 live on the site** — a page like a guide, or a different shape?
  Projects are read side by side with their guide, which a one-column layout fights.
- **Spanish edition.** Currently deferred. It is another *build* from the same markdown, which
  is the whole point of the principle — but it doubles the video cost, because voice and
  screencasts do not translate for free.

---

## Next concrete action

**Phase A1 — the rename.** One hour, mechanical, and it gets cheaper-now out of the way before
anything is built on top of the current names.
