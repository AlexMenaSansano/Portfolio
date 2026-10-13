#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."
bash scripts/build-preview.sh

# Use a separate index so publishing never changes the source checkout or its staging area.
preview_index_dir=$(mktemp -d /tmp/portfolio-pages-index.XXXXXX)
trap 'rm -rf "$preview_index_dir"' EXIT
export GIT_INDEX_FILE="$preview_index_dir/index"
git read-tree --empty
preview_git_dir=$(git rev-parse --absolute-git-dir)
git --git-dir="$preview_git_dir" --work-tree="$PWD/.preview-dist" -C "$PWD/.preview-dist" add --all --force -- .
preview_tree=$(git write-tree)

git fetch origin refs/heads/gh-pages:refs/remotes/origin/gh-pages 2>/dev/null || {
  # A genuinely absent branch is expected only for the first publication.
  preview_remote_ref=$(git ls-remote --heads origin refs/heads/gh-pages)
  if [ -n "$preview_remote_ref" ]; then
    echo 'Cannot read the existing preview branch; publication stopped.' >&2
    exit 1
  fi
}
preview_parent=$(git rev-parse --verify refs/remotes/origin/gh-pages 2>/dev/null || true)
if [ -n "$preview_parent" ]; then
  preview_commit=$(git commit-tree "$preview_tree" -p "$preview_parent" -m 'Update interactive portfolio preview')
else
  preview_commit=$(git commit-tree "$preview_tree" -m 'Create interactive portfolio preview')
fi

GIT_TERMINAL_PROMPT=0 git push origin "$preview_commit:refs/heads/gh-pages"
git update-ref refs/remotes/origin/gh-pages "$preview_commit"
echo 'Preview files uploaded. GitHub Pages must serve gh-pages from / (root).'
