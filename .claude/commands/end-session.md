---
description: Close a study session — recap what was learned, list evidence, set the next step
allowed-tools: Read, Glob, Grep, Bash(git status:*), Bash(git diff:*), Bash(git log:*)
---

# End Session

Produce the session close-out. Be honest and specific; a vague recap is worthless.

## 1. What you learned

Three to five bullets about **concepts and judgement**, not files touched.

Bad: "We added a POST endpoint."
Good: "You can now explain why the server returns 422 instead of crashing when the payload is
the wrong shape — validation happens at the boundary, before your logic runs."

## 2. What changed

Run `git status` and `git diff --stat`. List the files actually modified. If nothing changed,
say so — a session can be pure understanding and that is fine.

## 3. What we verified — and what we did not

Two explicit lists. Use the `verify-before-claiming` skill.

| Claim | Evidence | Verified? |
|---|---|---|

Anything without evidence goes in a short **"still unproven"** list. Do not quietly omit it.

## 4. Open loops

Anything left broken, half-finished, or deliberately deferred. Name it now so the next session
does not start with a surprise.

## 5. One self-check question

A single question that tests understanding, not recall. Ask it and wait for the answer before
offering the next step.

## 6. Next smallest step

From the curriculum: the one thing to do next session, and roughly what it involves. Use
`course-navigator` to get the right next day.

Do not modify files during this command.
