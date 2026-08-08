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

**Current state (2026-08-08):** Full reset, twice over. First pass wiped all source code but kept docs (see Decisions). Same day, the user deleted every remaining doc too (`core.md`, `core.tech.md`, `auth.md`, `auth.tech.md`, `categories.md`, `categories.tech.md`, `users.md`, `users.tech.md`, `roadmap.md`, `errors.md`) — a deliberate choice, not an accident. **Only this `CLAUDE.md` and `README.md` exist right now.** `src/` is empty. The Reading Guide and Module Doc Links below describe the intended structure for when docs get recreated — none of those files currently exist, so don't try to read or reference them until they're written fresh.

| Phase | Module | Status |
|---|---|---|
| 1 | Auth & Users | Not started — full reset, no docs or code |
| 2 | Categories | Not started — full reset, no docs or code |
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

### Local Dev Environment (as of 2026-08-08)

- Working on git branch `ecommerce_api` — kept separate from `main`, which carries unrelated changes from other projects in this monorepo
- Docker Desktop installed and confirmed running (`docker ps` works)
- DataGrip installed (chosen over pgAdmin — user already uses DataGrip at work, direct skill transfer)
- PostgreSQL runs via **Docker Compose**, not Homebrew/Postgres.app — decided so it scales cleanly once Redis/RabbitMQ/Meilisearch join later (see Tech Stack)
- `docker-compose.yml` **created** (2026-08-08) — single `postgres:16` service, `services:`/`environment:`/`ports: "5432:5432"`/`volumes:` for persistence, credentials via `.env` (gitignored) with `.env.example` checked in. Written by Claude at the user's explicit request, after the user chose a chat-based concept primer over the self-write exercise.
- **Still not created:** any `DatabaseModule`/`DatabaseService`, `schema.sql`. **Do not write these, or any DB layer code, unless explicitly asked** — same constraint as the Decisions entry below.
- **Old single-app NestJS scaffold removed (2026-08-08)** — the root-level `package.json`/`node_modules`/`tsconfig.json`/`tsconfig.build.json`/`nest-cli.json`/`eslint.config.mjs`/`.prettierrc`/empty `src/` were leftover from the pre-microservices monolith plan and no longer fit the `backend/<service>/` structure (see Decisions → Microservices Architecture). Deleted, recoverable via git history if ever needed. `backend/` created at the repo root; each service gets its own independent scaffold inside it, starting with `backend/auth/`.

---
---

## Architecture

### Tech Stack

| Concern | Choice |
|---|---|
| Framework | NestJS 11, TypeScript |
| Database | PostgreSQL — raw SQL only, no ORM |
| Auth | passport-jwt, bcrypt, uuid |
| Validation | class-validator |
| Port | 8181 (default) |

---

### Key Patterns

- **No ORM** — raw SQL prepared statements only. Never suggest TypeORM, Prisma, or any ORM.
- **Soft deletes** — `is_deleted` flag. Never hard delete.
- **Closure table** — hierarchical categories via `category_ancestors`
- **Global guards** — `JwtAuthGuard` + `PermissionsGuard` applied via `APP_GUARD`
- **Public routes** — `@IsPublic()` bypasses JWT; `@RequirePermission()` for permission checks
- **Response shape** — `ResponseInterceptor` wraps all responses: `ApiResponse<T> { message, data }`
- **Permissions** — named `module:action`; seeding approach to be redecided during rebuild (previously a standalone script)
- **Schema single source of truth** — table structure defined once in one file, never inline in spec files or services; exact file/location pending rebuild
- **No shared code between services** — no `libs/` folder, categorically. Each service (`apps/<name>`) has its own DTOs, interceptors, `ApiResponse` wrapper rather than importing shared internal packages. Deliberate — see Decisions → Microservices Architecture. (Auth is not part of this: JWT verification happens once, centrally, at the Gateway — it's not per-service code at all, so there's nothing to duplicate or share for that piece.)
- **Module DB isolation, technically enforced** — one Postgres container, one database per service (e.g. `auth_db`, `users_db`), each with its own dedicated role granted `CONNECT` only on its own database (public `CONNECT` revoked). Postgres connections are scoped to exactly one database with no cross-database query syntax available by default — so cross-service table access is blocked structurally and by permissions, not just by convention

---

### Database Files & Schema Management

Pending rebuild — connection config, schema file location, and dev/test database strategy are being redesigned against PostgreSQL by the user directly. See Decisions → 2026-08-08 Reset. Update this section once decided.

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
Project paused for several months; on resuming, all source code and the entire `database/` directory were deleted, and every module's technical doc (`<name>.tech.md`) was trimmed back to a target design (endpoints/DTOs + Planned) — implementation specifics that described the old SQLite build (schema, example payloads, flow diagrams with literal queries, file structure, gotchas) were removed since they no longer apply and shouldn't bias the rebuild. Business docs (`<name>.md`) and `roadmap.md` were kept as-is — they capture product/business intent, not implementation, and remain valid regardless of engine. Rebuilding from scratch against **PostgreSQL**. The Postgres connection layer, Docker setup, and schema are being written by the user directly as the relearning exercise — do not pre-build `docker-compose.yml`, a `DatabaseModule`/`DatabaseService`, or `schema.sql` unless explicitly asked.

### 2026-08-08 Full Reset: All Docs Deleted Too
Same day as the reset above, the user went further and deleted every remaining doc — `core.md`, `core.tech.md`, `auth.md`, `auth.tech.md`, `categories.md`, `categories.tech.md`, `users.md`, `users.tech.md`, `roadmap.md`, `errors.md` — not just source code. This followed a review pass where several business docs turned out to still contain previous-implementation detail (exact deleted class/decorator names like `JwtAuthGuard`, `@IsPublic()` in sequence diagrams and prose) despite earlier trimming — rather than keep chasing leftover implementation detail doc-by-doc, the user chose to restart documentation from zero alongside the code. This was deliberate, not accidental. Only `CLAUDE.md` and `README.md` remain. Do not attempt to reconstruct or restore any deleted doc from memory or git history — when a module is picked up again, write its docs fresh, informed by conversation with the user at that time.
### Microservices Architecture (revised 2026-08-08 — supersedes original "monolith first" plan)
**Originally planned:** monolith first, split into microservices later (after Cart & Orders or Payments). **Revised same day:** the user wants to learn microservices patterns hands-on, so the project is built as microservices starting from **Phase 1 (Auth & Users)** — not deferred. Accepted tradeoff: more upfront complexity (distributed auth, service boundaries decided before the domain is proven) in exchange for the learning value; the user made this call explicitly, knowing the cost.

- **One monorepo, not separate git repos per service — and not NestJS's built-in `apps/`+`libs/` workspace tooling either.** That tooling shares one root `package.json`/`node_modules` across every service, which is its own form of coupling (shared dependency versions) and doesn't fit "zero shared code" below. Instead: a `backend/` folder at the repo root, one subfolder per service, each a fully independent, standalone NestJS project (own `package.json`, own `node_modules`, own `nest new` scaffold, own `Dockerfile`) — e.g. `backend/gateway/`, `backend/auth/`, `backend/orders/`. Nothing links them except being sibling folders in the same git repo. This project lives inside the `Learn-folder` umbrella repo as a subdirectory — separate top-level repos per service would break that existing structure.
- **No shared code between services, categorically** — no `libs/` folder. Each service has its own DTOs, interceptors, `ApiResponse` wrapper. Deliberate: shared internal libraries create hidden coupling that undermines independent deployability — same reasoning as DB isolation below. This replaces the earlier target of a shared `libs/` (guards, decorators, interceptors, ApiResponse, RabbitMQ event types) — that's no longer the plan.
- **No Consul, no service registry.** Docker Compose's built-in DNS (service name → container IP) is sufficient for this project's fixed, small, single-machine service set. Consul solves dynamic multi-host instance discovery — not a problem this project has. Revisit only if this ever moves to Kubernetes or dynamic scaling.
- **Auth is centralized, not duplicated.** One Auth service owns login/registration/password hashing/issuing JWTs. Verification happens **once**, at the Gateway (or a dedicated auth-checking step) before a request is dispatched — downstream services (Users, Orders, etc.) receive already-authenticated requests and never independently re-verify a JWT. This isn't "no shared guard code," it's "no per-service guard code at all" — the check only exists in one place.
- **Routing:** an API Gateway is the single entry point; forwards by path to the right service over Docker's internal network (service-name resolution, same mechanic as Postgres's container hostname).
- **Database isolation, technically enforced:** one Postgres container, one database per service (e.g. `auth_db`, `users_db`), each with its own dedicated role granted `CONNECT` only on its own database (public `CONNECT` revoked). See Key Patterns → Module DB isolation for the full mechanism.
- RabbitMQ remains the event transport for async communication between services once needed.

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
- When `roadmap.md` is recreated: watch for a stock reservation timing contradiction between Inventory and Cart & Orders phases (checkout-time vs cart-add-time reservation) — decide and align both when writing that scope
- **Module Docs section is stale post-MS decision** — Doc Locations table, Reading Guide, and Module Doc Links all assume `src/modules/<name>/docs/...`; needs updating to `backend/<service>/docs/...` under the microservices structure. Also: `core.md`/`core.tech.md` was meant to document shared guards/interceptors/filters, but "no shared code between services" means there's no shared core anymore — each service needs its own local equivalent instead of one shared core doc. Handle this sweep when Phase 1 docs are actually created, not before
