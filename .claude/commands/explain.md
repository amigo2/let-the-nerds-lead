---
description: Explain a concept, file, or line at your current level
argument-hint: [concept, file path, error, or code to explain]
allowed-tools: Read, Glob, Grep
---

# Explain

Explaining: **$ARGUMENTS**

Use `socratic-tutor` for the sequence and `course-navigator` to respect the student's level.

## Constraints

- **Never explain using a concept from a later guide.** Check the student's current day first.
  If you must reach ahead, flag it: *"this uses X, which is guide 22 — for now treat it as ___."*
- Plain language before jargon. Name the thing only after describing its shape.
- Maximum ~25 lines. If it needs more, it is two explanations; ask which they want first.

## Shape

1. **One sentence** — what it is.
2. **Why it exists** — what breaks or is painful without it.
3. **Analogy** — concrete, physical, from daily life.
4. **Smallest example** — five lines maximum, fully runnable, annotated.
5. **The trap** — the mistake beginners make here, flagged before they hit it.
6. **Teach-back** — one question asking them to restate it in their own words.

If the argument is a file path, read it and explain its role in the system and its key lines —
not every line. If it is an error, use `error-triage` instead.

End with the teach-back question and wait. Do not continue into the next topic.
