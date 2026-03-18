# ecommerce-api — Claude Instructions

> **For Claude:** Always read this file at the start of every session before doing any work in this repo. Update it whenever project state changes (new phase started, items completed, new rules added).
> When the user says "memorize" or "remember" anything, ALWAYS update both the memory file AND this CLAUDE.md with the content — never just one.

## Project Overview

Multi-vendor e-commerce platform built with NestJS + SQLite (Node's built-in `DatabaseSync` API).
This is a **learning project** — phases are tackled one at a time to practice raw SQL and backend architecture.

---

## Tech Stack

- **Framework:** NestJS 11, TypeScript
- **Database:** SQLite via Node's built-in `DatabaseSync` (no ORM — raw SQL prepared statements only)
- **Auth:** passport-jwt, bcrypt, uuid
- **Validation:** class-validator
- **Port:** 8181 (default)

**Never suggest adding TypeORM, Prisma, or any ORM.** Raw SQL is intentional for SQL practice.

---

## Key Patterns & Conventions

- **No ORM** — all queries use raw SQL prepared statements via `DatabaseSync`
- **Closure table** for hierarchical categories (`category_ancestors`)
- **Soft deletes** via `is_deleted` flag — never hard delete
- **Global guards:** `JwtAuthGuard` + `PermissionsGuard` applied via `APP_GUARD`
- `@IsPublic()` decorator to bypass JWT; `@RequirePermission()` for permission checks
- **ResponseInterceptor** wraps all responses: `ApiResponse<T> { message, data }`
- **Separate test DB** (`DB_NAME=test_db`) — schema created inline in spec files
- Permissions seeded via `npm run seed:permissions` (scans `*.permissions.ts` files)
- Permission naming: `module:action` (e.g. `categories:create`)

**Database files:** `database/db` (prod), `database/test_db` (test)

---

## Module Documentation Rule

Every NestJS module **must** have a `documentation/` folder inside its module directory:

```
src/modules/<name>/documentation/<name>.md
```

- This file is the source of truth for that module: endpoints, DB schema, business rules, deferred items
- Update it immediately when requirements change or new rules are added
- Format: H1/H2 headers, bold key terms, horizontal rules between sections, deferred items section

---

## Implementation Status

### Phase 1 — Auth & Users: COMPLETE
- JWT auth with refresh tokens + token reuse detection
- User registration (public) + staff creation (admin-gated)
- Role/permission system with superAdmin seed script
- Global JWT guard, permissions guard, response interceptor, error filter
- Comprehensive tests for auth, token, and users

### Phase 2 — Categories: IN PROGRESS
- Implemented: basic CREATE (root only), findAll, findById, closure table (self-reference only)
- Design spec: `categories-phase-reference.md`

**Deferred for after Inventory/Products:**
- Slug conflict handling for soft-deleted categories (`{slug}--deleted-{id}`)
- `PATCH /categories/:id` (update + slug redirects to `category_slug_redirects`)
- `DELETE /categories/:id` (three-step guard: products check → children check → soft delete)
- Re-parenting: `PATCH /categories/:id/parent` (closure table surgery)
- `category_slug_redirects` table usage
- Test coverage for categories module
- Making `GET /categories` public (currently requires `categories:read` permission)

### Future Phases (not started)
Inventory → Customer Profiles → Cart & Orders → Payments → Shipping → Reviews → Notifications → Audit Logs → Reporting