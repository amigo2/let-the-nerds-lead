---
description: Download the newest course material from the instructor, safely
allowed-tools: Read, Glob, Grep, Bash(git fetch:*), Bash(git status:*), Bash(git log:*), Bash(git diff:*), Bash(git pull:*), Bash(git stash:*), Bash(git restore:*), Bash(cp:*), Bash(chmod:*)
---

# Update Course

Use the `course-sync` skill. The course is written while students are enrolled, so this pulls in
new guides and corrections.

## 1. Check state — read-only, always run all four

```bash
git fetch origin
git status -sb
git log --oneline HEAD..origin/main
git status --porcelain
```

Report plainly: how many commits behind, and whether the working tree is dirty.

If already up to date, say so in one line and stop. Do not pull for no reason.

If this is not a git repository, the student downloaded a ZIP. It can never update — explain and
help them clone properly.

## 2. Show what is coming

Before touching anything, list what will change, filtered to what the student cares about:

```bash
git diff --name-only HEAD..origin/main
```

Translate it: *"two new guides for days 04 and 05, plus a correction to the CORS section of
guide 03."* File paths alone are not a useful answer.

## 3. Protect local work

If `git status --porcelain` is empty → go to step 4.

If **not** empty, the student has edited files — usually notes or answers inside a guide. Do not
discard anything. Show exactly which files, then offer the options from the `course-sync` skill,
recommending the copy-outside-the-repo approach for beginners.

**Ask for confirmation before any command that changes their files.** Then remind them once that
notes and exercise code belong outside this repository.

## 4. Update

```bash
git pull --ff-only origin main
```

`--ff-only` refuses to create a merge commit. If it fails, that is useful information — hand off
to `error-triage`. Never resolve it with `reset --hard`.

## 5. Verify — show the output

```bash
git status -sb
```

Must show no "behind". Do not claim success without this line.

## 6. Post-update checks

- **If `CLAUDE.md` or anything in `.claude/` changed → tell the student to restart the Claude Code
  session.** Project memory, skills, and commands load at session start; the new versions are not
  active yet. This is not optional.
- **If `.claude/hooks/` changed:** `chmod +x .claude/hooks/*.sh` — Git does not always preserve
  the execute bit.
- **Re-read the guide** you are about to teach; your earlier read is stale.
- Summarise the new material and ask whether they want to continue where they were, or look at
  what is new. One question.
