---
name: guide-authoring
description: Instructor-only skill for writing or editing bootcamp guides, projects, and classes in the established house style. Use when an instructor asks to draft a new guide, fill a gap in the 65-day curriculum, restructure existing course material, or write exercises, self-checks, and glossaries. Not for student sessions.
---

# Guide Authoring (Instructor Only)

Confirm you are talking to an instructor before using this skill. Students must not use it to
generate the material they are supposed to be learning.

## Non-negotiables

- **One guide = one day = one major topic + one practical outcome.** If a draft contains two
  unrelated major topics, it is two guides.
- Written in **Río de la Plata Spanish** with `vos`: *tenés*, *mirá*, *fijate*, *creá*, *corré*,
  *poné*. Never *tienes/mira/crea*.
- Body text wraps at ~100 characters.
- File naming: `GUIDE-NN-Title-In-Kebab-Case.md`, `PROJECT-NN-…`, `ASSIGNMENT-NN-…`, `CLASS-NN-…`.
- **`NN` is the day number.** Day 07 is `GUIDE-07-*.md`. Never allocate a number that the master
  index assigns to another day.
- New guides are written in **English**; see the Language section of `CLAUDE.md`.

## Required structure

Mirror the existing guides (`GUIDE-01`, `GUIDE-02`, `GUIDE-03`):

1. **Title** — `# Guide NN — Topic` (prose form; the `GUIDE-NN` form is the filename)
2. **Framing blockquote** — what the student will be able to do by the end, in one or two lines.
3. **Index** — anchor links for anything over ~300 lines.
4. **Concept** — the one major idea, plain language, before any code.
5. **Architecture** — where it sits in the whole system.
6. **Claude-assisted setup** — exact commands, each with an explanation of what it changes.
7. **Worked example** — the smallest useful implementation.
8. **Student build** — the observable practical outcome.
9. **Validation** — explicitly how they prove it works.
10. **Numbered exercises** — `E1.1`, `E1.2`, … as `- [ ]` checkboxes.
11. **Self-check** — checkbox list; the gate for moving on.
12. **Glossary table** — every term introduced, defined in one line.

## Voice rules

- **Analogy before definition.** Explain the shape of the thing before naming it.
- **Warn before the trap, not after.** Use a `>` callout at the moment of risk:
  `> ⚠️ allow_origins=["*"] significa "que cualquier página del mundo pueda llamarme".`
- Explain jargon the first time it appears, then use it freely.
- Concept tables (`| Comando | Qué hace |`) instead of paragraphs listing commands.
- Second person, direct, no filler. Never "en este video vamos a ver…".
- Say when something is deliberately simplified and which guide covers it properly.
- Tell the student when *not* to use something yet: *"No la uses todavía — usá el `for` largo
  hasta que te salga solo."*

## Code in guides

- Complete and runnable. No `...` or invented APIs.
- Pin versions where drift breaks things (`postgres:16`, not `postgres`).
- Annotate line by line the first time a pattern appears.
- Only use concepts already introduced, in this guide or an earlier one. Check before using.

## After drafting

1. Verify every relative link resolves to a real file.
2. Update `course/curriculum/INDICE-MAESTRO-CONTENIDO.md` with the new row and link.
3. Update `course/curriculum/CURRICULUM-Full-Stack-AI-Bootcamp.md` if the day mapping changed.
4. Confirm the practical outcome matches what the curriculum promises for that day.
5. Report which of the 65 days are still unwritten rather than silently leaving holes.

## Do not

- Do not invent curriculum structure. The 65-day map (days 00–64) is fixed; propose changes
  explicitly.
- Do not copy third-party course text.
- Do not pad length. A tight guide beats a long one.
- Do not touch `course/notes/instructor/business/**` while authoring teaching material.
