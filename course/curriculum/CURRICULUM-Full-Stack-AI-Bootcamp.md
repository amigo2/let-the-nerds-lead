# Full Stack + AI Bootcamp — Course Curriculum

> **"Engineering is the art of designing, testing, and validating new solutions under constraints — and with AI as your co-pilot, you'll learn to fly on your own."**

English master version of the course content (the *syllabus*). Spanish translation to follow.


---

## Overview

- **92 classes** *(draft fix: was 96 — guides 00–95; now 92 — guides 00–91 after Block 1 went 6→3 and Blocks 2+5 merged 12→11 — please verify)*, grouped into **15 blocks** (0–14).
- The atomic unit of the program: **1 guide = 1 class = one markdown document + its videos + its exercises.**
- Every class follows the same structure: concept → analogy → worked example, one flagship exercise, short repeatable drills, videos, a cheat sheet, literal common errors and how to read them, a glossary, and a self-check checklist before moving on.
- Same content, two pacing tracks (see [Pacing options](#pacing-options)).

---

## Curriculum at a glance

| # | Block | Guides | Count |
|---|---|---|---|
| 0 | Fundamentals & environment | 00–02 | 3 |
| 1 | HTML as a wrapper + CSS essentials | 03–05 | 3 |
| 2 | TypeScript fundamentals | 06–11 | 6 |
| 3 | TypeScript in the browser | 12–16 | 5 |
| 4 | Git & GitHub | 17–20 | 4 |
| 5 | React with TypeScript | 21–30 | 10 |
| 6 | Python | 31–36 | 6 |
| 7 | FastAPI & APIs | 37–44 | 8 |
| 8 | PostgreSQL & data | 45–50 | 6 |
| 9 | Testing | 51–56 | 6 |
| 10 | Docker, cloud & deployment | 57–64 | 8 |
| 11 | Expo & mobile | 65–70 | 6 |
| 12 | AI applied to development | 71–78 | 8 |
| 13 | Employability & interviews | 79–86 | 8 |
| 14 | Final project | 87–91 | 5 |
| | **Total** | | **92** |

---

## Block-by-block syllabus

### Block 0 — Fundamentals & environment

| # | Class |
|---|---|
| 00 | Set up your AI-assisted workspace: install VS Code, add Claude, and use the course starter prompt |
| 01 | The terminal and your first projects |
| 02 | What is a web app? Frontend, backend, architecture, and the essential VS Code workflow |

> **Class 00 — Learning how to learn with AI:** Every student begins by installing and configuring VS Code and adding Claude to the editor. The class then introduces a shared starter prompt that helps the student reason, ask useful questions, break work into steps, validate generated code, interpret errors, and learn rather than blindly copy AI output. See [Class 00 — First Contact: VS Code, Claude, and Your Starter Prompt](../00-onboarding/CLASS-00-First-Contact-VS-Code-Claude-and-Starter-Prompt.md) for the ready-to-send WhatsApp message, setup instructions, first prompt, safety rules, and instructor checklist.

> **TAREA-01 — The Shopping Basket** comes right after class 01. It is the student's first complete app: React + FastAPI + PostgreSQL in Docker, no auth, delivered via GitHub. It deliberately pulls forward part of block 4 (Git), block 8 (database), and block 10 (Docker), because students need to ship work from month one.

> 📝 **DRAFT NOTE (your words — edit later):** "Fundamentals Miro AWS everyhitng Architectutra is the firast thisng really
> we will create this with React the toool.."
> *(Interpretation: architecture comes first — fundamentals, Miro, AWS; the whiteboard/diagram tool itself will be built with React.)*

> 📝 **DRAFT NOTE (your words — edit later):** "Local setup for dev"
> *(Interpretation: local development setup belongs in Block 0.)*

### Block 1 — HTML as a wrapper + CSS essentials

*Enough HTML/CSS to host and style a real app — HTML is the wrapper, the app itself is TypeScript + React. Deep CSS mastery is not a goal of this block.*

| # | Class |
|---|---|
| 03 | HTML as a wrapper: the shell around the app |
| 04 | CSS essentials: selectors, box model, Flexbox, and responsive survival kit |
| 05 | Bootstrap + Tailwind: use component and utility libraries, don't build design systems |

### Block 2 — TypeScript fundamentals

| # | Class |
|---|---|
| 06 | Why TypeScript. Variables, types, inference, and operators |
| 07 | Conditionals, loops, and functions with typed signatures |
| 08 | Arrays, objects, and typed collections: intro to interfaces |
| 09 | Array methods: map, filter, reduce with typed callbacks |
| 10 | Interfaces, types, and generics |
| 11 | Tooling: the compiler, tsconfig, typical errors — and how to read JavaScript you find in the wild |

### Block 3 — TypeScript in the browser

| # | Class |
|---|---|
| 12 | The DOM in TypeScript: reading and modifying the page |
| 13 | Events and forms with typed events |
| 14 | Asynchrony: callbacks, promises, and async/await |
| 15 | Fetch: talking to a real API with typed responses |
| 16 | TypeScript in React: typed props, state, and events (bridge to Block 5) |

### Block 4 — Git & GitHub

| # | Class |
|---|---|
| 17 | Git: why it exists, commits, and the basic workflow |
| 18 | Branches, merge, and conflict resolution |
| 19 | GitHub: remotes, pull requests, and code review |
| 20 | Working as a team: GitFlow, issues, and boards |

### Block 5 — React with TypeScript

| # | Class |
|---|---|
| 21 | What problem does React solve? JSX and your first component |
| 22 | Props and component composition |
| 23 | State: useState |
| 24 | Lists, keys, and conditional rendering |
| 25 | Controlled forms |
| 26 | Effects: useEffect and the component lifecycle |
| 27 | Consuming an API from React |
| 28 | Routing: React Router |
| 29 | Global state: context, and when NOT to use it |
| 30 | Custom hooks and organizing a React project |

### Block 6 — Python

| # | Class |
|---|---|
| 31 | Python: syntax, types, and control flow |
| 32 | Data structures: lists, dictionaries, sets, and tuples |
| 33 | Functions, modules, and packages |
| 34 | Classes and objects: just what you need |
| 35 | Virtual environments, pip, and dependency management |
| 36 | Files, errors, and logging |

> 📝 **DRAFT NOTE (your words — edit later):** "Python as main language.. brief super fast how to program, you can skip but need to finish this the sooner the better"
> *(Interpretation: positioning note for Block 6 — Python is the main language; keep it brief and fast; skippable, but it should be finished as soon as possible.)*

### Block 7 — FastAPI & APIs

| # | Class |
|---|---|
| 37 | FastAPI: your first endpoint and automatic documentation |
| 38 | Routes, parameters, and validation with Pydantic |
| 39 | Designing a REST API: resources, verbs, and status codes |
| 40 | Authentication: JWT, login, and protecting routes |
| 41 | The structure of a serious backend project |
| 42 | Async in Python, and when it actually helps |
| 43 | Connecting your React frontend to your API |
| 44 | Errors, middleware, and basic observability |

### Block 8 — PostgreSQL & data

| # | Class |
|---|---|
| 45 | Relational databases: why tables and not files |
| 46 | SQL: SELECT, WHERE, JOIN, and aggregations |
| 47 | Data modeling: keys, relationships, and useful normalization |
| 48 | SQLAlchemy: the ORM, and how not to fight it |
| 49 | Migrations with Alembic without breaking production |
| 50 | Indexes, performance, and slow queries |

### Block 9 — Testing

| # | Class |
|---|---|
| 51 | Why we test. Types of tests and the testing pyramid |
| 52 | Pytest: first tests, fixtures, and parametrization |
| 53 | Testing an API: test database and mocks |
| 54 | Vitest and React Testing Library |
| 55 | End-to-end with Playwright |
| 56 | TDD in practice: a kata from start to finish |

### Block 10 — Docker, cloud & deployment

| # | Class |
|---|---|
| 57 | Docker: images, containers, and why "it works on my machine" |
| 58 | Docker Compose: running app + database |
| 59 | CI/CD with GitHub Actions |
| 60 | Real deployment: your first deploy with Dokploy |
| 61 | AWS: the services people actually use, and what for |
| 62 | Terraform: infrastructure as code |
| 63 | Domains, HTTPS, Nginx, and environment variables |
| 64 | Secrets, basic security, and what you must NEVER push to a repo |

> 📝 **DRAFT NOTE (your words — edit later):** "AWS architecture deeper,
> AI ML"
> *(Interpretation: go deeper on AWS architecture in Block 10, and/or add AI/ML content as its own block or classes.)*

### Block 11 — Expo & mobile

| # | Class |
|---|---|
| 65 | React Native and Expo: what changes from web React |
| 66 | Components, styles, and navigation on mobile |
| 67 | Consuming your API from the app |
| 68 | Camera, storage, and device permissions |
| 69 | Push notifications |
| 70 | Building and publishing to the app stores |

### Block 12 — AI applied to development

| # | Class |
|---|---|
| 71 | What an LLM is — and isn't. Tokens, context, and limits |
| 72 | Calling a model from your code |
| 73 | Prompt engineering with an engineer's judgment |
| 74 | RAG: embeddings, vector search, and why it's used |
| 75 | LangChain and LangGraph: agents and the ReAct pattern |
| 76 | Tool calling: giving models safe access to real data |
| 77 | Evaluating outputs and controlling cost |
| 78 | Coding agents (Cursor, Claude Code, Codex) in a real workflow |

> 📝 **DRAFT NOTE (your words — edit later):** "Agentic RAGS"
> *(Interpretation: add Agentic RAG as its own class or extend classes 74–75; matches the "Agentic RAG" change you made in the Sevilla proposal.)*

> 📝 **DRAFT NOTE (your words — edit later):** "This at the beginigng.."
> *(Interpretation: you want class 78 — coding agents (Cursor, Claude Code, Codex) — taught at the BEGINNING of the course, not at the end; consider moving it into Block 0.)*

### Block 13 — Employability & interviews

| # | Class |
|---|---|
| 79 | Big O and complexity, explained without math |
| 80 | Data structures for interviews |
| 81 | Problem patterns: two pointers, sliding window, hashing, recursion |
| 82 | How to attack a LeetCode problem out loud |
| 83 | Live coding: what they actually evaluate |
| 84 | System design at junior / junior+ level |
| 85 | A CV, LinkedIn, GitHub, and portfolio readable in 20 seconds |
| 86 | Mock interviews and technical defense of your project |

### Block 14 — Final project

| # | Class |
|---|---|
| 87 | Choosing a project and writing the scope |
| 88 | From scope to tickets: planning like a real company |
| 89 | Build weeks with code review |
| 90 | Deployment, domain, and going to production |
| 91 | Demo day: presenting and defending what you built |

---

## Pacing options

Same content, two intensities:

> 📝 **DRAFT NOTE (your words — edit later):** "Despite this should be a bootcampo for months, we should compress this in each day one big topic..
> or similar.."
> *(Interpretation: even though this is designed as a multi-month bootcamp, consider a compressed format of one big topic per day, or similar.)*

> 📝 **DRAFT NOTE (your words — edit later):** "Employabolity at the ned"
> *(Interpretation: the Employability block goes at the end of the program.)*


---

## Capstone projects

*(Section pending — to be filled in.)*
