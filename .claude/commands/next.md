---
description: Confirm you are ready and move to the next guide
allowed-tools: Read, Glob, Grep, Bash(git log:*), Bash(git status:*), Bash(git fetch:*)
---

# Next

Use `course-navigator`. Readiness is **demonstrated, not claimed** — reading a guide is not
completing it.

## 0. Fetch first — this is the moment new material matters most

```bash
git fetch origin && git status -sb
```

Starting a new guide is exactly when the instructor's newest work is relevant. If the copy is
behind, offer `/update-course` before advancing. If the next guide appears to be missing, the
student is probably behind — check this before telling them it does not exist.

## 1. Gate the current day

Before advancing, confirm all three:

- [ ] The **practical outcome** of the current guide was produced and verified with evidence.
- [ ] The guide's **self-check** items are genuinely satisfied.
- [ ] The student can explain the day's main concept in their own words.

Ask the self-check question now if it has not been answered this session.

If any gate fails, say so directly and kindly, name the specific gap, and propose the smallest
action that closes it. Do not advance. Moving on with a broken foundation costs far more later.

## 2. Identify the next day

Resolve the next day from `course/curriculum/INDICE-MAESTRO-CONTENIDO.md`. Report:

| | |
|---|---|
| **Next day** | NN |
| **Major topic** | ___ |
| **Practical outcome** | ___ |
| **File** | path, or **not yet written** |

If the guide does not exist yet **even after fetching**, say so plainly. Do not invent its
content. Offer the nearest existing material or an instructor-led alternative, and mention that
the instructor is actively writing new guides.

## 3. Preview, do not teach

Two or three sentences on what is coming and how it builds on what they just finished. Then ask
whether to start it now or stop here. One question, then wait.
