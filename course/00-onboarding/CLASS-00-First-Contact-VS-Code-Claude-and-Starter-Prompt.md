# Class 00 — Start the Course with Claude Code

## Objective

Get Claude Code installed, clone the course repository, and confirm that your learning agent
configured itself automatically.

There is **one** prompt to paste, and it is short. Everything that defines how Claude teaches
you already lives in the repository:

| File | What it does |
|---|---|
| `CLAUDE.md` | Loads automatically every session. The teaching contract: how Claude teaches, what it must verify, what it must never do. |
| `.claude/skills/` | Seven Agent Skills Claude activates on its own — tutoring, debugging, verification, Git safety, navigation, course updates, authoring. |
| `.claude/commands/` | Slash commands you type: `/start-session`, `/update-course`, `/hint`, `/check`, `/next`, `/explain`, `/end-session`. |
| `.claude/agents/` | Specialised reviewers Claude delegates to. |
| `.claude/settings.json` + `.claude/hooks/` | Guardrails that block destructive commands and catch leaked credentials. |

> **Why this matters:** in an older version of this course you had to paste a 60-line prompt
> and re-paste it every new session. If you forgot, Claude reverted to writing your homework
> for you. Now the rules are part of the repository, so they cannot be forgotten.

---

## Before you start

- Visual Studio Code is installed.
- The official **Claude Code** extension by **Anthropic** is installed.
- You are signed in to your Anthropic account.
- An empty folder named `full-stack-ai-bootcamp` is open in VS Code.

Your layout:

- **Left:** Explorer
- **Center:** the working document
- **Right:** the Claude Code panel

---

## The only prompt you need to paste

Open the Claude Code panel on the right and paste this:

```text
Hello. I am starting the Full Stack + AI Bootcamp and this workspace is empty.

Clone the private course repository into this workspace:
https://github.com/amigo2/let-the-nerds-lead

I may have no programming experience. Guide me one step at a time and ask only one question
at a time.

Steps:
1. Tell me which operating system I am on and check whether Git is installed.
2. If Git is missing, help me install it from its official source.
3. Help me sign in to GitHub safely and confirm I can access the private repository.
4. Clone the repository here, without creating a confusing nested folder.
5. Confirm that README.md, CLAUDE.md, the .claude folder, and the course folder exist.
6. Read CLAUDE.md and tell me, in your own words, the rules you will now follow.
7. Open course/00-onboarding/CLASS-00-First-Contact-VS-Code-Claude-and-Starter-Prompt.md
   in the center editor.

Explain in one short sentence what each command does before you run it. Ask my confirmation
before installing anything, authenticating, or changing settings. Never ask me to paste a
password, token, or key into this chat. Do not tell me a step worked unless we can see proof.

Start by introducing yourself in two sentences, then ask which operating system I use.
```

### Completion check

- [ ] The repository is cloned and its root is open in VS Code.
- [ ] Explorer shows `README.md`, `CLAUDE.md`, `.claude`, and `course`.
- [ ] Claude read `CLAUDE.md` and described the rules back to you.
- [ ] This document is open in the center; Claude is on the right.

> **Tip:** if `.claude` is not visible in Explorer, VS Code may be hiding dotfiles. The folder
> still works. Ask Claude to list it.

---

## Restart the session — this is the important part

Once the repository is cloned, **start a new Claude Code session** in the repository root.

Why: `CLAUDE.md` is loaded when a session starts. Your first session began in an empty folder,
so it started with no context. A fresh session now reads the teaching contract automatically.

Then verify with three prompts:

```text
Run /start-session for Class 00.
```

```text
Which skills and slash commands are available in this project, and when will you use each?
```

```text
Without changing any files, read README.md and the curriculum, then summarise the course in
no more than ten bullets. Finish with one question for me.
```

### Completion check

- [ ] Claude lists the seven skills and seven slash commands.
- [ ] Claude asked what you are working on **one question at a time**.
- [ ] Claude summarised the course without editing any file.
- [ ] You understand that Claude will **not** simply hand you finished assignments.

---

## Your six commands

You do not need to memorise prompts. Type these:

| Command | When to use it |
|---|---|
| `/start-session` | Opening a study session. Claude reads context and sets one objective. |
| `/update-course` | Download the newest guides and fixes from the instructor. |
| `/hint` | You are stuck. Gives the next smallest hint — not the answer. Repeat for more. |
| `/check` | You think something works. Claude proves it with real output. |
| `/explain` | You do not understand a concept, file, or line. |
| `/next` | You finished a guide and want the next one — gated on real evidence. |
| `/end-session` | Closing. Recap of what you learned, evidence, and the next step. |

### Try `/hint` now

Ask Claude something you have not learned yet, for example:

```text
/hint how do I make a web server return JSON
```

It should point you toward the right guide and ask a question rather than dumping code on you.
**That is the correct behaviour.** If it writes the whole solution instead, tell your
instructor — the configuration is not loading.

---

## This course is alive — and that changes how you work

You are studying a course that is **still being written**. New guides appear, mistakes get fixed,
exercises get clearer. That is good for you, but it means one thing:

> **The copy on your computer goes out of date within days.**

Claude handles this for you:

- It **checks every time you start a session** and tells you if you are behind.
- Run `/update-course` and it downloads the new material, shows what changed, and verifies it.
- `/start-session` and `/next` check too — starting a new guide is when new material matters most.

### Try it now

```text
/update-course
```

If you just cloned, it will say you are up to date. That is the correct answer — you have now
seen what it does.

### The one rule that keeps this painless

> ⚠️ **Do not write inside the course files.** Your notes and your code go in **your own folders,
> outside this repository.**

| What | Where it goes |
|---|---|
| These guides and projects | This repo — read them, do not edit them |
| Your exercise code | Your own project folder, outside this repo |
| Your notes and answers | Your own file, outside this repo |

**Why it matters:** if you never touch course files, an update is instant and clean. If you write
notes inside a guide, your notes and the instructor's new version collide, and every update
becomes a small rescue operation. Claude will help you rescue them — but it is avoidable work.

If a guide listed in the index is missing from your copy, you are probably just behind. Run
`/update-course` before assuming anything is broken.

After an update that touches `CLAUDE.md` or `.claude/`, **restart your session** so the new
configuration loads.

## The rules Claude now follows

You should expect this behaviour without asking for it:

**Teaching**
- Beginner assumed; jargon explained before it is used.
- Concept → analogy → small example → your attempt → feedback.
- One question at a time.
- Hints before answers. It will not write your assignment before you try.
- It asks you to explain ideas back in your own words.

**Evidence**
- It will **never** say a test passed, a server started, or a deployment worked without showing
  output that proves it.
- If it cannot verify something, it says so.

**Safety**
- It explains commands before running them.
- It asks permission before installing, authenticating, deleting, or spending money.
- It will never ask you for a password, token, or key — and will stop you if you try to paste one.
- Destructive commands (`sudo`, `rm -rf`, `git push --force`, `git reset --hard`) are **blocked**
  by the hooks, not merely discouraged.
- If you accidentally write an API key into a file, a hook catches it before you can commit it.

**Honesty about the course**
- If a guide does not exist yet, it says so rather than inventing content.
- It will not teach you guide 40 material while you are on guide 06.
- It checks whether your copy is current before teaching, and will not pull without asking.

---

## If Claude misbehaves

| Symptom | Likely cause | Fix |
|---|---|---|
| Writes whole solutions unprompted | Session started outside the repo root | Restart the session in the repository root |
| Does not know the slash commands | `.claude/` not present or wrong folder open | Confirm `CLAUDE.md` is at the root of the open folder |
| Claims things work without output | Contract not loaded | Ask: "read CLAUDE.md and follow it"; then restart the session |
| Asks five questions at once | Drift in a long session | Say "one question at a time", or `/end-session` and start fresh |

Long sessions drift. Ending and restarting a session is cheap and usually the right answer.

---

## Instructor checklist

- [ ] VS Code plus the official Anthropic Claude Code extension installed.
- [ ] Student selected only the minimum plan that includes Claude Code.
- [ ] Explorer left, document center, Claude right.
- [ ] Repository cloned, with `CLAUDE.md` and `.claude/` present at the root.
- [ ] Session restarted in the repository root after cloning.
- [ ] Student saw `/start-session`, `/hint`, and `/update-course` behave correctly.
- [ ] Student confirmed Claude refuses to do the assignment for them.
- [ ] Student understands secret safety and that dangerous commands are blocked.
- [ ] Student knows to restart a session when behaviour drifts.
- [ ] **Student understands the course updates continuously and knows to run `/update-course`.**
- [ ] **Student understands that notes and code go outside the course repository.**
