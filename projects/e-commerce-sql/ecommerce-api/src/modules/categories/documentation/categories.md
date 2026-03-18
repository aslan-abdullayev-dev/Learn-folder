# 🏷️ Categories Module

---

## Business

### What It Does

Manages the product category tree. Categories are hierarchical (e.g. Electronics → Phones → Smartphones).

---

### Two-Step Creation Workflow

Category creation is split into two deliberate steps to prevent CRM users from accidentally publishing incomplete categories.

**Step 1 — Create Draft (`POST /categories`)**
- Always created as `is_active = false`. Cannot be overridden via the request.
- No parent assigned at this stage.
- Only name and slug required. Content filled later.

**Step 2 — Fill and Activate (`PATCH /categories/:id`)**
- Fill in description, image, assign parent, set sort order.
- Set `is_active = true` when the category is ready.
- End users see nothing until this step is completed by an admin.

> `isActive` and `parentId` are intentionally absent from the create DTO.

---

### Visibility Rule

> A category is only visible if **it and all its ancestors** are `is_active = 1` and `is_deleted = 0`.

Enforced at query time via the closure table. No cascade writes on the DB.

---

### Soft Delete

`is_deleted = 1` permanently hides the category. One-way — cannot be undone.

---

### Product Assignment Rule

Products can be assigned to both **active** and **inactive** categories. Assignment is only blocked if the category is **deleted** (`is_deleted = 1`).

---

### Parent Eligibility

When assigning or changing a parent via `parentId`:

- If the category being moved is **active** → new parent must be `is_deleted = 0` AND `is_active = 1`
- If the category being moved is **inactive** → new parent must only be `is_deleted = 0`

This allows operators to build chains of inactive categories and activate them all at once when ready.

---

### Delete Guards

Before a category can be soft-deleted:

1. **Products check (hard block)** — if the category has non-deleted products assigned → `409`. Admin must reassign first.
2. **Children check** — if descendants exist, operator must declare `childAction: 'deactivate' | 'delete'` to proceed.

---
---

## Technical

### Endpoints

| Method | Path | Access | Status |
|---|---|---|---|
| `POST` | `/categories` | `categories:create` | Done |
| `GET` | `/categories` | `categories:read` | Done |
| `GET` | `/categories/:id` | `categories:read` | Done |
| `PATCH` | `/categories/:id` | `categories:update` | Planned |
| `DELETE` | `/categories/:id` | `categories:delete` | Deferred |
| `PATCH` | `/categories/:id/parent` | `categories:update` | Deferred |

> `GET /categories` is an **admin view** — returns all non-deleted regardless of `is_active`. Public storefront endpoint is a future addition.

---

### DTOs

#### `CreateCategoryDto`

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | Yes | Display name |
| `slug` | string | Yes | Lowercase + hyphens — validated by regex |
| `description` | string | No | |
| `imageUrl` | string | No | |
| `sortOrder` | number | No | Defaults to `0` |

#### `UpdateCategoryDto` *(planned)*

All `CreateCategoryDto` fields optional, plus:

| Field | Type | Notes |
|---|---|---|
| `isActive` | boolean | Toggle storefront visibility |
| `parentId` | string UUID | Triggers re-parent logic |

#### `DeleteCategoryDto` *(deferred)*

| Field | Type | Notes |
|---|---|---|
| `childAction` | `'deactivate'` or `'delete'` | Required when category has children |

---

### Database Schema

#### `categories`

| Column | Type | Notes |
|---|---|---|
| `id` | TEXT | UUID |
| `name` | TEXT | Display name |
| `slug` | TEXT | UNIQUE — occupied permanently once used |
| `description` | TEXT | nullable |
| `image_url` | TEXT | nullable |
| `is_active` | INTEGER | `0` / `1` — defaults to `0` on creation |
| `is_deleted` | INTEGER | `0` / `1` — one-way |
| `sort_order` | INTEGER | Sibling display order, defaults to `0` |
| `created_at` | TEXT | ISO timestamp |
| `updated_at` | TEXT | ISO timestamp, `null` until first update |

---

#### `category_ancestors` — Closure Table

| Column | Type | Notes |
|---|---|---|
| `ancestor_id` | TEXT | FK → categories(id) |
| `descendant_id` | TEXT | FK → categories(id) |
| `depth` | INTEGER | `0` = self · `1` = direct parent · etc. |

PK on `(ancestor_id, descendant_id)`.

Every node has a **self-reference row** at depth 0.
Depth is **relative between two nodes** — not absolute from root.
This means re-parenting never needs to update depths within the moved subtree.

---

#### `category_slug_redirects` *(table exists, service logic deferred)*

| Column | Type | Notes |
|---|---|---|
| `old_slug` | TEXT | PK |
| `category_id` | TEXT | FK — redirect target |
| `created_at` | TEXT | ISO timestamp |

Written on slug change or soft delete. Frontend uses it for `301` SEO redirects.

---

### Service Behaviour

#### Create Category

```
1. Validate slug uniqueness (including soft-deleted rows)
2. INSERT into categories — is_active = 0, is_deleted = 0
3. INSERT self-reference into category_ancestors: (id, id, 0)
```

Currently root-only. Parent assigned later via `PATCH /categories/:id`.

---

#### Update Category *(planned)*

**If slug changes** → write old slug to `category_slug_redirects` before updating.

**If parentId changes** → validate new parent per eligibility rules above, then run re-parent logic.

**All other fields** → simple `UPDATE` + set `updated_at`.

---

#### Re-Parent Logic

When moving category **M** to a new parent:

```
1. DELETE ancestor rows where:
      descendant = M or any of M's descendants
      AND ancestor is outside M's subtree

2. INSERT new rows connecting M and all descendants
      through the new parent's full ancestor chain

3. Internal subtree rows are untouched

4. Single transaction
```

---

#### Delete Category *(deferred)*

```
Step 1 — Products check (hardblock)
  Count non-deleted products in this category.
  If > 0 → 409. Admin must reassign first.

Step 2 — Children check
  Query for descendants with depth > 0.
  If children exist → 409 with count.
  Accept childAction: 'deactivate' | 'delete' → apply to all descendants → continue.

Step 3 — Safe delete
  1. Find nearest active ancestor (for redirect target)
  2. Write current slug to category_slug_redirects
  3. SET is_deleted = 1, updated_at = now
  4. Transaction
```

---

### Useful SQL Queries

#### Breadcrumb Path (all ancestors)

```sql
SELECT ancestor_id FROM category_ancestors
WHERE descendant_id = ?
ORDER BY depth DESC
```

#### Direct Children

```sql
SELECT c.*
FROM categories c
JOIN category_ancestors ca ON ca.descendant_id = c.id
WHERE ca.ancestor_id = ?
  AND ca.depth = 1
  AND c.is_deleted = 0
```

#### Full Subtree

```sql
SELECT descendant_id FROM category_ancestors
WHERE ancestor_id = ?
  AND depth > 0
```

#### Storefront-Visible *(future public endpoint)*

```sql
SELECT c.*
FROM categories c
WHERE c.is_active = 1
  AND c.is_deleted = 0
  AND NOT EXISTS (
    SELECT 1
    FROM category_ancestors ca
    JOIN categories anc ON ca.ancestor_id = anc.id
    WHERE ca.descendant_id = c.id
      AND ca.depth > 0
      AND (anc.is_active = 0 OR anc.is_deleted = 1)
  )
```

---

### File Structure

```
src/modules/categories/
├── categories.controller.ts
├── categories.service.ts
├── categories.module.ts
│
├── dto/
│   ├── create-category.dto.ts      name, slug, description, imageUrl, sortOrder
│   ├── update-category.dto.ts      + isActive, parentId (planned)
│   └── delete-category.dto.ts      childAction (deferred)
│
└── permissions/
    └── categories.permissions.ts   CREATE, READ, UPDATE, DELETE
```

---

### Gotchas

**Slug Is Permanently Occupied** — Even after soft delete. The soft-deleted row's slug is renamed to `{slug}--deleted-{id}` before a new category can claim it. *(not yet implemented)*

**No Cascade on `category_ancestors`** — No `ON DELETE CASCADE` — categories are soft deleted, FKs always stay valid. Ancestor rows are cleaned up in code only during re-parent.

**`sort_order` Is Sibling-Scoped** — Order siblings by `sort_order ASC` among categories with the same direct parent (`depth = 1` from same ancestor).

---
---

## Planned

### Business

- **`PATCH /categories/:id`** — operators can update name, description, image, sort order, assign a parent, and activate/deactivate a category
- **`DELETE /categories/:id`** — safe deletion with product reassignment guard and child cascade options
- **Public storefront endpoint** — only returns categories where the full ancestor chain is active and non-deleted
- **Slug redirects** — old slugs redirect to the current category for SEO continuity after renames or deletes

### Technical

- Implement `UpdateCategoryDto` with `isActive` and `parentId`
- Re-parent logic in service (closure table surgery, single transaction)
- Slug conflict handling for soft-deleted categories (`{slug}--deleted-{id}`)
- `category_slug_redirects` table writes on slug change and soft delete
- `DELETE /categories/:id` three-step guard
- `PATCH /categories/:id/parent` dedicated re-parent endpoint
- Test coverage for all categories endpoints
- Make `GET /categories` public (currently requires `categories:read` permission)
