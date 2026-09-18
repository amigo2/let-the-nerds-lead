# Master Content Index — Full Stack + AI Bootcamp

> Production document, aligned with the [master curriculum](CURRICULUM-Full-Stack-AI-Bootcamp.md).

## Program model

- **65 guides = 65 course days**, numbered continuously from 00 to 64.
- **One guide = one day = one major topic + one practical outcome.**
- Order: setup/Claude Code → web concepts → first guided project → Python → FastAPI → PostgreSQL → TypeScript → React → testing → containers and DevOps → applied AI → mobile → employability → final project.
- Python is the first language and the primary backend and AI language.
- TypeScript is the second language, introduced when the student is ready to build the frontend.
- There is no standalone JavaScript block. Only the minimum context needed inside TypeScript, browser APIs, and React is explained.
- Frontend is taught practically and condensed; deep HTML and CSS specialization is not the goal.
- Terminal work, installation, exact commands, scaffolding, and repetitive configuration are Claude-assisted. The student must understand the purpose, the risk, and the result, but not memorize low-value syntax.
- Git and GitHub appear inside real work from the first project, not as a long isolated phase.
- **The agent ships configured in the repository; it is not configured with prompts.** The repo includes `CLAUDE.md`, seven Agent Skills, seven slash commands, two subagents, permission rules, and safety hooks. The student does not paste a behavior prompt: the teaching contract, the evidence requirement, and the boundaries load automatically when the session opens.
- **The course is delivered continuously.** Material is written while students are enrolled, so a clone goes stale within days. A session-start hook detects it and Claude offers `/update-course`. Student notes and code live **outside** this repo, so every update is a clean fast-forward.

## Production states

| Mark | State | Meaning |
|---|---|---|
| `—` | Not started | No developed content exists |
| `ESQ` | Outline | Structure defined |
| `TXT` | Text | Guide written and reviewed |
| `GUI` | Script | Video script prepared |
| `VID` | Video | Video produced |
| `OK` | Closed | Text, practice, and video validated with students |

---

## Phase map

| Phase | Guides | Days | Outcome |
|---|---:|---:|---|
| 0. Setup, Claude, and first project | 00–03 | 4 | Environment ready and first web system understood |
| 1. Python foundations | 04–08 | 5 | Small programs written and reasoned about |
| 2. FastAPI and backend engineering | 09–14 | 6 | Structured, validated REST API |
| 3. PostgreSQL and persistence | 15–19 | 5 | Relational data modeled, queried, and migrated |
| 4. TypeScript as the second language | 20–24 | 5 | Typed code for browser and frontend |
| 5. React with TypeScript | 25–30 | 6 | Usable frontend connected to the API |
| 6. Testing and quality | 31–34 | 4 | Backend, frontend, and complete flows validated |
| 7. Containers, DevOps, and deployment | 35–46 | 12 | System operated on infrastructure the student controls |
| 8. Applied AI engineering | 47–52 | 6 | Safe, evaluated, data-connected AI features |
| 9. Mobile with Expo | 53–56 | 4 | Mobile client connected to the backend |
| 10. Employability | 57–59 | 3 | Professional profile and technical defense ready |
| 11. Final project | 60–64 | 5 | Product defined, built, deployed, and presented |
| | **Total** | **65** | |

---

## Production index, guide by guide

### Phase 0 — Setup, Claude Code, and first project

| # | Guide | State | Practical outcome |
|---:|---|---|---|
| 00 | [VS Code, Claude Code, GitHub, and safe learning with an agent](../00-onboarding/CLASS-00-First-Contact-VS-Code-Claude-and-Starter-Prompt.md) | TXT | Repo cloned and agent verified: `CLAUDE.md`, skills, and slash commands working |
| 01 | [What a web system is: frontend, backend, HTTP, JSON, and APIs](../guides/GUIA-01-Que-es-una-App-Web-FE-y-BE.md) | TXT | Trace a complete request and response |
| 02 | [Local workflow with Claude-assisted terminal and Git](../guides/GUIA-02-Terminal-y-Primeros-Proyectos.md) | TXT | Open, run, inspect, stop, and save a project |
| 03 | [First guided project: architecture before syntax](../guides/GUIA-03-Conceptos-Para-Tu-Primer-Proyecto.md) | TXT | Build and explain a small end-to-end feature |

> [TAREA-01 — La Cesta](../projects/TAREA-01-La-Cesta-FE-BE-y-GitHub.md) and [PROYECTO-01 — App de Salud](../projects/PROYECTO-01-App-de-Salud-Paso-a-Paso.md) are existing practical material. They must be reviewed so they fit as progressive projects of the new track rather than as misaligned prerequisites.

### Phase 1 — Python foundations

| # | Major topic | State | Practical outcome |
|---:|---|---|---|
| 04 | Variables, types, and basic operations | — | Read and predict a small program |
| 05 | Conditionals, loops, and program flow | — | Solve a problem with controlled flow |
| 06 | Functions, arguments, and return values | — | Break a problem into reusable functions |
| 07 | Lists, dictionaries, and data structures | — | Model real data in memory |
| 08 | Files, errors, and modules | — | Read, write, and handle failures safely |

### Phase 2 — FastAPI and backend engineering

| # | Major topic | State | Practical outcome |
|---:|---|---|---|
| 09 | What an API is and what FastAPI does | — | Serve a first endpoint |
| 10 | Routes, parameters, and responses | — | Build a readable route surface |
| 11 | Pydantic: validation and data contracts | — | Reject invalid input with clear errors |
| 12 | Project structure, routers, and dependencies | — | Organize a growing API |
| 13 | Authentication, authorization, and secrets | — | Protect an endpoint and keep secrets out of Git |
| 14 | Errors, logging, and API documentation | — | Debug and document the API from evidence |

### Phase 3 — PostgreSQL and persistence

| # | Major topic | State | Practical outcome |
|---:|---|---|---|
| 15 | Relational databases and data modeling | — | Design tables and relationships |
| 16 | SQL: queries, filters, and joins | — | Answer real questions with SQL |
| 17 | SQLAlchemy and the ORM | — | Persist API data |
| 18 | Migrations with Alembic | — | Evolve the schema without losing data |
| 19 | Indexes, transactions, and performance | — | Diagnose and fix a slow query |

### Phase 4 — TypeScript as the second language

| # | Major topic | State | Practical outcome |
|---:|---|---|---|
| 20 | From Python to TypeScript: the minimum JavaScript needed | — | Read typed code without guessing |
| 21 | Types, interfaces, and type safety | — | Model the API contract in types |
| 22 | Functions, async, and promises | — | Consume the backend from typed code |
| 23 | Node, npm, and the project toolchain | — | Set up and explain a frontend project |
| 24 | HTML and CSS, condensed and practical | — | Build a usable, accessible layout |

### Phase 5 — React with TypeScript

| # | Major topic | State | Practical outcome |
|---:|---|---|---|
| 25 | Components, props, and JSX | — | Compose a first interface |
| 26 | State and events | — | Make the interface react to the user |
| 27 | Effects and data fetching | — | Display real backend data |
| 28 | Forms, validation, and error states | — | Submit and validate data end to end |
| 29 | Routing and application structure | — | Navigate a multi-screen application |
| 30 | Shared state, authentication, and sessions | — | Keep an authenticated user across the app |

### Phase 6 — Testing and quality

| # | Major topic | State | Practical outcome |
|---:|---|---|---|
| 31 | Why testing exists and what to test | — | Choose what deserves a test |
| 32 | Backend testing with pytest | — | Cover the API with meaningful tests |
| 33 | Frontend testing and component tests | — | Validate interface behavior |
| 34 | End-to-end tests and code quality | — | Validate one complete user flow |

### Phase 7 — Containers, DevOps, and deployment

The hands-on track is **Dokploy on an OVH VPS**: infrastructure the student provisions, pays for, breaks, and recovers. Managed cloud is taught afterwards as a comparison with real numbers, not as the default.

| # | Major topic | State | Practical outcome |
|---:|---|---|---|
| 35 | Docker images, layers, and containers | — | Package one component reproducibly |
| 36 | Docker Compose for frontend, API, and database | — | Run the complete system locally |
| 37 | CI/CD with GitHub Actions | — | Validate every change automatically |
| 38 | Production architecture: reverse proxy, load balancer, managed database, DNS, and TLS | — | Draw and defend production before building it |
| 39 | Linux servers on OVH: provisioning, SSH keys, users, firewall, and hardening | — | Reach a hardened server the student controls |
| 40 | Dokploy: self-hosted PaaS and the first real deployment | — | Serve the app from the student's own infrastructure |
| 41 | Environments, secrets, domains, and HTTPS in Dokploy | — | Release with valid TLS and no secret in Git |
| 42 | Load balancing and horizontal scaling: health checks, sessions, zero-downtime releases | — | Run two instances behind one entry point |
| 43 | Databases in production: managed vs self-hosted, backups, restore, migrations under load | — | Restore from backup and prove the data survived |
| 44 | Operations: logs, metrics, alerting, rollback, and incident response | — | Recover from a deliberately broken release |
| 45 | Infrastructure as Code: Terraform providers, state, and provisioning OVH from code | — | Rebuild the infrastructure from versioned code |
| 46 | AWS depth: IAM, VPC, ALB, RDS, ECS Fargate, and Lambda | — | Compare VPS vs managed AWS on cost, latency, and operational burden |

> Every student pays for their own OVH VPS and AWS sandbox, and is taught to tear both down. Cost control is part of the phase, not an afterthought.

### Phase 8 — Applied AI engineering

| # | Major topic | State | Practical outcome |
|---:|---|---|---|
| 47 | Models, tokens, context, capabilities, and limits | — | Select and justify a model |
| 48 | Model APIs and provider boundaries: direct APIs, Amazon Bedrock, self-hosted inference | — | Add a reliable AI endpoint behind a provider-agnostic interface |
| 49 | Prompts, privacy, prompt injection, and human approval | — | Build a constrained, reviewable interaction |
| 50 | Embeddings, vector search, and RAG | — | Answer questions using approved data |
| 51 | Tool calling, agentic RAG, LangGraph, and bounded agents | — | Build an agent with explicitly permitted tools |
| 52 | Evaluating and operating AI in production: datasets, tracing, quality gates, latency, cost | — | Measure the AI feature, then ship it through the Phase 7 pipeline |

### Phase 9 — Mobile with Expo

| # | Major topic | State | Practical outcome |
|---:|---|---|---|
| 53 | Expo and React Native differences from web React | — | Run the first mobile screen |
| 54 | Components, styling, navigation, and forms | — | Build a navigable mobile flow |
| 55 | API, authentication, storage, and device permissions | — | Connect the app safely to the backend |
| 56 | Notifications, builds, and store delivery | — | Produce an installable build |

### Phase 10 — Employability

| # | Major topic | State | Practical outcome |
|---:|---|---|---|
| 57 | Portfolio, CV, LinkedIn, GitHub, and project storytelling | — | Publish a coherent professional profile |
| 58 | Complexity, data structures, and interview patterns | — | Solve and explain a problem aloud |
| 59 | Junior system design, live coding, and technical defense | — | Complete a realistic mock interview |

### Phase 11 — Final project

| # | Major topic | State | Practical outcome |
|---:|---|---|---|
| 60 | Problem, users, constraints, and scope | — | Get a one-page scope approved |
| 61 | Architecture, data, API contract, AI boundary, and tickets | — | Produce diagrams and an ordered plan |
| 62 | Backend and data build with review | — | Deliver the tested core |
| 63 | Client, AI, deployment, and validation | — | Release the complete product |
| 64 | Demo, retrospective, portfolio, and defense | — | Present and defend with evidence |

---

## Condensation rule

Each day introduces **one major topic**. Configuration, commands, boilerplate, and secondary details are subordinate to that day's outcome and may be done with Claude. If a guide needs more time, the practical work is extended; several unrelated major topics are not added to the same day.

## Claude Code configuration in this repository

This configuration is course material: in Phase 0 the student **uses** it, and in Phase 8 (guides 47–52) they learn to **build** it. The repo itself is the reference implementation.

| File or folder | Function |
|---|---|
| [`CLAUDE.md`](../../CLAUDE.md) | Project memory. Loads every session: how to teach, what to verify, what never to do |
| `.claude/skills/socratic-tutor` | Hint ladder: never hands over the exercise before the student attempts it |
| `.claude/skills/course-navigator` | Locates the right guide and respects prerequisites; never teaches ahead |
| `.claude/skills/error-triage` | One hypothesis and one fix at a time |
| `.claude/skills/verify-before-claiming` | Evidence table: saying "it works" without output is forbidden |
| `.claude/skills/git-safety` | Review the diff before committing; secret hygiene |
| `.claude/skills/guide-authoring` | Instructor only: write new guides in house style |
| `.claude/skills/course-sync` | Keeps the student's copy current without losing their local notes |
| `.claude/commands/` | `/start-session`, `/update-course`, `/hint`, `/check`, `/explain`, `/next`, `/end-session` |
| `.claude/agents/code-reviewer` | Read-only teaching review: reports, never rewrites student code |
| `.claude/agents/curriculum-auditor` | Instructor only: audits broken links, content gaps, prerequisite violations |
| `.claude/settings.json` | `allow` / `ask` / `deny` permissions; secrets and `sudo` denied |
| `.claude/hooks/` | Block `rm -rf`, `git push --force`, `git reset --hard`, `curl \| sh`; catch API keys before a commit; flag a stale copy at session start |

> Hooks are `.sh` scripts and need the execute bit. If it is lost on clone:
> `chmod +x .claude/hooks/*.sh`. A hook without permission **fails silently**.

## Live course: staying in sync with students

Material is written while students are already enrolled, so each local copy goes stale within
days. This is handled in the repo and does not depend on manual announcements:

| Mechanism | When it acts |
|---|---|
| `SessionStart` hook (`check-course-updates.sh`) | On session open: tells Claude if new commits exist. Silent when current. Fetches at most every 30 min, with an 8 s network limit |
| `/update-course` | Pulls with `git pull --ff-only`, shows what changed, and verifies the result |
| `/start-session` and `/next` | Check again; `/next` is the critical moment because that is when new material lands |
| `course-sync` skill | Decides how to update based on working-tree state, without losing student notes |

Rules that hold this together:

- **Students do not edit course files.** Their notes and code live outside the repo, so
  `pull --ff-only` is always clean.
- **If a file referenced by the index is missing, the student is behind** — the course is not
  broken. Claude checks before claiming something does not exist.
- After updating `CLAUDE.md` or `.claude/`, **restart the session**: they load at startup.

Instructor publishing discipline: [publishing material with active students](../notes/instructor/RELEASE-Publicar-Material-Con-Alumnos-Activos.md).

## Related internal documents

Instructor documents live in `course/notes/instructor`:

- Publishing: [publishing material with active students](../notes/instructor/RELEASE-Publicar-Material-Con-Alumnos-Activos.md).
- Content production: [AI production pipeline](../notes/instructor/production/PIPELINE-PRODUCCION-IA.md).
- Proposal and business: [full proposal](../notes/instructor/business/propuesta-bootcamp-sevilla.md).
- First message: [WhatsApp ready to send](../notes/instructor/WHATSAPP-First-Contact-Ready-to-Send.md).
