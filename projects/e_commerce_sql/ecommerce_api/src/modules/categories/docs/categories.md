# 🏷️ Categories — Business

Technical reference: [categories.tech.md](./categories.tech.md)

---
---

## Business

### What It Does

Manages the product category tree. Categories are hierarchical (e.g. Electronics → Phones → Smartphones).

---

### Two-Step Creation Workflow

Category creation is deliberately split to prevent CRM users from accidentally publishing incomplete categories.

```mermaid
flowchart TD
    A([CRM Operator]) --> B["POST /categories\nname + slug only"]
    B --> C{Slug unique\nacross ALL rows\nincl. soft-deleted?}
    C -- No --> D[409 Slug already in use]
    C -- Yes --> E["INSERT category\nis_active = 0\nis_deleted = 0"]
    E --> F["INSERT self-reference\ncategory_ancestors\nancestor=id · descendant=id · depth=0"]
    F --> G([Draft created\nInvisible to end users])

    G --> H["PATCH /categories/:id\nAdd description, image,\nparent, sort_order"]
    H --> I["Set is_active = true\nwhen ready to publish"]
    I --> J{Full ancestor\nchain active?}
    J -- Yes --> K([Visible to end users])
    J -- No --> L([Still hidden —\nancestor not active])
```

> `isActive` and `parentId` are intentionally absent from the create DTO — they can only be set via PATCH.

---

### Visibility Rule

> A category is only visible if **it and all its ancestors** are `is_active = 1` and `is_deleted = 0`.

```mermaid
flowchart TD
    A([Category lookup]) --> B{is_deleted = 0?}
    B -- No --> C([Hidden — deleted])
    B -- Yes --> D{is_active = 1?}
    D -- No --> E([Hidden — inactive draft])
    D -- Yes --> F{Every ancestor\nis_active = 1\nAND is_deleted = 0?}
    F -- No --> G([Hidden — ancestor\nis inactive or deleted])
    F -- Yes --> H([Visible to end users])
```

Enforced at query time via the closure table. No cascade writes on the DB.

---

### Soft Delete

`is_deleted = 1` permanently hides the category. One-way — cannot be undone via the API.

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

```mermaid
flowchart TD
    A(["DELETE /categories/:id"]) --> B{Non-deleted products\nassigned to this category?}
    B -- Yes --> C[409 Reassign products first\nHard block — no bypass]
    B -- No --> D{Has descendants\nin closure table\ndepth > 0?}
    D -- No --> G[Proceed to delete]
    D -- Yes --> E{childAction\nprovided in body?}
    E -- No --> F[409 Must declare childAction]
    E -- deactivate --> H[SET is_active = 0\nfor all descendants]
    E -- delete --> I[SET is_deleted = 1\nfor all descendants]
    H --> G
    I --> G
    G --> J[Write current slug\nto category_slug_redirects]
    J --> K["SET is_deleted = 1\nupdated_at = now\n(transaction)"]
    K --> L([Done])
```

---
---

## Planned

### Business

- **`PATCH /categories/:id`** — operators can update name, description, image, sort order, assign a parent, and activate/deactivate a category
- **`DELETE /categories/:id`** — safe deletion with product reassignment guard and child cascade options
- **Public storefront endpoint** — only returns categories where the full ancestor chain is active and non-deleted
- **Slug redirects** — old slugs redirect to the current category for SEO continuity after renames or deletes
