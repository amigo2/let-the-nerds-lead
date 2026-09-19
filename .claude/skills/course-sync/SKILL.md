---
name: course-sync
description: Keep the student's course copy up to date with the instructor's repository. Use when a session-start notice says the course is behind, when the student asks whether there is new material, when a guide referenced in the index is missing, when a link points to a file that does not exist, or before starting any new guide. Handles pulling safely when the student has local changes.
---

# Course Sync

The bootcamp is being written **while students are enrolled**. New guides, fixes, and corrected
exercises land continuously. A clone from last week is already behind.

This creates two failure modes you must prevent:

1. **Teaching from stale material** — the student works through a guide the instructor has since
   corrected, and learns the mistake.
2. **"That file doesn't exist"** — the master index links a guide that exists on the remote but
   not in the student's copy. Never conclude the course is broken or that the index is wrong.
   Check whether they are behind **first**.

## The rule

> If the student's copy is behind, say so **before** teaching from a guide. Offer the update.
> Never pull without asking.

You may run read-only inspection freely: `git fetch`, `git status`, `git log`, `git diff`.
Anything that changes the working tree requires explicit student confirmation.

## Detecting staleness

```bash
git fetch origin              # read-only
git status -sb                # shows "behind N" / "ahead N"
git log --oneline HEAD..origin/main   # what the instructor added
git diff --name-only HEAD..origin/main | grep '^course/'   # which guides changed
```

If `git rev-parse --is-inside-work-tree` fails, the student downloaded a ZIP instead of cloning.
That copy can never update. Tell them, and help them clone properly.

## Deciding how to update

Check the working tree first — this determines everything:

```bash
git status --porcelain
```

### Case A — clean tree, behind only

The normal case. Safe and boring:

```bash
git pull --ff-only origin main
```

`--ff-only` is deliberate. It refuses to create a merge commit, so if the history has diverged
the command **fails instead of producing a mess**. A failure here is information, not a problem.

### Case B — the student edited course files

Almost always they answered exercises or took notes directly in a guide. Explain the situation
plainly, then offer, in this order:

1. **Preserve their work in a copy** (preferred for beginners):
   ```bash
   cp course/guides/GUIDE-02-Terminal-And-First-Projects.md ~/my-notes-guide-02.md
   git restore course/guides/GUIDE-02-Terminal-And-First-Projects.md
   git pull --ff-only origin main
   ```
   Their notes survive outside the repo and the guide updates cleanly.

2. **Stash, pull, reapply** — only if they understand stashing:
   ```bash
   git stash push -m "my notes before update"
   git pull --ff-only origin main
   git stash pop     # may conflict — walk them through it
   ```

3. **Commit locally, then rebase** — only for a student past the Git guides.

Never `git checkout --` or `git restore` a file with their work in it without copying it first
and getting explicit confirmation. Losing a student's answers is worse than being out of date.

### Case C — the pull fails or conflicts

Use `error-triage`. Do not escalate to `reset --hard` — it is blocked by the hooks, and it
destroys their work. Conflicts in course material are almost always "keep the instructor's
version, move my notes elsewhere".

### Case D — ahead of the remote

The student committed to their copy of the course repo. Usually they should not be working in
here at all. Explain that project code belongs in their own repository, and leave their commits
alone unless an instructor says otherwise.

## After a successful update

1. **Confirm from output**, not assumption: `git status -sb` should show no "behind".
2. **Report what changed** in terms the student cares about: "three new guides for days 04–06,
   and a fix to the CORS section of guide 03."
3. **Re-read the guide** you are about to teach. Your earlier read may be stale.
4. **If `.claude/` or `CLAUDE.md` changed, tell them to restart the session.** Skills, commands,
   and project memory are loaded at session start; the new versions are not active until then.
5. **If hooks changed, re-check the execute bit:** `chmod +x .claude/hooks/*.sh`.

## Where student work belongs

Prevent Case B from recurring. Explain once, early:

| Content | Location |
|---|---|
| Course guides and projects | This repository — **read-only** for the student |
| Their exercise code and projects | Their own folders, outside this repo |
| Their notes and answers | Their own files, outside this repo |

A student who never edits course files can always update with a clean `--ff-only` pull.

## Frequency

- **Every session start** — the hook checks automatically and reports only when behind.
- **Before starting a new guide** — the most important moment. New material lands here.
- **When a referenced file is missing** — check staleness before believing the course is broken.
- Do not fetch repeatedly mid-session. The hook throttles to once per 30 minutes; respect that.
