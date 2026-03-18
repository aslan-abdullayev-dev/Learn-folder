# 👥 Users Module

---

## What It Does

Manages user accounts. Two creation paths: **public self-registration** and **admin-gated staff creation**.
Full CRUD with soft delete — no user is ever hard deleted from the database.

---

## Endpoints

| Method | Path | Access |
|---|---|---|
| `POST` | `/users/register` | Public |
| `POST` | `/users/register-staff` | `users:create` |
| `GET` | `/users` | `users:read` |
| `GET` | `/users/:id` | `users:read` |
| `PATCH` | `/users/:id` | `users:update` |
| `DELETE` | `/users/:id` | `users:delete` |

---

## User Statuses

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

## Creation Rules

### Email
Normalized to lowercase before storage. All lookups use lowercase.
Uniqueness is checked against **non-deleted users only** — a soft-deleted email can be re-registered.

### Password
Hashed with `bcrypt` at 10 rounds. Never stored plain, never returned by any endpoint.

### `created_by`
- Self-registered users → `null`
- Staff created by admin → set to `req.user.sub` (the creator's id from their JWT)

### Shared Method
Both `POST /users/register` and `POST /users/register-staff` call the same `createUser(email, password, createdBy?)` internally.

---

## Update Rules

### Allowed Fields
Only `email` and `status` can be updated via `PATCH /users/:id`.

### Email Update
Normalized to lowercase. Uniqueness checked — excludes the user being updated so they can keep their own email.

### Empty Update
If no valid fields are provided → `400 No fields to update`.

### `updated_at`
Always set on any successful update.

---

## Soft Delete

### What It Does
```
is_deleted = 1
deleted_at = now
updated_at = now
```

### Effect
All `SELECT` queries filter `WHERE is_deleted = 0` — deleted users are completely invisible via the API and cannot log in.

---

## File Structure

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

## Database — `users`

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

### Fields Returned to Client
`id · email · status · created_at · updated_at`

---

## Gotchas

### `findUserForLogin` Is Internal
Used only by the auth module. Joins roles → permissions, returns `password_hash`. Not exposed via any controller.

### `findByEmail` Is a Shared Helper
Used for uniqueness checks on create and update. Accepts optional `excludeId` to allow a user to keep their own email.

### No Role Assignment Endpoint
Roles are assigned via `npm run seed:permissions` which assigns `superAdmin` to the email in `SUPER_ADMIN_EMAIL`.
