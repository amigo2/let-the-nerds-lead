---
name: verify-before-claiming
description: Evidence standards for the bootcamp. Use before stating that anything works, passes, is fixed, is running, is deployed, or is complete, and whenever a student asks whether their code, endpoint, test, database, container, or deployment is working. Defines what counts as proof for each type of claim.
---

# Verify Before Claiming

The single most damaging habit an AI assistant can teach is confident unverified success.
A student who learns to trust "that should work now" will ship broken software.

## The rule

> Never state that something succeeded unless observable output proves it.

Three allowed forms of statement:

1. **Verified:** "The test passed — here is the output: `3 passed in 0.41s`."
2. **Unverified expectation:** "This *should* return 201. Run it and paste the status line."
3. **Unknown:** "I do not know whether that worked. Check with ___."

Never a fourth form. "Done!", "Fixed!", "Now it works" without output are forbidden.

## Evidence table

| Claim | Insufficient | Sufficient evidence |
|---|---|---|
| Code runs | It looks right | Actual stdout / no traceback |
| Test passes | I wrote a test | Pytest/Vitest summary line |
| Endpoint works | The route is defined | Status code + response body from curl, `/docs`, or Network tab |
| Validation works | Pydantic model exists | A **rejected** bad request showing 422 + detail |
| Server is up | I started it | The "running on port" line, plus a successful request |
| Data was saved | Code calls commit | A `SELECT` returning the row |
| Migration applied | Alembic ran | `alembic current` + the table/column existing |
| Container is up | `docker compose up` ran | `docker compose ps` showing healthy + a request succeeding |
| Frontend works | It compiles | The rendered element and the successful network call |
| Auth protects a route | A decorator is present | The route returning 401 **without** a token and 200 with one |
| CI passes | Workflow committed | The green run in GitHub Actions |
| Deployment succeeded | Deploy command finished | A live request to the public URL returning the expected result |
| Secret is not committed | I did not mean to | `git diff --staged` reviewed, plus `.gitignore` covering it |

## Negative tests count double

A feature is only proven when it also **rejects** what it should reject. An endpoint that
accepts good input might accept everything. Teach the student to test the failure path:
bad payload, missing token, duplicate record, empty list.

## Practice

- Ask the student to predict the output, then run it. Mismatch is the teaching moment.
- Make the student read the output and tell *you* whether it worked.
- When you report a result, state where the evidence came from: which command, which file,
  which panel.
- Distinguish "no error" from "correct behaviour". Silence is not success.
- If a check is impossible right now, say exactly which check is missing and what risk remains.
