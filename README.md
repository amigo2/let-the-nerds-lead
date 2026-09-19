# Full Stack + AI Bootcamp

> Learn to design, build, test, and validate software with AI as your copilot—not as a replacement for your judgment.

This private repository is the central workspace for the bootcamp.

## First instructions

If this is your first contact with the course:

1. Install **Visual Studio Code** from https://code.visualstudio.com/.
2. Install the official **Claude Code** extension published by Anthropic.
3. If required, choose the minimum paid individual plan that includes Claude Code. Budget approximately US$25 per month and confirm the current local price before purchasing.
4. In VS Code, use this layout: **Explorer on the left → working document in the center → Claude Code panel on the right**.
5. Open [Class 00 — First Contact](course/00-onboarding/CLASS-00-First-Contact-VS-Code-Claude-and-Starter-Prompt.md).
6. Follow Class 00 in order. It contains the single short prompt that clones the course and confirms your learning agent configured itself.

Use the Claude Code panel on the right, not the terminal, for this setup.

## Your learning agent is already configured

This repository is built for **Claude Code**. You do not paste a long prompt to make Claude behave like a teacher — the configuration is version-controlled here and loads automatically when you open a session in the repository root.

| File or folder | What it does |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Read automatically every session. The teaching contract: how Claude teaches, what it must verify, what it must never do. |
| [.claude/skills](.claude/skills) | Seven Agent Skills Claude invokes on its own: `socratic-tutor`, `course-navigator`, `course-sync`, `error-triage`, `verify-before-claiming`, `git-safety`, `guide-authoring`. |
| [.claude/commands](.claude/commands) | Slash commands you type yourself. |
| [.claude/agents](.claude/agents) | Specialised subagents: `code-reviewer`, `curriculum-auditor`. |
| [.claude/settings.json](.claude/settings.json) | Permission rules: what Claude may run freely, what needs your approval, what is denied outright. |
| [.claude/hooks](.claude/hooks) | Scripts that block destructive commands, detect credentials before they reach a commit, and check at session start whether your course copy is out of date. |

### Commands you will use daily

| Command | When |
|---|---|
| `/start-session` | Open a session: Claude reads context and sets one objective |
| `/update-course` | Download the newest guides and corrections from the instructor |
| `/hint` | Stuck — get the next smallest hint, not the answer. Repeat for more. |
| `/check` | Prove something works, with real output as evidence |
| `/explain` | Understand a concept, file, or line at your current level |
| `/next` | Move to the next guide, gated on demonstrated evidence |
| `/end-session` | Close: what you learned, what was verified, what is next |

Two behaviours are enforced rather than requested: Claude **will not** write an assignment before you attempt it, and it **will not** claim anything works without showing output that proves it.

If Claude starts handing you finished solutions, the contract is not loaded. Restart the session in the repository root.

## What is in each folder?

| Folder | Audience | Contents |
|---|---|---|
| [.claude](.claude) | Everyone | Claude Code configuration: skills, commands, subagents, permissions, hooks |
| [course/00-onboarding](course/00-onboarding) | Students | Initial setup and the prompt used to start the course |
| [course/curriculum](course/curriculum) | Students and instructors | Master syllabus, class order, and curriculum planning |
| [course/guides](course/guides) | Students | Learning material for each class |
| [course/projects](course/projects) | Students | Exercises, assignments, and practical applications |
| [course/notes](course/notes) | Instructors | Working notes, production documents, business material, and internal planning |

## This course is live — keep your copy updated

**The bootcamp is being written while you study it.** New guides, corrections, and improved
exercises are pushed regularly, so the copy on your machine goes out of date within days.

You do not need to track this manually:

- Claude **checks automatically** every time you start a session and tells you if you are behind.
- Run **`/update-course`** to download the new material safely. It shows you what changed, protects any local edits, and verifies the result.
- `/start-session` and `/next` also check, because starting a new guide is when fresh material matters most.

### One rule that keeps updates painless

> **Do not edit files inside this repository.** Keep your exercise code and notes in your own folders, outside the course repo.

| What | Where it belongs |
|---|---|
| Course guides and projects | This repository — treat as read-only |
| Your exercise code | Your own project folders, outside this repo |
| Your notes and answers | Your own files, outside this repo |

If you never edit course files, every update is a clean one-second operation. If you do write notes in a guide, `/update-course` will help you preserve them — but it is extra work every time.

After an update that changes `CLAUDE.md` or `.claude/`, **restart your Claude Code session** so the new configuration loads.

## How to follow the course

The bootcamp contains **65 guides across 65 course days**. Each day has one major topic and one practical outcome.

The learning order is: **setup and Claude → web concepts → first guided project → Python → FastAPI → PostgreSQL → TypeScript → React → testing → containers and DevOps → applied AI → mobile → employability → final project**.

1. Begin with [Class 00](course/00-onboarding/CLASS-00-First-Contact-VS-Code-Claude-and-Starter-Prompt.md).
2. Work through the curriculum and guides in numeric order.
3. Open each session with `/start-session` so Claude reads the right material first and checks for new content.
4. Read the current guide before asking Claude to make changes.
5. Attempt each exercise yourself, then use `/hint` when blocked — it gives one step at a time, not the answer.
6. Use Claude for exact terminal commands, installation steps, scaffolding, and configuration boilerplate. Understand why each step is needed and validate its result; memorizing command syntax is not the goal.
7. Read errors before trying fixes.
8. Validate results with `/check`: tests, command output, logs, or visible behavior — never assume.
9. Review changed files before committing them to Git.
10. Complete each guide's self-check, then use `/next` to advance and `/end-session` to close.

Python is the first language. TypeScript is introduced later as the second language for React and frontend work. There is no standalone JavaScript phase, and frontend is taught as a practical product skill rather than a deep specialization.

## Main course documents

- [Full curriculum](course/curriculum/CURRICULUM-Full-Stack-AI-Bootcamp.md)
- [Master content index](course/curriculum/INDICE-MAESTRO-CONTENIDO.md)
- [Class 00 and course prompts](course/00-onboarding/CLASS-00-First-Contact-VS-Code-Claude-and-Starter-Prompt.md)

## Current status

The condensed curriculum contains 65 planned guides across 12 phases. Initial guides and projects are in production and will be expanded progressively.

Course material is written in **English**. Filenames keep their original `GUIDE-` / `PROJECT-` / `ASSIGNMENT-` prefixes so existing links keep working, and Spanish-language videos keep their original titles so you can still find them.

Because material is added continuously, a guide referenced in the index may not exist in your copy yet. Run `/update-course` before assuming something is missing.

> **Private repository:** it contains course strategy, pricing, and business correspondence. Do not make it public or share its contents without authorization.
