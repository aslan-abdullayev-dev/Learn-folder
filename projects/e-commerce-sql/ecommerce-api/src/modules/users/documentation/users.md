# 👥 Users Module

---

## Business

### What It Does

Manages user accounts. Two creation paths: **public self-registration** and **admin-gated staff creation**.
Full CRUD with soft delete — no user is ever hard deleted from the database.

---

### User Statuses

| Status | Can Log In | Notes |
|---|---|---|
| `active` | Yes | Default on creation |
| `pending_verification` | No | Registered but not verified |
| `inactive` | No | Deactivated by admin |
| `suspended` | No | Temporarily restricted |
| `banned` | No | Permanently restricted |
| `deleted` | No | Soft deleted — invisible to all queries |

Status validation on login lives in `UserValidationService` in the **auth module**.

---

### Creation Rules

- **Email** — normalized to lowercase. Uniqueness checked against non-deleted users only — a soft-deleted email can be re-registered.
- **Password** — hashed with `bcrypt` at 10 rounds. Never stored plain, never returned by any endpoint.
- **`created_by`** — `null` for self-registered users; set to `req.user.sub` for staff created by an admin.

---

### Update Rules

Only `email` and `status` can be updated via `PATCH /users/:id`.

- Email is normalized to lowercase. Uniqueness check excludes the user being updated so they can keep their own email.
- If no valid fields are provided → `400 No fields to update`.
- `updated_at` is always set on any successful update.

---

### Soft Delete

Sets `is_deleted = 1`, `deleted_at = now`, `updated_at = now`.
All `SELECT` queries filter `WHERE is_deleted = 0` — deleted users are completely invisible via the API and cannot log in.

---
---

## Technical

### Endpoints

| Method | Path | Access |
|---|---|---|
| `POST` | `/users/register` | Public |
| `POST` | `/users/register-staff` | `users:create` |
| `GET` | `/users` | `users:read` |
| `GET` | `/users/:id` | `users:read` |
| `PATCH` | `/users/:id` | `users:update` |
| `DELETE` | `/users/:id` | `users:delete` |

---

### Shared Method

Both `POST /users/register` and `POST /users/register-staff` call the same `createUser(email, password, createdBy?)` internally.

---

### Database — `users`

| Column | Notes |
|---|---|
| `id` | UUID |
| `email` | Lowercase, unique among non-deleted |
| `password_hash` | bcrypt 10 rounds — never returned |
| `status` | See statuses above |
| `is_deleted` | `0` / `1` |
| `deleted_at` | ISO timestamp, `null` until deleted |
| `created_by` | FK → users(id), `null` for self-registered |
| `created_at` | ISO timestamp |
| `updated_at` | ISO timestamp, `null` until first update |

**Fields returned to client:** `id · email · status · created_at · updated_at`

---

### File Structure

```
src/modules/users/
├── users.controller.ts
├── users.service.ts
├── users.service.spec.ts
│
├── dto/
│   ├── register-user.dto.ts        { email, password }
│   ├── create-user.dto.ts          { email, password }
│   └── update-user.dto.ts          { email?, status? }
│
├── permissions/
│   └── users.permissions.ts        CREATE, READ, UPDATE, DELETE
│
└── validators/
    └── user-validation.service.ts  validateUserStatus
```

---

### Gotchas

**`findUserForLogin` Is Internal** — Used only by the auth module. Joins roles → permissions, returns `password_hash`. Not exposed via any controller.

**`findByEmail` Is a Shared Helper** — Used for uniqueness checks on create and update. Accepts optional `excludeId` to allow a user to keep their own email.

**No Role Assignment Endpoint** — Roles are assigned via `npm run seed:permissions` which assigns `superAdmin` to the email in `SUPER_ADMIN_EMAIL`.

---
---

## Planned

### Business

- **Role assignment via API** — currently only `superAdmin` can be seeded via script; no endpoint exists to assign roles to other users

### Technical

- `POST /users/:id/roles` or similar — endpoint to assign/remove roles from a user without relying on the seed script
