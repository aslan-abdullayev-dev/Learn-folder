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
> Do not wait to be told — update docs as part of completing any task. Writing code and updating docs are the same step.

---

### Reading guide

Read the right file before the right task. Never skip this.

| Task type | Read before starting |
|---|---|
| Implementing or changing a business rule / workflow | `<name>.md` |
| Implementing or changing an endpoint, DTO, service, or DB | `<name>.tech.md` |
| Touching core guards, decorators, interceptors, or filters | `core.tech.md` |
| Adding or changing any error response | `src/docs/errors.md` |
| Starting a new module phase | `src/docs/roadmap.md` → then create both docs |
| Cross-module interaction (service A calls service B) | Both modules' `.tech.md` files |
| Making a strategic or architectural decision | This CLAUDE.md |
| Beginning any session | This CLAUDE.md first, then the relevant module docs |

---

### Write triggers

Do not wait for the user to say "memorize" or "remember". Update the relevant file immediately whenever any of the following happen:

| Trigger | What to update |
|---|---|
| New module created | Create `<name>.md` + `<name>.tech.md`; split roadmap section — business scope → `<name>.md` Planned, technical items → `<name>.tech.md` Planned; delete from roadmap; add both to Module Doc Links table |
| New endpoint added | `<name>.tech.md` → Endpoints table; update any sequence diagrams that include it |
| New DTO added or changed | `<name>.tech.md` → DTOs section |
| Schema change (table, column, index) | `<name>.tech.md` → Database Schema section + ER diagram; `database/schema.sql` |
| Service flow changes (new step, branch, error path) | `<name>.tech.md` → relevant sequence or flowchart diagram |
| Business rule added or changed | `<name>.md` → relevant Business section; update any business diagrams affected |
| Status or state transition changes | `<name>.md` → state diagram + status table |
| Cross-module dependency added | Both modules' `.tech.md` → dependency diagram or Gotchas; note which module calls which |
| Core infrastructure changes (guard, decorator, interceptor) | `core.tech.md` → relevant section + diagrams; check if any module `.tech.md` references it |
| Planned business feature added or changed | `<name>.md` → Planned → Business (or `src/docs/roadmap.md` if no doc yet) |
| Planned technical item added or changed | `<name>.tech.md` → Planned → Technical (or `src/docs/roadmap.md` if no doc yet) |
| Scope decided for unstarted module | `src/docs/roadmap.md` → its phase or future section |
| Architectural decision made | CLAUDE.md → Architecture or Decisions |
| Global convention established | CLAUDE.md → Architecture → Key Patterns |
| Phase started | CLAUDE.md → Project Status; create module docs; move roadmap section |
| Phase completed | CLAUDE.md → Project Status |
| New error code or message added / changed | `src/docs/errors.md` → relevant status code section |
| Script / env var / port changed | README |
| Doc file moved or renamed | Update all cross-reference links in files that link to it |
| User says "memorize" or "remember" | Memory file (`~/.claude/projects/.../memory/`) AND this CLAUDE.md — never just one |

---

### Where to write a decision

| Section | What goes here |
|---|---|
| For Claude | Rules about how Claude should behave in this repo |
| Project Status | Phase changes, completions, what's in progress |
| Architecture | Tech choices, patterns, global conventions |
| Module Docs | Doc structure rules, links, lifecycle rules |
| Decisions | Judgment calls, strategic choices, constraints |

**Which file within a module:**

| Decision type | File |
|---|---|
| Business rule, workflow, visibility logic | `<name>.md` |
| Endpoint behaviour, DB schema, service implementation | `<name>.tech.md` |
| Cross-module note (e.g. auth calls users) | `<name>.tech.md` Gotchas in the calling module; brief ref in called module |
| Module boundary decision (e.g. reservation at cart not checkout) | CLAUDE.md → Decisions |
| Global convention | CLAUDE.md → Architecture → Key Patterns |

---
---

## Project Status

Multi-vendor e-commerce platform. **Learning project** — phases tackled one at a time to practice raw SQL and backend architecture.

| Phase | Module | Status |
|---|---|---|
| 1 | Auth & Users | 🔁 Restarting — source wiped, docs intact, rebuilding against PostgreSQL |
| 2 | Categories | 🔁 Restarting — source wiped, docs intact, rebuilding against PostgreSQL |
| 3 | Inventory | Not started |
| 4 | Customer Profiles | Not started |
| 5 | Cart & Orders | Not started |
| 6 | Payments | Not started |
| 7 | Shipping & Returns | Not started |
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
- **Test DB** — `DB_NAME=test_db`; uses `database/test_db` file; schema from `database/schema.sql` — never defined inline in spec files

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

### Ownership Rules

- Each doc pair is the **sole source of truth** for its module — CLAUDE.md links, never duplicates
- `src/core/docs/core.tech.md` owns all guard, decorator, interceptor, and filter documentation — never put this in other module docs
- Update triggers are defined in the **Write triggers** table above — follow without being asked
- Before working on a module, consult the **Reading guide** above for which file to read first

---

### Doc Locations

All docs live under `src/` — never at the project root.

| File | Location |
|---|---|
| Module business doc | `src/modules/<name>/docs/<name>.md` |
| Module technical doc | `src/modules/<name>/docs/<name>.tech.md` |
| Core business doc | `src/core/docs/core.md` |
| Core technical doc | `src/core/docs/core.tech.md` |
| Roadmap | `src/docs/roadmap.md` |

Each business doc links to its tech doc at the top, and vice versa.

---

### Module Doc Structure

**Business doc** (`<name>.md`):
```
## Business
### What It Does
  - What problem does this module solve for the product?
  - Why does it work the way it does? (key design decisions in plain language)
### [Domain rules, workflows, state machines, visibility rules]
  - Mermaid diagrams for any flow, state machine, or decision tree
---
---
## Planned
### Business   ← features not yet built
```

**Technical doc** (`<name>.tech.md`):
```
## Technical
### Endpoints       ← method, path, permission, status
### DTOs            ← field tables with types, required, notes
### Examples        ← one block per endpoint: request + every response variant (200, 4xx)
### [Service flows] ← sequenceDiagram or flowchart per non-trivial operation
### Database Schema ← erDiagram + column tables
### File Structure  ← annotated directory tree
### Gotchas         ← non-obvious behaviours, traps, internal-only methods
---
---
## Planned
### Technical  ← deferred implementation items
```

Double `---` = major section break. Single `---` = subsection break within a section.

**Diagrams** — use Mermaid (` ```mermaid `). Add diagrams where a flow, state machine, decision tree, or relationship is clearer visually than in prose. Diagrams are part of the doc — update them when the code or rules they represent change.

**Examples section** — every endpoint needs a block showing:
- The request body (if applicable)
- The success response with realistic data
- Every distinct error response the endpoint can return (one block per status code)

**Roadmap phase entries** — each phase section in `src/docs/roadmap.md` must include:
- A one-line scope summary
- Business rules (what operators/customers can do, constraints they feel)
- Technical constraints (implementation decisions, atomicity requirements, known traps)

---

### Roadmap

`src/docs/roadmap.md` holds scope notes for every module that has no doc yet.

| Event | Action |
|---|---|
| New scope decided for unstarted module | Add/update its section in roadmap |
| Module phase starts | Move roadmap section → new module doc's Planned section, delete from roadmap |
| Planned behaviour changes for unstarted module | Update its roadmap section |

Roadmap structure: **Upcoming Phases** (ordered by phase number) → **Future Modules** (unphased).

---

### README

External-facing only. Contains: description, tech stack, setup, env vars, scripts, build phases table. Nothing else.

| What changed | Update README? |
|---|---|
| Script added or renamed | Yes |
| Env var added or changed | Yes |
| Port changed | Yes |
| Module scope or planning | No — use roadmap |
| Architecture decisions | No — use CLAUDE.md |

---

### CLAUDE.md Writing Rules

- Contents list at the top, every section linked
- Sections in order: For Claude → Project Status → Architecture → Module Docs → Decisions
- Double `---` between every top-level section; single `---` between subsections
- Tables over bullet lists wherever data is tabular
- Decisions section at the bottom — one short named entry per decision

---

### Module Doc Links

| Module | Business | Technical |
|---|---|---|
| Core | `src/core/docs/core.md` | `src/core/docs/core.tech.md` |
| Auth | `src/modules/auth/docs/auth.md` | `src/modules/auth/docs/auth.tech.md` |
| Users | `src/modules/users/docs/users.md` | `src/modules/users/docs/users.tech.md` |
| Categories | `src/modules/categories/docs/categories.md` | `src/modules/categories/docs/categories.tech.md` |
| Roadmap | `src/docs/roadmap.md` | — |
| Error Reference | `src/docs/errors.md` | — |
| Testing | `src/docs/testing.md` | — (not yet created) |
| Permissions | `src/docs/permissions.md` | — (not yet created) |

---
---

## Decisions

### No ORM
Raw SQL only — intentional for SQL practice. Never suggest an ORM regardless of complexity.

### 2026-08-08 Reset: SQLite → PostgreSQL
Project paused for several months; on resuming, all source code was deleted (`src/**/*.ts`, `database/*.ts`, `database/schema.sql`, `database/db`, `database/test_db`, `scripts/*.ts`) and will be rebuilt from scratch against **PostgreSQL** instead of SQLite. Git history and every markdown doc (business + technical, per module) were kept untouched as the spec to rebuild against. The Postgres connection layer, Docker setup, and schema are being written by the user directly as the relearning exercise — do not pre-build `docker-compose.yml`, a `DatabaseModule`/`DatabaseService`, or `schema.sql` unless explicitly asked. `database/documentation/database.md` still describes the old synchronous `DatabaseSync` pattern and is stale until the new DB layer exists — update it once the user has built the replacement.

### Microservices End Goal
The monolith is the starting point, not the end state. Once the monolith is sufficiently stable (after Cart & Orders or Payments), remind the user to plan the microservices migration. Each major module becomes a separate NestJS service; RabbitMQ is the transport layer. Keep module boundaries clean and avoid cross-module direct imports to make the eventual split easier.

Target structure: NestJS monorepo with `apps/` (one per service: gateway, auth, orders, inventory, notifications, etc.) and `libs/` (shared: guards, decorators, interceptors, ApiResponse, RabbitMQ event types). Modules communicate via RabbitMQ events only — never by injecting another module's service. Current user identity comes from `request.user` (JWT guard), never from injecting `UsersService`.

### CRM Side Project
Do not start the CRM until **Categories**, **Inventory/Products**, and **Customer Profiles** are complete. Those three phases establish the repeatable patterns needed to start a new project confidently. Customer Profiles maps directly to CRM concepts and is the natural bridge.

CRM is a separate Angular project — a frontend that consumes `ecommerce-api` directly. No separate CRM backend.

### Naming Convention
DB columns use `snake_case`. DTO fields and API response properties use `camelCase`. Mapping happens in the service layer — never return raw DB column names to the client.

### Frontend Plan
`ecommerce-api` serves all consumers:
- **CRM** — Angular frontend, for internal operators. Start after Categories + Inventory + Customer Profiles.
- **Customer-facing ecommerce frontend** — not planned.

No NextJS or other frontend frameworks planned. Angular is the chosen frontend for the CRM.

The API should remain frontend-friendly — clean response shapes, proper error codes, pagination-ready endpoints.

---
---

## Planned

### Architecture / Docs

- Convert Key Patterns bullet list to a table (violates own "tables over bullet lists" rule)
- Create `src/docs/testing.md` — testing strategy, setup, spec patterns, example
- Create `src/docs/permissions.md` — permissions file structure, naming convention, how to add a new permission
- Resolve stock reservation timing contradiction in roadmap: Phase 3 says "during checkout", Phase 5 says "at cart-add" — decide and align both
