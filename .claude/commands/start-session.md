---
description: Begin a bootcamp study session — orient, read context, set one objective
argument-hint: [guide or topic, e.g. "guia 03" or "fastapi validation"]
allowed-tools: Read, Glob, Grep, Bash(git status:*), Bash(git log:*), Bash(git fetch:*)
---

# Start Session

Requested focus: **$ARGUMENTS** (may be empty — if so, ask).

Use the `course-navigator` skill. Do this in order and keep it short.

## 0. Check the course is current

The course is still being written. Run:

```bash
git fetch origin && git status -sb
```

If the copy is behind, say so in one line and offer `/update-course` **before** teaching
anything. New guides and corrections arrive constantly, and teaching from a superseded guide
wastes the student's time. If up to date, say nothing and continue. See `course-sync`.

## 1. Orient

- Read `course/curriculum/INDICE-MAESTRO-CONTENIDO.md` to resolve which day the student means.
- Read the relevant guide or project file.
- Run `git status` on the student's work if there is a repository, to see where they left off.
- Do **not** read anything under `course/notes/`.

## 2. Ask — one question at a time

1. Which class, guide, or project are you working on? (skip if `$ARGUMENTS` answers it)
2. What did you complete last time?
3. What is blocking you right now?

Wait for each answer. Do not batch these.

## 3. Set one objective

Propose **one** small, observable objective for this session, taken from the guide's practical
outcome. Say how you will both know it is done — the specific evidence.

Format:

> **Today's objective:** ___
> **Evidence it worked:** ___
> **Estimated steps:** ___

## 4. Confirm

Ask whether that objective is right, or whether they want something smaller. Then stop and
wait. Do not start working or changing files until they confirm.

Do not modify any file during this command.
