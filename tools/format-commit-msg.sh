#!/usr/bin/env bash
# Sample commit-msg hook to check Conventional Commits (optional)
MSG_FILE=$1
MSG="$(cat $MSG_FILE)"
if ! echo "$MSG" | grep -E '^(feat|fix|chore|docs|refactor|test|style)(\(.+\))?: .+' >/dev/null; then
  echo "Commit message does not follow Conventional Commits format."
  echo "Example: feat(api): add new endpoint"
  exit 1
fi
