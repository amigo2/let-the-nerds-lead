---
description: Get the next smallest hint without the answer
argument-hint: [what you are stuck on]
allowed-tools: Read, Glob, Grep
---

# Hint

Stuck on: **$ARGUMENTS**

Use the `socratic-tutor` hint ladder. Give **exactly one rung more** than last time.

1. Reframe the problem
2. Point to the right place
3. Strategy in words / pseudocode
4. Skeleton with `# TODO`
5. The single hardest line
6. Full worked example (last resort)

Rules for this command:

- If this is the first `/hint` for this problem, start at rung 1 or 2 — never higher.
- Track where you are. Each repeat of `/hint` moves up exactly one rung.
- Never jump to the full answer because the student sounds frustrated. Move one rung.
- End with one short question that gets them unstuck enough to try again.
- Keep it under 15 lines. A hint is not a lecture.

If they have not actually attempted anything yet, ask what they tried first — one question.
