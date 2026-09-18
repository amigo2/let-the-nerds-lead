#!/usr/bin/env bash
# PreToolUse hook for Bash commands in the Full Stack + AI Bootcamp repo.
#
# Blocks commands that destroy student work or leak credentials, even if a
# permission rule would otherwise allow them. Belt and braces alongside the
# deny list in .claude/settings.json.
#
# Contract: reads the tool call as JSON on stdin.
#   exit 0 -> allow
#   exit 2 -> block, stderr is shown to Claude as the reason
set -uo pipefail

payload="$(cat)"

# Extract the command string. Prefer jq; fall back to a crude grep.
if command -v jq >/dev/null 2>&1; then
  cmd="$(printf '%s' "$payload" | jq -r '.tool_input.command // empty')"
else
  cmd="$(printf '%s' "$payload" | tr ',' '\n' | sed -n 's/.*"command"[[:space:]]*:[[:space:]]*"\(.*\)".*/\1/p' | head -1)"
fi

[ -z "$cmd" ] && exit 0

block() {
  echo "BLOCKED by bootcamp safety hook: $1" >&2
  echo "Command: $cmd" >&2
  echo "" >&2
  echo "$2" >&2
  exit 2
}

# --- What gets scanned -----------------------------------------------------
#
# These patterns are substring matches, so they also fire on a command that
# merely *contains* the text without running it. Writing a guide about Git
# safety with a heredoc is the common case:
#
#   cat > guide.md <<'MD'
#   Never run: git push --force
#   MD
#
# That is documentation, not a command, and blocking it makes the course
# impossible to write. So heredoc bodies are removed before matching.
#
# The exception that keeps this safe: a heredoc fed to an interpreter IS
# executed, so its body is left in place and scanned in full.
#
#   bash <<'EOF'      -> body kept and scanned
#   python3 - <<'PY'  -> body kept and scanned
#   cat > f.md <<'MD' -> body dropped (it is file content)
#
# Everything outside heredoc bodies is always scanned, so quoting or
# splitting a real command cannot slip past this.
strip_heredoc_bodies() {
  awk '
    # Commands whose stdin is executed rather than stored.
    function runs_stdin(line) {
      return (line ~ /(^|[|;&(`]|[[:space:]])(sudo[[:space:]]+)?(sh|bash|zsh|ksh|dash|ash|python[0-9.]*|perl|ruby|node|php|Rscript|osascript|eval|xargs|env|source|\.)([[:space:]]|$)/)
    }
    {
      if (in_heredoc) {
        probe = $0
        if (dash_mode) { sub(/^[[:space:]\t]+/, "", probe) }
        if (probe == term) { in_heredoc = 0; print $0 }
        # Body lines are dropped: they are data, not commands.
        next
      }

      print $0

      # Does this line open a heredoc? <<WORD, <<"WORD", <<'"'"'WORD'"'"', <<-WORD
      line = $0
      if (match(line, /<<-?[[:space:]]*("[^"]+"|'"'"'[^'"'"']+'"'"'|[A-Za-z_][A-Za-z0-9_]*)/)) {
        op = substr(line, RSTART, RLENGTH)

        # An interpreter heredoc is executable input. Keep scanning its body.
        # The whole line is checked, not just the part before <<, because the
        # interpreter can sit on either side:  bash <<EOF  and  <<EOF | bash
        if (runs_stdin(line)) next

        dash_mode = (op ~ /^<<-/)
        t = op
        sub(/^<<-?[[:space:]]*/, "", t)
        gsub(/["'"'"']/, "", t)
        if (t != "") { in_heredoc = 1; term = t }
      }
    }
  '
}

scan="$(printf '%s\n' "$cmd" | strip_heredoc_bodies)"

# --- Destructive history rewriting -----------------------------------------
case "$scan" in
  *"push --force"*|*"push -f "*|*"push --force-with-lease"*)
    block "force push" "Rewriting shared history needs explicit instructor approval. Use 'git revert' to undo a pushed commit." ;;
  *"reset --hard"*)
    block "git reset --hard" "This permanently discards uncommitted work. Use 'git stash' to park changes, or 'git restore <file>' for one file." ;;
  *"git clean -fd"*|*"git clean -df"*|*"git clean -fdx"*)
    block "git clean -fd" "This deletes untracked files with no recovery. Review 'git status' and remove files deliberately instead." ;;
  *"filter-branch"*|*"filter-repo"*)
    block "history rewrite" "History rewriting is an instructor decision. If a secret was committed, rotate the credential at the provider first." ;;
  *"git branch -D"*)
    block "force branch delete" "Use 'git branch -d' which refuses to delete unmerged work, and confirm the branch is merged first." ;;
esac

# --- Filesystem destruction ------------------------------------------------
case "$scan" in
  *"rm -rf /"*|*"rm -fr /"*|*"rm -rf ~"*|*"rm -rf /*"*)
    block "recursive delete of a system path" "This would destroy data outside the project. Delete specific paths only." ;;
  *"rm -rf"*|*"rm -fr"*)
    block "recursive force delete" "Confirm the exact path with the student first, then delete without -f so errors surface." ;;
  *":(){"*|*"mkfs"*|*"dd if="*of=/dev/*)
    block "destructive system command" "This has no place in a bootcamp exercise." ;;
esac

# --- Privilege escalation --------------------------------------------------
case "$scan" in
  sudo*|*" sudo "*|su\ -*|"su"|doas*)
    block "privilege escalation" "Administrator permission must be run by the student themselves, after you explain exactly what it changes and why." ;;
esac

# --- Piping the internet into a shell --------------------------------------
if printf '%s' "$scan" | grep -Eq '(curl|wget)[^|]*\|[[:space:]]*(sudo[[:space:]]+)?(ba)?sh'; then
  block "curl | sh" "Never execute an unreviewed remote script. Download it, read it with the student, then run it."
fi

# --- Secret exposure -------------------------------------------------------
if printf '%s' "$scan" | grep -Eq '(cat|less|more|head|tail|bat|grep|strings)[[:space:]]+[^|]*(\.env|\.pem|\.key|id_rsa|credentials|\.aws/|\.ssh/)'; then
  block "reading a secret file" "Credentials must never enter the transcript. Use a .env.example with dummy values to discuss configuration."
fi

if printf '%s' "$scan" | grep -Eq '^[[:space:]]*(env|printenv)([[:space:]]|$)'; then
  block "dumping environment variables" "This can print tokens into the chat. Check one specific non-secret variable instead."
fi

# Committing a secret file directly.
if printf '%s' "$scan" | grep -Eq 'git[[:space:]]+add[^&;|]*(\.env|\.pem|\.key|id_rsa|credentials)'; then
  block "staging a credential file" "Add this pattern to .gitignore instead. Commit .env.example with empty values."
fi

exit 0
