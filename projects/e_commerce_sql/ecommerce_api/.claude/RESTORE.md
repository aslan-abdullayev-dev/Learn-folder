# Claude Memory — Restore on a New Machine

## What's here

`memory/` — Claude's persistent memory files for the ecommerce-api project.
These teach Claude your preferences, feedback, and project decisions so it behaves consistently across machines.

## How to restore

1. Find the correct memory target path. Claude Code stores project memory at:
   ```
   C:\Users\<you>\.claude\projects\C--Users-<you>-Desktop-code-Learn-folder-projects-e-commerce-sql-ecommerce-api\memory\
   ```
   The folder name is derived from the project path with path separators replaced by `--`.

2. Create the folder if it doesn't exist:
   ```
   mkdir "C:\Users\<you>\.claude\projects\C--Users-<you>-Desktop-code-Learn-folder-projects-e-commerce-sql-ecommerce-api\memory"
   ```

3. Copy all files from this folder into it:
   ```
   copy ".claude\memory\*" "C:\Users\<you>\.claude\projects\C--Users-<you>-Desktop-code-Learn-folder-projects-e-commerce-sql-ecommerce-api\memory\"
   ```

## Keeping it in sync

Every time Claude updates a memory file, it writes to the real `~/.claude/projects/.../memory/` path.
Run this periodically to sync the copy back into the repo:

```
copy /Y "C:\Users\<you>\.claude\projects\C--Users-<you>-Desktop-code-Learn-folder-projects-e-commerce-sql-ecommerce-api\memory\*" "C:\Users\<you>\Desktop\code\Learn-folder\projects\e-commerce-sql\ecommerce-api\.claude\memory\"
```

Then commit and push. On the next machine, pull and run the restore steps above.

## What NOT to copy

- `.credentials.json` — machine-specific auth token, never commit this
- `history.jsonl` / session files — conversation history, not useful to sync
- `cache/`, `shell-snapshots/` — machine-specific runtime data