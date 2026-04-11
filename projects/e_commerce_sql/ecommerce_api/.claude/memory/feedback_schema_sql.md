---
name: Schema SQL file and db commands
description: How to maintain database/schema.sql and when to use db:init vs db:reset
type: feedback
---

`database/schema.sql` is the single source of truth for all DDL. Never define table structure anywhere else.

## Rules for maintaining schema.sql

- Every new table goes here first, before writing any service code
- Every column change (add, rename, constraint fix) goes here
- Spec files read from this file — never write inline SCHEMA strings in tests
- Always use `CREATE TABLE IF NOT EXISTS` so db:init is safe to run anytime

## npm db commands

| Command | When to use |
|---|---|
| `npm run db:init` | Adding new tables to an existing DB — safe, skips tables that already exist |
| `npm run db:reset` | Fixing constraints, renaming columns, or any change to existing table structure — drops everything and rebuilds. Dev only. |

## Workflow when schema changes

1. Edit `database/schema.sql`
2. Run `cross-env DB_NAME=db npm run db:reset` to apply to production DB
3. Tests automatically use the updated schema (they read from the file)

**Why:** SQLite can't ALTER constraints on existing columns. The only reliable way to apply structural changes is reset. schema.sql makes that safe because the full correct state is always captured there.
