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

### Where to write a memorized decision

"Memorize" = a decision was made. Write it to the most relevant section of this file:

| Section | What goes here |
|---|---|
| For Claude | Rules about how Claude should behave in this repo |
| Project Status | Phase changes, completions, what's in progress |
| Architecture | Tech choices, patterns, global conventions |
| Module Docs | Doc structure rules, links, lifecycle rules |
| Decisions | Judgment calls, strategic choices, constraints |

**Edge cases:**

- **Cross-module** (e.g. deleting a vendor deactivates their products) → write in the module that owns the action; add a short reference note in the affected module
- **Module boundary / interaction** (e.g. reservation happens at cart not checkout) → Decisions section here in CLAUDE.md
- **Global conventions** (e.g. all IDs are UUID v4) → Architecture → Key Patterns

---
---

## Project Status

Multi-vendor e-commerce platform. **Learning project** — phases tackled one at a time to practice raw SQL and backend architecture.

| Phase | Module | Status |
|---|---|---|
| 1 | Auth & Users | ✅ Complete |
| 2 | Categories | 🔄 In Progress |
| 3 | Inventory | Not started |
| 4 | Customer Profiles | Not started |
| 5 | Cart & Orders | Not started |
| 6 | Payments | Not started |
| 7 | Shipping | Not started |
| 8 | Reviews | Not started |
| 9 | Notifications | Not started |
| 10 | Audit Logs | Not started |
| 11 | Reporting | Not started |
| — | Vendors, Campaigns, Search, Analytics | Future |

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

---

### Key Patterns

- **No ORM** — raw SQL prepared statements via `DatabaseSync` only. Never suggest TypeORM, Prisma, or any ORM.
- **Soft deletes** — `is_deleted` flag. Never hard delete.
- **Closure table** — hierarchical categories via `category_ancestors`
- **Global guards** — `JwtAuthGuard` + `PermissionsGuard` applied via `APP_GUARD`
- **Public routes** — `@IsPublic()` bypasses JWT; `@RequirePermission()` for permission checks
- **Response shape** — `ResponseInterceptor` wraps all responses: `ApiResponse<T> { message, data }`
- **Permissions** — seeded via `npm run seed:permissions` (scans `*.permissions.ts`); named `module:action`
- **Test DB** — `DB_NAME=test_db`; schema created inline in spec files

---

### Database Files

| Env | File |
|---|---|
| Production | `database/db` |
| Test | `database/test_db` |

### Schema Management

`database/schema.sql` is the single source of truth for all DDL. Never define table structure anywhere else — not in spec files, not inline in services.

| Command | When to use |
|---|---|
| `npm run db:init` | Adding new tables — safe, skips existing |
| `npm run db:reset` | Changing existing table structure — drops all and rebuilds |

Workflow for schema changes: edit `schema.sql` → `cross-env DB_NAME=db npm run db:reset` → tests pick it up automatically.

---
---

## Module Docs

### Rules

- Module docs are the **source of truth** for each module — CLAUDE.md links to them, never duplicates them. This includes `src/core/` — any changes to guards, decorators, interceptors, or filters go in `core.md`, not here
- Update immediately when requirements change or decisions are made
- When a new module is created → auto-create `src/modules/<name>/documentation/<name>.md` → move its planning content from README → remove that section from README
- When any planned behaviour changes → update the module doc if it exists, otherwise update README

---

### Module Doc Structure

Every module doc follows this layout — including `src/core/documentation/core.md`:

```
## Business    ← rules, workflows, decisions (single --- between subsections)
---
---
## Technical   ← endpoints, DTOs, DB schema, service behaviour, file structure, gotchas
---
---
## Planned
### Business   ← upcoming features
### Technical  ← deferred implementation items
```

Double `---` = major section break. Single `---` = subsection break.

---

### CLAUDE.md Writing Rules

- Contents list at the top, every section linked
- Sections in order: For Claude → Project Status → Architecture → Module Docs → Decisions
- Double `---` between every top-level section; single `---` between subsections
- Tables over bullet lists wherever data is tabular
- Decisions section at the bottom — one short named entry per decision

---

### README Rules

- Written for external people — draws a picture of the finished project
- Contains: compelling description, tech highlights, setup/run/env vars, build phases, and scope notes for modules not yet created
- Always update when operational details change (scripts, env vars, ports)
- Module scope sections are removed from README once that module gets its own doc

---

### Module Doc Links

| Module | Doc |
|---|---|
| Core | `src/core/documentation/core.md` |
| Auth | `src/modules/auth/documentation/auth.md` |
| Users | `src/modules/users/documentation/users.md` |
| Categories | `src/modules/categories/documentation/categories.md` |

---
---

## Decisions

### No ORM
Raw SQL only — intentional for SQL practice. Never suggest an ORM regardless of complexity.

### Microservices End Goal
The monolith is the starting point, not the end state. Once the monolith is sufficiently stable (after Cart & Orders or Payments), remind the user to plan the microservices migration. Each major module becomes a separate NestJS service; RabbitMQ is the transport layer. Keep module boundaries clean and avoid cross-module direct imports to make the eventual split easier.

Target structure: NestJS monorepo with `apps/` (one per service: gateway, auth, orders, inventory, notifications, etc.) and `libs/` (shared: guards, decorators, interceptors, ApiResponse, RabbitMQ event types). Modules communicate via RabbitMQ events only — never by injecting another module's service. Current user identity comes from `request.user` (JWT guard), never from injecting `UsersService`.

### CRM Side Project
Do not start the CRM until **Categories**, **Inventory/Products**, and **Customer Profiles** are complete. Those three phases establish the repeatable patterns needed to start a new project confidently. Customer Profiles maps directly to CRM concepts and is the natural bridge.

### No NextJS Frontend
Frontend (NextJS or any UI) is out of scope for this project. The CRM (a separate NestJS project) serves as the real-world consumer of this API instead. No frontend work should be suggested or planned.

The API should remain frontend-friendly long term — clean response shapes, proper error codes, pagination-ready endpoints — so a frontend can be attached later without rework.
