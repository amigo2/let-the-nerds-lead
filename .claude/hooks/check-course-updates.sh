#!/usr/bin/env bash
# SessionStart hook: tell Claude whether the student's course copy is behind.
#
# The course is written while students are already enrolled, so a clone goes
# stale within days. This checks on every session start and injects a short
# note into context so Claude can offer to update BEFORE teaching from an
# outdated guide.
#
# Design constraints:
#   - Must never hang a session (network call is time-boxed).
#   - Must never fail a session (always exits 0).
#   - Must not fetch on every single start (throttled via a state file).
#   - Read-only. It never merges, pulls, or touches student work.
set -uo pipefail

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0

# Not a git repo (e.g. downloaded as a zip) — nothing to compare against.
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0
git remote get-url origin >/dev/null 2>&1 || exit 0

STATE_DIR=".claude/state"
STAMP="$STATE_DIR/last-fetch"
THROTTLE_SECONDS=1800   # fetch at most once every 30 minutes
FETCH_TIMEOUT=8         # seconds before we give up on the network

mkdir -p "$STATE_DIR" 2>/dev/null || true

now=$(date +%s)
last=0
[ -f "$STAMP" ] && last=$(cat "$STAMP" 2>/dev/null || echo 0)
case "$last" in ''|*[!0-9]*) last=0 ;; esac

# --- Time-boxed fetch, portable (macOS has no `timeout` by default) ---------
if [ $((now - last)) -ge "$THROTTLE_SECONDS" ]; then
  git fetch --quiet origin 2>/dev/null &
  fetch_pid=$!
  waited=0
  while kill -0 "$fetch_pid" 2>/dev/null; do
    [ "$waited" -ge "$FETCH_TIMEOUT" ] && kill "$fetch_pid" 2>/dev/null && break
    sleep 1
    waited=$((waited + 1))
  done
  wait "$fetch_pid" 2>/dev/null
  printf '%s' "$now" > "$STAMP" 2>/dev/null || true
fi

branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo main)"
upstream="origin/${branch}"
git rev-parse --verify --quiet "$upstream" >/dev/null 2>&1 || exit 0

behind="$(git rev-list --count "HEAD..${upstream}" 2>/dev/null || echo 0)"
ahead="$(git rev-list --count "${upstream}..HEAD" 2>/dev/null || echo 0)"
dirty="$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')"

[ "$behind" = "0" ] && exit 0   # up to date: stay silent, no noise

# --- Report -----------------------------------------------------------------
echo "COURSE UPDATE AVAILABLE: this copy is ${behind} commit(s) behind ${upstream}."
echo ""
echo "Changed course files on the remote:"
git diff --name-only "HEAD..${upstream}" 2>/dev/null \
  | grep -E '^(course/|README\.md|CLAUDE\.md|\.claude/)' \
  | head -15 \
  | sed 's/^/  - /'
echo ""
echo "Recent instructor commits:"
git log --oneline --no-decorate "HEAD..${upstream}" 2>/dev/null | head -8 | sed 's/^/  /'
echo ""

if [ "$dirty" != "0" ]; then
  echo "NOTE: the student has ${dirty} uncommitted local change(s), so a plain pull could fail."
fi
if [ "$ahead" != "0" ]; then
  echo "NOTE: the student also has ${ahead} local commit(s) not on the remote."
fi

echo ""
echo "ACTION FOR CLAUDE: before teaching from any guide, tell the student their course"
echo "material is out of date and offer to run /update-course. Use the course-sync skill."
echo "Do NOT run git pull, merge, reset, or checkout on your own initiative here."

exit 0
