# 🏷️ Categories — Technical

Business reference: [categories.md](./categories.md)

---
---

## Technical

Implementation pending — rebuilding against PostgreSQL. Endpoint and DTO shapes below are the target design; see [categories.md](./categories.md) for the two-step creation workflow, visibility rule, and delete guards they need to satisfy.

### Endpoints

| Method | Path | Access |
|---|---|---|
| `POST` | `/categories` | `categories:create` |
| `GET` | `/categories` | `categories:read` |
| `GET` | `/categories/:id` | `categories:read` |
| `PATCH` | `/categories/:id` | `categories:update` |
| `DELETE` | `/categories/:id` | `categories:delete` |
| `PATCH` | `/categories/:id/parent` | `categories:update` |

> `GET /categories` is an **admin view** — returns all non-deleted regardless of `isActive`. Public storefront endpoint is a future addition.

---

### DTOs

#### `CreateCategoryDto`

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | Yes | Display name |
| `slug` | string | Yes | Lowercase + hyphens |
| `description` | string | No | |
| `imageUrl` | string | No | |
| `sortOrder` | number | No | Defaults to `0` |

#### `UpdateCategoryDto`

All `CreateCategoryDto` fields optional, plus:

| Field | Type | Notes |
|---|---|---|
| `isActive` | boolean | Toggle storefront visibility |
| `parentId` | string UUID | Triggers re-parent logic |

#### `DeleteCategoryDto`

| Field | Type | Notes |
|---|---|---|
| `childAction` | `'deactivate'` or `'delete'` | Required when category has children |

---
---

## Planned

### Technical

- Closure table (`category_ancestors`) design for hierarchical lookups — see CLAUDE.md Key Patterns
- Re-parent logic (closure table surgery, single transaction)
- Slug conflict handling for soft-deleted categories
- `category_slug_redirects` table and writes on slug change / soft delete
- `DELETE /categories/:id` three-step guard (products → descendants → redirect)
- Make `GET /categories` public eventually (admin-only for now)
- Test coverage for all categories endpoints
