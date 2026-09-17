# Full Stack + AI Bootcamp — Condensed Course Curriculum

> **Engineering means designing, testing, and validating solutions under constraints. AI is the copilot; the student remains the engineer.**

English master syllabus. The program is AI-first, backend-first, and organized around **one major topic per day**.

---

## Program model

- **58 guides = 58 course days**, numbered continuously from 00 to 57.
- **One guide = one day = one major topic + one practical outcome.**
- The order is: setup/Claude → web concepts → first guided project → Python → FastAPI → PostgreSQL → TypeScript → React → testing → deployment → applied AI → mobile → employability → final project.
- Python is the first programming language and the primary backend/AI language.
- TypeScript is the second programming language and is introduced when the student is ready to build the frontend.
- There is **no standalone JavaScript block**. Only the small amount of JavaScript context needed to understand TypeScript, browser APIs, and React is explained where it appears.
- Frontend is intentionally practical and condensed. Students learn enough HTML, CSS, TypeScript, and React to build usable interfaces; deep frontend specialization is outside the core program.
- Terminal syntax, installation details, scaffolding commands, configuration boilerplate, and similar low-retention tasks are **Claude-assisted**. Students must understand each command's purpose and validate its result, but memorization is not the goal.
- Git and GitHub are taught in context from the first project rather than isolated in a long standalone block.

---

## How each day works

Each guide follows the same learning loop:

1. **Concept** — one major idea in plain language.
2. **Architecture** — where it fits in the complete system.
3. **Claude-assisted setup** — commands and boilerplate explained one step at a time.
4. **Worked example** — the smallest useful implementation.
5. **Student build** — one observable practical outcome.
6. **Validation** — tests, output, logs, or visible behavior.
7. **Reflection** — the student explains what happened and completes a self-check.

A topic may reappear later in greater depth, but each day has only one primary learning objective.

---

## Curriculum at a glance

| Phase | Guides | Days | Outcome |
|---|---:|---:|---|
| 0. Setup, Claude, and first project | 00–03 | 4 | Workspace ready and first guided web system understood |
| 1. Python foundations | 04–08 | 5 | Write and reason about small Python programs |
| 2. FastAPI and backend engineering | 09–14 | 6 | Build a structured, validated REST API |
| 3. PostgreSQL and persistent data | 15–19 | 5 | Model, store, query, and migrate relational data |
| 4. TypeScript as the second language | 20–24 | 5 | Use typed code for browser and frontend work |
| 5. React with TypeScript | 25–30 | 6 | Build a usable frontend connected to the API |
| 6. Testing and quality | 31–34 | 4 | Validate backend, frontend, and complete user flows |
| 7. Docker and deployment | 35–39 | 5 | Package, secure, automate, and deploy the system |
| 8. Applied AI engineering | 40–45 | 6 | Add evaluated, safe, data-connected AI features |
| 9. Mobile with Expo | 46–49 | 4 | Deliver a mobile client for the same backend |
| 10. Employability | 50–52 | 3 | Present skills and defend engineering decisions |
| 11. Final project | 53–57 | 5 | Scope, build, deploy, and present a production project |
| | **Total** | **58** | |

---

## Day-by-day syllabus

### Phase 0 — Setup, Claude, and first guided project

| Guide | Major topic | Practical outcome |
|---:|---|---|
| 00 | VS Code, Claude, GitHub, and learning safely with an agent | Download the course, configure the learning agent, and validate the workspace |
| 01 | What a web system is: frontend, backend, HTTP, JSON, and APIs | Trace one complete request and response through a system |
| 02 | Local project workflow with Claude-assisted terminal and Git | Open, run, inspect, stop, and save a project without memorizing commands |
| 03 | First guided project: architecture before syntax | Build and explain a small end-to-end feature with heavy scaffolding |

> Terminal commands, Git setup, package installation, and environment checks are introduced only as tools needed to complete the project. Claude may provide the exact syntax, but must explain what each command changes and help the student verify the result.

### Phase 1 — Python foundations

| Guide | Major topic | Practical outcome |
|---:|---|---|
| 04 | Python values, variables, types, and expressions | Transform input data into a useful result |
| 05 | Decisions, loops, and program flow | Implement a small rule-driven program |
| 06 | Lists, dictionaries, sets, and tuples | Model and process a collection of records |
| 07 | Functions, modules, and readable program structure | Split a program into understandable reusable units |
| 08 | Errors, files, environments, dependencies, and logging | Run a small resilient Python application and diagnose a failure |

> Virtual environments, package-manager commands, and repetitive setup are Claude-assisted. Students learn why isolation and dependency tracking matter, not a list of commands by heart.

### Phase 2 — FastAPI and backend engineering

| Guide | Major topic | Practical outcome |
|---:|---|---|
| 09 | FastAPI application and first endpoint | Run and inspect an API through automatic documentation |
| 10 | Routes, parameters, and Pydantic validation | Accept and reject request data correctly |
| 11 | REST resources, HTTP verbs, responses, and status codes | Design a coherent CRUD API contract |
| 12 | Backend project structure and service boundaries | Refactor the API into a maintainable structure |
| 13 | Authentication, authorization, and security fundamentals | Protect a route and distinguish identity from permission |
| 14 | Errors, middleware, async work, logging, and observability | Diagnose requests and return predictable failures |

### Phase 3 — PostgreSQL and persistent data

| Guide | Major topic | Practical outcome |
|---:|---|---|
| 15 | Relational thinking: tables, keys, relationships, and constraints | Design the project's data model |
| 16 | Essential SQL: CRUD, filtering, joins, and aggregations | Answer useful questions directly in SQL |
| 17 | SQLAlchemy models, sessions, and transactions | Persist API data safely |
| 18 | Alembic migrations and seed data | Evolve the database reproducibly |
| 19 | Indexes, query performance, connection handling, and backups | Inspect and improve one realistic data workflow |

### Phase 4 — TypeScript as the second language

| Guide | Major topic | Practical outcome |
|---:|---|---|
| 20 | TypeScript values, inference, operators, and the minimum JavaScript context | Read and write a small typed program |
| 21 | Typed functions, control flow, arrays, and objects | Transform API-shaped data safely |
| 22 | Interfaces, unions, generics, and narrowing | Model frontend states and backend responses |
| 23 | Async/await, Fetch, HTTP errors, and typed responses | Call the bootcamp API from TypeScript |
| 24 | Browser events, forms, tooling, and debugging | Build one typed browser interaction and inspect it with DevTools |

> JavaScript is explained only when needed to understand TypeScript runtime behavior. It is not treated as a separate language phase or a prerequisite block.

### Phase 5 — React with TypeScript

| Guide | Major topic | Practical outcome |
|---:|---|---|
| 25 | React, JSX, components, props, and composition | Build the first typed interface from components |
| 26 | State, events, lists, conditions, and user feedback | Create an interactive screen with loading, empty, error, and success states |
| 27 | Forms, validation, and accessible HTML essentials | Submit valid data through a usable form |
| 28 | Effects and API integration | Connect the React interface to FastAPI |
| 29 | Routing, authentication flow, and shared state | Navigate protected application areas |
| 30 | Custom hooks, project organization, styling survival kit, and production UI | Deliver a coherent frontend without building a design system |

> CSS, Tailwind, component libraries, and build-tool configuration are practical support topics. Claude can generate or explain boilerplate; students focus on usability, data flow, accessibility, and validation.

### Phase 6 — Testing and quality

| Guide | Major topic | Practical outcome |
|---:|---|---|
| 31 | Test strategy, risk, and the testing pyramid | Write a focused test plan for the project |
| 32 | Pytest and FastAPI integration tests | Test backend behavior with isolated data |
| 33 | Vitest and React Testing Library | Test behavior visible to a frontend user |
| 34 | Playwright end-to-end testing and practical TDD | Automate one critical journey through the complete system |

### Phase 7 — Docker and deployment

| Guide | Major topic | Practical outcome |
|---:|---|---|
| 35 | Docker images and containers | Package one application component reproducibly |
| 36 | Docker Compose for API, frontend, and database | Run the complete system as one local stack |
| 37 | CI/CD with GitHub Actions | Validate every proposed change automatically |
| 38 | Cloud architecture, AWS essentials, domains, HTTPS, and environment configuration | Draw and explain the production architecture |
| 39 | Production deployment, secrets, monitoring, rollback, and recovery | Deploy and verify a secure release |

> Docker, CI, cloud, and server commands are Claude-assisted because exact syntax is searchable and changes over time. Students remain responsible for architecture, security decisions, evidence, and recovery plans.

### Phase 8 — Applied AI engineering

| Guide | Major topic | Practical outcome |
|---:|---|---|
| 40 | LLM foundations: models, tokens, context, capabilities, and limits | Select a model and explain the trade-offs |
| 41 | Model APIs, structured outputs, retries, and provider boundaries | Add one reliable model-backed endpoint |
| 42 | Prompt design, data privacy, prompt injection, and human approval | Build a constrained and reviewable AI interaction |
| 43 | Embeddings, vector search, and RAG | Answer questions using approved project data |
| 44 | Tool calling, agentic RAG, LangGraph, and bounded agents | Build a small agent that uses explicitly permitted tools |
| 45 | Evaluation datasets, tracing, quality gates, latency, and cost | Measure the AI feature before releasing it |

### Phase 9 — Mobile with Expo

| Guide | Major topic | Practical outcome |
|---:|---|---|
| 46 | Expo and React Native differences from web React | Run the first mobile screen |
| 47 | Mobile components, styling, navigation, and forms | Build a navigable mobile workflow |
| 48 | API integration, authentication, storage, and device permissions | Connect the app safely to the existing backend |
| 49 | Notifications, builds, and store delivery | Produce and test an installable build |

### Phase 10 — Employability

| Guide | Major topic | Practical outcome |
|---:|---|---|
| 50 | Portfolio, CV, LinkedIn, GitHub, and project storytelling | Publish a coherent professional profile |
| 51 | Coding interviews: complexity, data structures, and practical patterns | Explain and solve a problem aloud with evidence |
| 52 | Junior system design, live coding, and technical project defense | Complete a realistic mock interview |

> Employability checkpoints also occur throughout the course through readable repositories, reviewed commits, demos, architecture explanations, and project retrospectives.

### Phase 11 — Final project

| Guide | Major topic | Practical outcome |
|---:|---|---|
| 53 | Problem selection, users, constraints, and scope | Produce an approved one-page project scope |
| 54 | Architecture, data model, API contract, AI boundary, and delivery plan | Convert scope into diagrams and ordered tickets |
| 55 | Backend and data build with review | Deliver the tested core system |
| 56 | Client, AI feature, deployment, and production validation | Release the complete product |
| 57 | Demo, retrospective, portfolio packaging, and technical defense | Present and defend the project with evidence |

---

## Pacing

### Standard condensed track

- One guide and one major topic per course day.
- A course day combines instruction, Claude-assisted setup, building, validation, and reflection.
- Project work continues between topic days so skills are integrated rather than studied in isolation.

### Flexible track

- The guide order remains the same.
- A difficult guide may use more than one calendar day, but a calendar day should not introduce multiple unrelated major topics.
- Students with prior experience may validate a guide through its practical outcome and self-check rather than repeat familiar setup.

---

## Claude-assisted versus student-owned work

| Claude may assist heavily with | The student must own and explain |
|---|---|
| Exact terminal and Git syntax | Why the command is needed and what changed |
| Installation and configuration steps | Whether the environment is correct and safe |
| Boilerplate and repetitive scaffolding | Architecture, behavior, and data flow |
| Reading long error output | The relevant error, hypothesis, and verified fix |
| Current library or cloud syntax | Trade-offs, security, cost, and operational impact |
| Draft tests and documentation | What is being validated and whether evidence is sufficient |

The goal is not command memorization or manually reproducing boilerplate. The goal is independent engineering judgment supported by AI and verified evidence.
