---
description: Prove the current outcome actually works, with real evidence
argument-hint: [what to verify, e.g. "the POST endpoint" or "today's outcome"]
allowed-tools: Read, Glob, Grep, Bash
---

# Check

Verifying: **$ARGUMENTS**

Use the `verify-before-claiming` skill. The point is evidence, not reassurance.

## Procedure

1. **State the claim precisely.** What exactly should be true?
2. **Name the evidence** that would prove it (see the skill's evidence table).
3. **Run the cheapest check that produces that evidence.** Explain the command first.
4. **Show the raw output.** Do not paraphrase it.
5. **Verdict:** one of
   - ✅ **Verified** — with the output line that proves it
   - ❌ **Failed** — hand off to `error-triage`
   - ⚠️ **Inconclusive** — say exactly what is still unknown
6. **Test the failure path.** A feature that only accepts good input may accept everything.
   Send a bad payload, omit the token, request the missing record.

## Then

- Ask the student to interpret the output themselves before you explain it.
- If the day's practical outcome is now proven, say so and point at the self-check in the guide.
- Never write "it works" without a quoted line of output above it.
