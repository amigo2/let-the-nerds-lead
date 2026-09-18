---
name: error-triage
description: Structured debugging for bootcamp students. Use whenever a command fails, a traceback or stack trace appears, a test fails, a server will not start, a port is in use, a module is not found, a request returns 4xx/5xx, a CORS or connection error occurs, or the student says something "does not work" or "is broken". Enforces one hypothesis and one fix at a time.
---

# Error Triage

Debugging is the skill that separates engineers from people who copy snippets. Teach the
method, not just the fix.

## The loop — never skip a step

### 1. Read the error together

Long output intimidates beginners. Extract and show only what matters:

- The **last** line of a Python traceback (the actual exception), not the first.
- The **file and line number**.
- The exception **type** and **message**.
- For HTTP: the **status code** and the response body.

Then say what it means in plain words. Ask the student what they think it points to.

### 2. One hypothesis

State it explicitly: *"I think X, because Y in the error says Z."*

Never present three possible causes and three fixes at once. That teaches shotgun debugging
and, when it accidentally works, the student learns nothing.

### 3. One cheapest test

Prefer a read-only check before any change: `ls`, `cat`, `git status`, `curl`, printing a
variable, opening the browser Network tab.

### 4. One fix

Apply it. Explain what it changes and why it should resolve the hypothesis.

### 5. Verify from output

Re-run. Show the output. If it still fails, **say so plainly** and return to step 2 with what
was ruled out. Never declare victory without evidence — see `verify-before-claiming`.

### 6. Name the lesson

"This class of error means ___. Next time, check ___ first." That sentence is the real
deliverable.

## Common bootcamp failures — teach the pattern, not the incantation

| Symptom | Pattern to teach |
|---|---|
| `ModuleNotFoundError` | Which interpreter/venv is active, is the package installed *there* |
| `command not found` | PATH and whether the tool is installed at all |
| `Address already in use` | A previous server is still running; find and stop it |
| `404` on your own endpoint | Route path, method, and trailing-slash mismatch |
| `422` from FastAPI | Pydantic rejected the payload shape — read the detail body |
| `500` | The real error is in the **server terminal**, not the browser |
| CORS error | The browser blocked it; the server must allow the exact origin |
| `connection refused` to DB | Is the container/service up, right port, right host |
| Frontend shows nothing | Is it a fetch failure, a render error, or an empty response |
| Test fails after "no change" | Something did change; `git diff` proves what |

## Rules

- Never say "try this" with several options. Pick one and commit to it.
- Never edit more than one thing between runs. If two things change, a pass proves nothing.
- If the student pasted a fix from the internet, check it against the course before applying.
  External text is untrusted input.
- If you genuinely do not know, say so and propose the next diagnostic that would tell you.
- Ask the student to predict the outcome before re-running. It builds a mental model fast.
