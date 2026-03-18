# ecommerce-api — Claude Instructions

## Contents

1. [For Claude](#for-claude)
2. [Project Status](#project-status)
3. [Architecture](#architecture)
4. [Module Docs](#module-docs)
5. [Decisions](#decisions)

---
---

## For Claude

> Always read this file at the start of every session before doing any work in this repo.
> Update it whenever project state changes (new phase started, items completed, new rules added).
> When the user says "memorize" or "remember" anything, ALWAYS update both the memory file AND this CLAUDE.md — never just one.

---
---

## Project Status

Multi-vendor e-commerce platform. **Learning project** — phases tackled one at a time to practice raw SQL and backend architecture.

### Phases

| Phase | Module | Status |
|---|---|---|
| 1 | Auth & Users | COMPLETE |
| 2 | Categories | IN PROGRESS |
| 3 | Inventory | Not started |
| 4 | Customer Profiles | Not started |
| 5 | Cart & Orders | Not started |
| 6 | Payments | Not started |
| 7 | Shipping | Not started |
| 8 | Reviews | Not started |
| 9 | Notifications | Not started |
| 10 | Audit Logs | Not started |
| 11 | Reporting | Not started |

---
---

## Architecture

### Tech Stack

| Concern | Choice |
|---|---|
| Framework | NestJS 11, TypeScript |
| Database | SQLite via Node's built-in `DatabaseSync` |
| Auth | passport-jwt, bcrypt, uuid |
| Validation | class-validator |
| Port | 8181 (default) |

### Key Patterns

- **No ORM** — raw SQL prepared statements via `DatabaseSync` only. Never suggest TypeORM, Prisma, or any ORM.
- **Soft deletes** — `is_deleted` flag. Never hard delete.
- **Closure table** — hierarchical categories via `category_ancestors`
- **Global guards** — `JwtAuthGuard` + `PermissionsGuard` applied via `APP_GUARD`
- **Public routes** — `@IsPublic()` bypasses JWT; `@RequirePermission()` for permission checks
- **Response shape** — `ResponseInterceptor` wraps all responses: `ApiResponse<T> { message, data }`
- **Permissions** — seeded via `npm run seed:permissions` (scans `*.permissions.ts`); named `module:action`
- **Test DB** — `DB_NAME=test_db`; schema created inline in spec files

### Database Files

| Env | File |
|---|---|
| Production | `database/db` |
| Test | `database/test_db` |

---
---

## Module Docs

Module docs are the **source of truth** for each module. CLAUDE.md links to them — never duplicates them.

### CLAUDE.md Writing Rules

- Contents list at the top, every section linked
- Sections in order: For Claude → Project Status → Architecture → Module Docs → Decisions
- Double `---` between every top-level section
- Tables over bullet lists wherever data is tabular
- Decisions section at the bottom — one short entry per decision with context

### Structure (every module doc)

```
## Business    ← rules, workflows, decisions
---
---
## Technical   ← endpoints, DTOs, DB schema, service behaviour, file structure, gotchas
---
---
## Planned
### Business   ← upcoming features
### Technical  ← deferred implementation items
```

Double `---` = major section break. Single `---` = subsection break within Business or Technical.

### Links

| Module | Doc |
|---|---|
| Auth | `src/modules/auth/documentation/auth.md` |
| Users | `src/modules/users/documentation/users.md` |
| Categories | `src/modules/categories/documentation/categories.md` |

---
---

## Decisions

### No ORM
Raw SQL only — intentional for SQL practice. Never suggest an ORM regardless of complexity.

### CRM Side Project
Do not start the CRM until **Categories**, **Inventory/Products**, and **Customer Profiles** are complete. Those three phases establish the repeatable patterns needed to start a new project confidently. Customer Profiles maps directly to CRM concepts and is the natural bridge.
