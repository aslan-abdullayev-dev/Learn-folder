# Error Reference

All error responses follow the same envelope:

```json
{
  "success": false,
  "message": "Human-readable reason",
  "data": null
}
```

`message` may be a `string` or `string[]` (class-validator validation failures return an array). Planned: standardise to always `string[]`. See [core.tech.md](../core/docs/core.tech.md).

---
---

## By Status Code

---

### 400 — Bad Request

Validation failed or the request is structurally invalid.

| Trigger | Message |
|---|---|
| DTO field fails class-validator rule | Array of validation messages e.g. `["email must be an email", "password must be longer than 5 characters"]` |
| `PATCH /users/:id` with no recognised fields | `"No fields to update"` |

---

### 401 — Unauthorized

Authentication failed or token is missing/invalid.

| Trigger | Message | Module |
|---|---|---|
| No `Authorization` header or malformed token | `"UNAUTHORIZED"` | Core / JwtAuthGuard |
| JWT signature invalid | `"UNAUTHORIZED"` | Core / JwtAuthGuard |
| JWT expired | `"TOKEN_EXPIRED"` | Core / JwtAuthGuard |
| Email not found at login | `"Invalid credentials"` | Auth |
| Password mismatch at login | `"Invalid credentials"` | Auth |
| Refresh token not found | `"UNAUTHORIZED"` | Auth / TokenService |
| Refresh token already used (replay detected — all sessions revoked) | `"UNAUTHORIZED"` | Auth / TokenService |
| Refresh token expired | `"TOKEN_EXPIRED"` | Auth / TokenService |

> `"Invalid credentials"` is intentionally identical for both "email not found" and "password mismatch" — no user enumeration.

---

### 403 — Forbidden

Authenticated but not allowed.

| Trigger | Message | Module |
|---|---|---|
| User lacks the required permission for the route | `"Forbidden resource"` | Core / PermissionsGuard |
| Login attempted with `pending_verification` status | `"Please verify your email before logging in"` | Auth |
| Login attempted with `inactive` status | `"Account is inactive. Please contact support"` | Auth |
| Login attempted with `suspended` status | `"Account has been suspended. Please contact support"` | Auth |
| Login attempted with `banned` status | `"Account has been permanently banned"` | Auth |

---

### 404 — Not Found

Resource does not exist or has been soft-deleted.

| Trigger | Message | Module |
|---|---|---|
| `GET /users/:id` — user not found or `is_deleted = 1` | `"User not found"` | Users |
| `PATCH /users/:id` — user not found or `is_deleted = 1` | `"User not found"` | Users |
| `DELETE /users/:id` — user not found or `is_deleted = 1` | `"User not found"` | Users |
| Login attempted with `deleted` status | `"Account not found"` | Auth |
| `GET /categories/:id` — category not found or `is_deleted = 1` | `"Category not found"` | Categories |

> `deleted` users return 404 (not 403) at login — intentionally obscures that the account existed.

---

### 409 — Conflict

Request is valid but conflicts with existing state.

| Trigger | Message | Module |
|---|---|---|
| `POST /users/register` — email already in use | `"Email already in use"` | Users |
| `POST /users/register-staff` — email already in use | `"Email already in use"` | Users |
| `PATCH /users/:id` — new email taken by another user | `"Email already in use"` | Users |
| `POST /categories` — slug already in use (including soft-deleted) | `"Slug already in use"` | Categories |
| `DELETE /categories/:id` — non-deleted products assigned | `"Reassign products before deleting this category"` | Categories |
| `DELETE /categories/:id` — has descendants, no `childAction` provided | `"Provide childAction to handle child categories"` | Categories |

---
---

## Notes

- All errors are caught by `HttpExceptionFilter` in `src/core/` — no module produces raw unformatted errors.
- Soft-deleted resources behave identically to non-existent resources from the client's perspective — always 404, never exposing deletion state.
- Future modules should follow the same patterns: 409 for unique constraint conflicts, 404 for missing/deleted resources, 403 for permission and status blocks.
