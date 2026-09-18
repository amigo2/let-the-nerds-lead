---
name: git-safety
description: Safe Git, GitHub, and secret hygiene for beginners. Use whenever the student wants to commit, push, pull, clone, branch, merge, undo a change, resolve a conflict, set up a repository, add a .gitignore, handle a .env file, or has possibly committed a credential. Explains before executing and protects work from destructive commands.
---

# Git Safety

Beginners lose work with Git and leak secrets with GitHub. Both are preventable and both are
teaching opportunities.

## Before any Git command

1. Run `git status` and show it. Orientation before action, every time.
2. Explain in one sentence what the next command does to the repository.
3. For anything that writes, ask for confirmation.

## The commit ritual — teach this as a habit

```bash
git status          # what changed
git diff            # what exactly changed in those files
git add <file>      # deliberately, by name
git diff --staged   # what is about to be committed
git commit -m "..."
```

Rules:

- **Review the diff before committing.** Always. This is the habit that prevents leaks.
- Prefer `git add <file>` over `git add .` for students. Explain that the dot stages
  everything, including things they did not intend.
- Commit messages describe the milestone: `Add health endpoint with Pydantic validation`,
  not `changes` or `fix`.

## Never without explicit instructor approval

These are denied in `.claude/settings.json` and must not be worked around:

- `git push --force` / `-f`
- `git reset --hard`
- `git clean -fd`
- `git filter-branch`
- `git branch -D`
- Rewriting any shared history

If the student asks for one of these, explain what it destroys and offer the safe
alternative: `git revert`, `git stash`, a new branch, or `git restore` on a single file.

## Undoing things safely

| Student wants | Safe answer |
|---|---|
| Discard edits in one file | `git restore <file>` — explain it is unrecoverable |
| Unstage a file | `git restore --staged <file>` |
| Fix the last commit message | `git commit --amend` — only if not pushed |
| Undo a pushed commit | `git revert <sha>` — adds a new commit, keeps history |
| Save work temporarily | `git stash` then `git stash pop` |
| "Everything is broken" | Stop. `git status` + `git log --oneline -5` first. Never reset. |

## Secrets — the hard rules

- Never commit `.env`, `*.pem`, `*.key`, tokens, passwords, or connection strings with real
  credentials.
- Before the first commit of any new project, create `.gitignore` **first**.
- Commit `.env.example` with empty or dummy values, never the real `.env`.
- Never ask the student to paste a token, password, or key into the chat. If they are about
  to, stop them immediately.
- Use `gh auth login` or the OS credential helper for authentication — not tokens in files.

### If a secret was committed

State clearly and without drama:

1. The credential must be treated as **compromised**. Rotate/revoke it at the provider first.
   This is the only step that actually fixes the problem.
2. Remove it from the working tree and add it to `.gitignore`.
3. Removing it in a later commit does **not** remove it from history.
4. History rewriting or repo deletion is an instructor decision, not a student one.

## Teaching notes

- Explain that Git tracks **snapshots you choose**, not files automatically.
- A commit is a save point with a message; a push shares it.
- `origin` is just a nickname for the remote.
- `main` is a branch like any other; it is only special by convention.
- Show `git log --oneline` regularly so history feels real rather than magical.
