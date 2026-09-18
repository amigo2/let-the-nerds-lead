#!/usr/bin/env bash
# PostToolUse hook: after any Write/Edit, check the touched file for
# hardcoded credentials before the student can commit them.
#
# Advisory by design: exit 2 feeds the warning back to Claude so it tells the
# student immediately, rather than silently reverting their work.
set -uo pipefail

payload="$(cat)"

if command -v jq >/dev/null 2>&1; then
  file="$(printf '%s' "$payload" | jq -r '.tool_input.file_path // .tool_input.path // empty')"
else
  file="$(printf '%s' "$payload" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)"
fi

[ -z "$file" ] && exit 0
[ -f "$file" ] || exit 0

# Course material legitimately discusses placeholder credentials.
case "$file" in
  *.md|*/course/*|*/.claude/*) exit 0 ;;
esac

findings=""
add() { findings="${findings}  - $1"$'\n'; }

# Real provider key formats — high confidence, low false positives.
grep -Eq 'sk-ant-[A-Za-z0-9_-]{20,}'                  "$file" && add "Anthropic API key (sk-ant-...)"
grep -Eq 'sk-[A-Za-z0-9]{32,}'                        "$file" && add "OpenAI-style API key (sk-...)"
grep -Eq 'gh[pousr]_[A-Za-z0-9]{30,}'                 "$file" && add "GitHub token (ghp_/gho_/ghu_/ghs_/ghr_...)"
grep -Eq 'AKIA[0-9A-Z]{16}'                           "$file" && add "AWS access key ID (AKIA...)"
grep -Eq 'AIza[0-9A-Za-z_-]{35}'                      "$file" && add "Google API key (AIza...)"
grep -Eq 'xox[baprs]-[A-Za-z0-9-]{10,}'               "$file" && add "Slack token (xox...)"
grep -Eq 'sk_live_[A-Za-z0-9]{20,}'                   "$file" && add "Stripe live secret key (sk_live_...)"
grep -Eq 'BEGIN (RSA |EC |OPENSSH |PGP )?PRIVATE KEY' "$file" && add "Private key block"

# Assigned literal secrets. Ignore obvious placeholders and env lookups.
if grep -Eiq '(password|passwd|secret|api[_-]?key|access[_-]?token|auth[_-]?token)[[:space:]]*[:=][[:space:]]*["'"'"'][^"'"'"']{8,}' "$file"; then
  if ! grep -Eiq '(your[_-]?|example|placeholder|changeme|xxx+|\.\.\.|<[a-z_]+>|dummy|fake|test123|os\.environ|getenv|process\.env|settings\.)' "$file"; then
    add "Hardcoded credential assigned to a variable"
  fi
fi

# Database URL carrying a real-looking password.
if grep -Eiq '(postgres(ql)?|mysql|mongodb)(\+[a-z]+)?://[^:@/]+:[^:@/]{6,}@' "$file"; then
  if ! grep -Eiq '://[^:@/]+:(password|postgres|changeme|secret|example|dummy)@' "$file"; then
    add "Database connection string containing a password"
  fi
fi

[ -z "$findings" ] && exit 0

{
  echo "⚠️  POSSIBLE SECRET in: $file"
  echo ""
  printf '%s' "$findings"
  echo ""
  echo "Tell the student now, before anything is committed:"
  echo "  1. Move the value into .env and read it from the environment."
  echo "  2. Confirm .env is listed in .gitignore."
  echo "  3. Commit .env.example with an empty or dummy value instead."
  echo "  4. If this value was ever pushed, treat it as compromised and rotate it at the provider."
} >&2

exit 2
