---
name: Dual memory write — ecommerce-api
description: When writing or updating memory files for the ecommerce-api project, always write to both the real ~/.claude path AND the repo copy at ecommerce-api/.claude/memory/
type: feedback
---

Always write memory files to two locations simultaneously:

1. Real path (Claude Code reads from here) — varies per machine:
   `~/.claude/projects/C--Users-<you>-Desktop-code-Learn-folder-projects-e-commerce-sql-ecommerce-api/memory/`

2. Repo copy (for cross-machine sync) — always at:
   `ecommerce-api/.claude/memory/`

**Why:** User works across multiple Windows machines with different usernames/paths. The repo copy travels with git; the real path is where Claude Code actually reads memory. Both must stay in sync or the new-machine experience will be stale.

**How to apply:** Any time a memory file is created or updated, write/copy it to both paths in the same operation. Never write to just one. The repo copy is always at `.claude/memory/` inside the `ecommerce-api` project root.

**Important:** Only write to `ecommerce-api/.claude/memory/` — never to `.claude/` root directly. Root-level `.md` files there are duplicates and should not exist.