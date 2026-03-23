# 🏷️ Categories — Technical

Business reference: [categories.md](./categories.md)

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

### Create Category Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant CS as CategoriesService
    participant DB as Database

    C->>CS: POST /categories { name, slug, ... }
    CS->>DB: SELECT id FROM categories WHERE slug = ?
    note right of DB: No is_deleted filter —\nslug is permanently occupied\neven after soft delete

    alt slug exists
        CS-->>C: 409 Slug already in use
    end

    CS->>CS: uuidv4() → id
    CS->>DB: INSERT INTO categories\n(id, name, slug, description, image_url,\nis_active=0, is_deleted=0, sort_order, created_at)
    CS->>DB: INSERT INTO category_ancestors\n(ancestor_id=id, descendant_id=id, depth=0)
    CS->>DB: SELECT category WHERE id = ?
    CS-->>C: 201 category data
```

---

### Re-Parent Logic *(planned)*

When moving category **M** to a new parent **P**:

```mermaid
flowchart TD
    A([PATCH /categories/:id\nparentId provided]) --> B[Validate new parent\nper eligibility rules]
    B --> C{Category active?}
    C -- Yes --> D{New parent\nis_active=1\nAND is_deleted=0?}
    C -- No --> E{New parent\nis_deleted=0?}
    D -- No --> F[400 Invalid parent]
    E -- No --> F
    D -- Yes --> G[Begin transaction]
    E -- Yes --> G

    G --> H["DELETE FROM category_ancestors\nWHERE descendant IN\n(M + all M's descendants)\nAND ancestor NOT IN M's subtree"]
    H --> I["INSERT INTO category_ancestors\nfor M and all descendants\nthrough P's full ancestor chain"]
    I --> J[Commit transaction]
    J --> K([Re-parent complete])
```

Internal subtree rows are untouched — depth is relative between two nodes, not absolute from root.

---

### Delete Category Flow *(deferred)*

```mermaid
sequenceDiagram
    participant C as Client
    participant CS as CategoriesService
    participant DB as Database

    C->>CS: DELETE /categories/:id { childAction? }

    CS->>DB: COUNT products WHERE category_id = ? AND is_deleted = 0
    alt products exist
        CS-->>C: 409 Reassign products first
    end

    CS->>DB: SELECT descendant_id FROM category_ancestors\nWHERE ancestor_id = ? AND depth > 0
    alt descendants exist AND no childAction
        CS-->>C: 409 Provide childAction
    end

    alt childAction = deactivate
        CS->>DB: UPDATE categories SET is_active = 0\nWHERE id IN descendants
    else childAction = delete
        CS->>DB: UPDATE categories SET is_deleted = 1\nWHERE id IN descendants
    end

    CS->>DB: Find nearest active ancestor for redirect target
    CS->>DB: INSERT INTO category_slug_redirects (old_slug, category_id)
    CS->>DB: UPDATE categories SET is_deleted = 1, updated_at = now WHERE id = ?
    CS-->>C: 200 deleted
```

---

### Database Schema

```mermaid
erDiagram
    categories {
        TEXT id PK
        TEXT name
        TEXT slug
        TEXT description
        TEXT image_url
        INTEGER is_active
        INTEGER is_deleted
        INTEGER sort_order
        TEXT created_at
        TEXT updated_at
    }
    category_ancestors {
        TEXT ancestor_id PK "FK → categories"
        TEXT descendant_id PK "FK → categories"
        INTEGER depth
    }
    category_slug_redirects {
        TEXT old_slug PK
        TEXT category_id FK
        TEXT created_at
    }
    categories ||--o{ category_ancestors : "as ancestor"
    categories ||--o{ category_ancestors : "as descendant"
    categories ||--o{ category_slug_redirects : "redirects to"
```

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

#### `category_ancestors` — Closure Table

| Column | Type | Notes |
|---|---|---|
| `ancestor_id` | TEXT | FK → categories(id) |
| `descendant_id` | TEXT | FK → categories(id) |
| `depth` | INTEGER | `0` = self · `1` = direct parent · etc. |

PK on `(ancestor_id, descendant_id)`. Every node has a self-reference row at depth 0.
Depth is **relative between two nodes** — not absolute from root. Re-parenting never needs to update depths within the moved subtree.

#### `category_slug_redirects` *(table exists, service logic deferred)*

| Column | Type | Notes |
|---|---|---|
| `old_slug` | TEXT | PK |
| `category_id` | TEXT | FK — redirect target |
| `created_at` | TEXT | ISO timestamp |

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
│   ├── update-category.dto.ts      + isActive, parentId
│   └── delete-category.dto.ts      childAction
│
└── permissions/
    └── categories.permissions.ts   CREATE, READ, UPDATE, DELETE
```

---

### Gotchas

**Slug Is Permanently Occupied** — `ensureSlugIsUnique` queries with no `is_deleted` filter. Even soft-deleted slugs block reuse. Planned: rename to `{slug}--deleted-{id}` on delete to free the slug.

**No Cascade on `category_ancestors`** — No `ON DELETE CASCADE` — categories are soft deleted, FKs always stay valid. Ancestor rows are cleaned up in code only during re-parent.

**`sort_order` Is Sibling-Scoped** — Order siblings by `sort_order ASC` among categories with the same direct parent (`depth = 1` from same ancestor).

---
---

## Planned

### Technical

- Implement `UpdateCategoryDto` with `isActive` and `parentId`
- Re-parent logic in service (closure table surgery, single transaction)
- Slug conflict handling for soft-deleted categories (`{slug}--deleted-{id}`)
- `category_slug_redirects` table writes on slug change and soft delete
- `DELETE /categories/:id` three-step guard
- `PATCH /categories/:id/parent` dedicated re-parent endpoint
- Test coverage for all categories endpoints
- Make `GET /categories` public (currently requires `categories:read` permission)
