# 👥 Users — Technical

Business reference: [users.md](./users.md)

---
---

## Technical

Implementation pending — rebuilding against PostgreSQL. Endpoint and DTO shapes below are the target design; see [users.md](./users.md) for the status lifecycle, creation, and update rules they need to satisfy.

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

### DTOs

#### `RegisterUserDto`

| Field | Type | Required | Notes |
|---|---|---|---|
| `email` | string | Yes | Must be valid email — normalized to lowercase |
| `password` | string | Yes | Min 6 characters |

#### `CreateUserDto` *(staff creation)*

Identical shape to `RegisterUserDto`. Separate class so staff creation can diverge independently.

#### `UpdateUserDto`

| Field | Type | Required | Notes |
|---|---|---|---|
| `email` | string | No | Normalized to lowercase |
| `status` | string | No | Only `active`, `inactive`, `suspended` accepted |

---
---

## Planned

### Technical

- `POST /users/:id/roles` or similar — endpoint to assign/remove roles from a user without relying on a seed script
- Expose `banned` status in `UpdateUserDto` once the business decision is made
- Role/permission seeding approach — redecide during rebuild (previously a standalone script)
