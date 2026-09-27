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
| Architectural decision made | New ADR in `docs/adr/` + row in CLAUDE.md → Decisions index + `docs/adr/README.md` |
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
| Decisions | Index of ADRs (`docs/adr/`) with the one-line rule for Claude — full records live in the ADR files |

**Which file within a module:**

| Decision type | File |
|---|---|
| Business rule, workflow, visibility logic | `<name>.md` |
| Endpoint behaviour, DB schema, service implementation | `<name>.tech.md` |
| Cross-module note (e.g. auth calls users) | `<name>.tech.md` Gotchas in the calling module; brief ref in called module |
| Module boundary decision (e.g. reservation at cart not checkout) | New ADR + CLAUDE.md → Decisions index |
| Global convention | CLAUDE.md → Architecture → Key Patterns |

### Task management (Jira)

Setup and reasoning: [ADR 0009](docs/adr/0009-jira-team-spaces.md), [ADR 0010](docs/adr/0010-record-decisions-as-adrs.md). Site `aslanabdullayevdev.atlassian.net`, via the `atlassian` MCP server. **Jira is the source of truth for the backlog — don't duplicate ticket lists here.**

| Space | Team | Owns | Board |
|---|---|---|---|
| `PLAT` | Platform/DevOps | infra compose, Postgres/RabbitMQ/Redis, CI, gateway | PLAT board |
| `IDN` | Identity | `backend/auth`, `backend/users` | IDN board |
| `COM`, `CRM`, `SHOP` (future) | Commerce / CRM FE / Storefront FE | — | create when phase starts |

**Workflow:** `To Do` → `Ready For Development` → `In Progress` → `In Review` → `Done`.

**Rules:**
- Every decision or piece of work agreed in conversation gets a ticket in the owning team's space; tell the user the key. Decisions also get an ADR.
- Technical work = **Task**; user-visible value = **Story**; each team's larger goals = **Epic** in its own space. Cross-team dependencies = "blocks" links; cross-team goals = label `init-<name>` (current: `init-phase1-auth`).
- Descriptions follow: Background / Why / What to do / Acceptance criteria / Out of scope / Depends on.
- **Blocked tickets:** "blocks" link to the blocker + label `blocked` + a comment saying what unblocks it; keep them in the backlog, not in a sprint. When the blocker is Done, remove the label. (Jira's "Flag" isn't on this site's edit screens; saved search for all blocked work: `labels = blocked`.)
- Move tickets as work actually happens: `In Progress` when starting, `In Review` when changes are ready for review, `Done` only after the user confirms.
- Branches and commit messages carry the key: `IDN-12-login-endpoint`, `PLAT-3: move postgres to infra/compose.yaml`.
- The user moves tickets into sprints and starts/closes sprints; Jira UI configuration is done by the user, Claude verifies via API.

**Definition of Ready** (may move to `Ready For Development` / into a sprint):
- Has Background + Why — anyone can tell what problem it solves.
- Has testable acceptance criteria.
- Dependencies known and linked ("blocks"), and not blocked by unfinished work in the same sprint unless planned.
- Small enough to finish within one sprint (otherwise split it).
- Open decisions it depends on are made (or it's explicitly a spike to make them).

**Definition of Done** (may move to `Done`):
- All acceptance criteria met and verified (run it, not just "it compiles").
- Reviewed (`/code-review` or the user) and merged/committed with the ticket key in the message.
- Docs updated per the Write triggers above (CLAUDE.md, README, module docs, ADR if a decision was made).
- No secrets committed; nothing left that only works on one machine.
- The user confirmed.

---
---

## Project Status

Multi-vendor e-commerce platform. **Learning project** — phases tackled one at a time to practice raw SQL and backend architecture.

**Where we left off (2026-09-27)**: resume here. Live ticket status is in Jira (check it first); this is the handoff summary.

**Direction change (2026-09-26): polyrepo.** The project moves out of this Learn-folder monorepo into separate repos in the GitHub org `e-commerce-learn` (`architecture`, `infra-postgres`, `backend-identity`). Tracked as epics PLAT-8 (platform side) and IDN-5 (identity side). This `projects/ecommerce` folder gets deleted after the migration (PLAT-14, last step).

| # | Next step | Ticket | Notes |
|---|---|---|---|
| ✅ | PLAT-1, PLAT-2, PLAT-7 Done and merged into `ecommerce_api` (`2d2db66`, `4575d6b`, `66afcc3`) | | Commit style: `Type(KEY-N): message`, e.g. `Chore(PLAT-1): …`. Always run compose from the project root. |
| 1 | Write ADR 0011: polyrepo in the `e-commerce-learn` org (draft locally for review) | PLAT-10 (PLAT Sprint 2) | Unblocked. Everything in the migration builds on it. |
| 2 | Migrate the repos: `architecture` (PLAT-11, sub-tasks PLAT-15–19), `infra-postgres` (PLAT-12, PLAT-20–23), `backend-identity` (IDN-6, IDN-7–10) | PLAT-11 (PLAT Sprint 2), IDN-6 (IDN Sprint 2), PLAT-12 (backlog) | Fresh start with no history import. Squash merge only. Global ADRs go in `architecture/adr/`, local ADRs in each repo's `docs/adr/`. |
| 3 | Decisions (each one becomes an ADR): service boundaries (IDN-11), DB access model (PLAT-24, blocks PLAT-3), migrations approach (PLAT-25, blocks IDN-2), authN (IDN-12), authZ (IDN-13), API conventions (PLAT-26), gateway (PLAT-27), observability (PLAT-28) | | IDN-11, PLAT-24, PLAT-25 come first because they unblock build work |
| 4 | Build work: PLAT-3 init script, IDN-2 auth schema (user writes both), IDN-3 Dockerfile + compose fragment, IDN-4 per-repo docs structure | | Blocked by the decisions above; IDN-2/3/4 are in the backlog on purpose |
| 5 | Decide local dev across repos (PLAT-13), then delete this folder (PLAT-14) | | PLAT-14 goes last |

Sprints are **1 week**; the user has **~5–6 hours/week**, so size sprints to that. Sprint 1 (both teams) was closed early on 2026-09-27 because the polyrepo decision made its goals obsolete; PLAT-3 went back to the backlog (blocked by PLAT-24).

| Sprint | Dates | Goal | Contents |
|---|---|---|---|
| PLAT Sprint 2 | Sep 27 → Oct 4 | The polyrepo decision is recorded and the architecture repo is live as the home for global docs. | PLAT-10, PLAT-11 (PLAT-15–19) |
| IDN Sprint 2 | Sep 27 → Oct 4 | The backend-identity repo exists, runs, and connects to auth_db | IDN-6 (IDN-7–10) |

Order across teams: PLAT-19 (`services.md`) before IDN-10 (adds a row to it). Postgres runs as `ecommerce-postgres-1` on volume `ecommerce_api_pgdata` (`auth_db` + `auth_service` intact).

**History (2026-08-08):** Full reset, twice over. First pass wiped all source code but kept docs (see Decisions). Same day, the user deleted every remaining doc too (`core.md`, `core.tech.md`, `auth.md`, `auth.tech.md`, `categories.md`, `categories.tech.md`, `users.md`, `users.tech.md`, `roadmap.md`, `errors.md`) — a deliberate choice, not an accident. **Only this `CLAUDE.md` and `README.md` exist right now.** `src/` is empty. The Reading Guide and Module Doc Links below describe the intended structure for when docs get recreated — none of those files currently exist, so don't try to read or reference them until they're written fresh.

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
- **Project root is `Learn-folder/projects/ecommerce/` (flattened 2026-09-25)** — previously `projects/e_commerce_sql/ecommerce_api/`; the outer `e_commerce_sql/` wrapper held nothing else and was removed, along with nested per-folder `.idea/` dirs (open the IDE at the project root only). Compose volume name pinned to `ecommerce_api_pgdata` (now in `infra/compose.yaml`) so the existing Postgres data survives the rename. The git branch keeps its `ecommerce_api` name.
- Docker Desktop installed and confirmed running (`docker ps` works)
- DataGrip installed (chosen over pgAdmin — user already uses DataGrip at work, direct skill transfer)
- PostgreSQL runs via **Docker Compose**, not Homebrew/Postgres.app — decided so it scales cleanly once Redis/RabbitMQ/Meilisearch join later (see Tech Stack)
- `docker-compose.yml` **created** (2026-08-08) — single `postgres:16` service, `services:`/`environment:`/`ports: "5432:5432"`/`volumes:` for persistence, credentials via `.env` (gitignored) with `.env.example` checked in. Written by Claude at the user's explicit request, after the user chose a chat-based concept primer over the self-write exercise. **Split 2026-09-26 (PLAT-2):** Postgres now lives in `infra/compose.yaml` with credentials in `infra/.env` / `infra/.env.example`; the root `compose.yaml` only `include:`s it ([ADR 0008](docs/adr/0008-multi-team-ownership-and-compose-layout.md)). Run all compose commands from the project root. Resolved config verified identical before/after; container, volume, `auth_db` and `auth_service` unchanged.
- **Still not created:** any `DatabaseModule`/`DatabaseService`, `schema.sql`. **Do not write these, or any DB layer code, unless explicitly asked** — same constraint as the Decisions entry below.
- **Old single-app NestJS scaffold removed (2026-08-08)** — the root-level `package.json`/`node_modules`/`tsconfig.json`/`tsconfig.build.json`/`nest-cli.json`/`eslint.config.mjs`/`.prettierrc`/empty `src/` were leftover from the pre-microservices monolith plan and no longer fit the `backend/<service>/` structure (see [ADR 0004](docs/adr/0004-microservices-from-phase-1.md)). Deleted, recoverable via git history if ever needed. `backend/` created at the repo root; each service gets its own independent scaffold inside it, starting with `backend/auth/`.

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
- **No shared code between services** — no `libs/` folder, categorically. Each service (`backend/<name>/`) has its own DTOs, interceptors, `ApiResponse` wrapper rather than importing shared internal packages. Deliberate — see [ADR 0004](docs/adr/0004-microservices-from-phase-1.md). (Auth is not part of this: JWT verification happens once, centrally, at the Gateway — it's not per-service code at all, so there's nothing to duplicate or share for that piece.)
- **Module DB isolation, technically enforced** — one Postgres container, one database per service (e.g. `auth_db`, `users_db`), each with its own dedicated role granted `CONNECT` only on its own database (public `CONNECT` revoked). Postgres connections are scoped to exactly one database with no cross-database query syntax available by default — so cross-service table access is blocked structurally and by permissions, not just by convention

---

### Database Files & Schema Management

Pending rebuild — connection config, schema file location, and dev/test database strategy are being redesigned against PostgreSQL by the user directly. See [ADR 0002](docs/adr/0002-reset-sqlite-to-postgres.md). Update this section once decided.

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
- Decisions section at the bottom — one index row per ADR; full text lives in `docs/adr/`

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

Full records live in **[`docs/adr/`](docs/adr/README.md)** (context, alternatives, consequences). This index holds the rule Claude must follow for each. New decision → new ADR file + index row here + row in `docs/adr/README.md`. Never edit an accepted ADR; override it with a new one and add a note to the old one pointing there.

| ADR | Decision | Rule for Claude |
|---|---|---|
| [0001](docs/adr/0001-no-orm.md) | Raw SQL only, no ORM | Never suggest an ORM or query builder, regardless of complexity. |
| [0002](docs/adr/0002-reset-sqlite-to-postgres.md) | 2026-08-08 reset: rebuild on PostgreSQL | Don't pre-write DB layer code (`DatabaseModule`/`DatabaseService`, `schema.sql`, DB setup) unless explicitly asked — the user writes it. |
| [0003](docs/adr/0003-restart-docs-from-zero.md) | All docs deleted, restarted with the code | Never reconstruct deleted docs from memory/git; write fresh with the user. |
| [0004](docs/adr/0004-microservices-from-phase-1.md) | Microservices from Phase 1, independent-projects monorepo (monorepo part overridden by 0011) | Each service standalone (own `package.json`, `Dockerfile`); zero shared code, no `libs/`; no Consul; JWT verified only at the gateway; one DB + role per service. |
| [0005](docs/adr/0005-folder-layout.md) | Folder layout `backend/` `frontend/` `infra/` `docs/` | Create folders only when their work starts. **Overridden by 0011 for the new repos** — use repo prefixes + local group folders instead. |
| [0006](docs/adr/0006-frontends-crm-and-storefront.md) | Angular CRM + low-priority storefront | Don't start the CRM before Categories, Inventory and Customer Profiles are done; frontends call only the gateway. |
| [0007](docs/adr/0007-naming-snake-case-db-camel-case-api.md) | `snake_case` DB, `camelCase` API | Map in the service layer; never return raw column names. |
| [0008](docs/adr/0008-multi-team-ownership-and-compose-layout.md) | Simulated multi-team ownership; compose fragments + root `include:` | Frame infra choices by owning team. Each service/infra owns its compose fragment + `.env`; root `compose.yaml` only `include:`s; compose is dev/CI only. **Root `include:` overridden by 0011 for the new repos** (local dev across repos: PLAT-13). |
| [0009](docs/adr/0009-jira-team-spaces.md) | Jira: one company-managed space per team, shared workflow | Follow **For Claude → Task management**. |
| [0010](docs/adr/0010-record-decisions-as-adrs.md) | ADRs, DoR/DoD, initiative labels | Record decisions as ADRs; apply DoR/DoD; label initiative tickets `init-<name>`. |
| [0011](docs/adr/0011-polyrepo-e-commerce-learn-org.md) | Polyrepo in the `e-commerce-learn` org (overrides 0004 monorepo part, all of 0005, 0008 root `include:`) | Repos named `architecture` / `infra-<tool>` / `backend-<service>` / `frontend-<app>`, cloned to `~/Desktop/Code/e-commerce-learn/<group>/<repo>`; squash merge only; global ADRs in `architecture/adr/`, local in `<repo>/docs/adr/`, local can't override global. Local dev across repos is still open (PLAT-13). |

---
---

## Planned

### Architecture / Docs

- Convert Key Patterns bullet list to a table (violates own "tables over bullet lists" rule)
- Create `src/docs/testing.md` — testing strategy, setup, spec patterns, example
- Create `src/docs/permissions.md` — permissions file structure, naming convention, how to add a new permission
- When `roadmap.md` is recreated: watch for a stock reservation timing contradiction between Inventory and Cart & Orders phases (checkout-time vs cart-add-time reservation) — decide and align both when writing that scope
- **Module Docs section is stale post-MS decision** — Doc Locations table, Reading Guide, and Module Doc Links all assume `src/modules/<name>/docs/...`; needs updating to `backend/<service>/docs/...` under the microservices structure. Also: `core.md`/`core.tech.md` was meant to document shared guards/interceptors/filters, but "no shared code between services" means there's no shared core anymore — each service needs its own local equivalent instead of one shared core doc. Handle this sweep when Phase 1 docs are actually created, not before
