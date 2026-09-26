# Claude Memory — Restore on a New Machine

## Where Claude's data lives

Claude Code stores per-project data under `~/.claude/projects/<encoded-path>/`, where `<encoded-path>` is the
absolute directory Claude was started in, with every `/`, `\`, `_` and `.` replaced by `-`.

| What | Keyed to | Path (macOS) |
|---|---|---|
| Memory (preferences, decisions for this project) | `Learn-folder/` root | `~/.claude/projects/-Users-<you>-Desktop-Code-Learn-folder/memory/` |
| Session history for sessions started in this project | `projects/ecommerce/` | `~/.claude/projects/-Users-<you>-Desktop-Code-Learn-folder-projects-ecommerce/` |

Memory is keyed to the `Learn-folder` root, so moving or renaming this project folder does **not** orphan it —
only paths mentioned inside the memory files need updating. Session history *is* keyed to the folder Claude was
started in: after moving the project, move that directory to the new encoded name or `claude --resume` won't find old sessions.

## How to restore on a new machine

1. Copy the memory files from the old machine's memory directory (table above) into the same path on the new one:
   ```
   mkdir -p ~/.claude/projects/-Users-<you>-Desktop-Code-Learn-folder/memory
   cp <backup>/memory/* ~/.claude/projects/-Users-<you>-Desktop-Code-Learn-folder/memory/
   ```
   If the new machine has a different username or checkout path, the encoded directory name changes accordingly.

## What NOT to copy

- `.credentials.json` — machine-specific auth token, never commit this
- `*.jsonl` session files — conversation history, not useful to sync
- `cache/`, `shell-snapshots/` — machine-specific runtime data
