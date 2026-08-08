# 🔐 Auth — Technical

Business reference: [auth.md](./auth.md)

---
---

## Technical

Implementation pending — rebuilding against PostgreSQL. Endpoint and DTO shapes below are the target design; see [auth.md](./auth.md) for the login/refresh business rules and security decisions they need to satisfy.

### Endpoints

| Method | Path | Access |
|---|---|---|
| `POST` | `/auth/login` | Public |
| `POST` | `/auth/update-access-token` | Public |

Both should bypass the global auth guard once it exists — see [core.tech.md](../../../core/docs/core.tech.md).

---

### DTOs

#### `LoginDto`

| Field | Type | Required |
|---|---|---|
| `email` | string | Yes |
| `password` | string | Yes |

#### `UpdateAccessTokenDto`

| Field | Type | Required | Notes |
|---|---|---|---|
| `refreshToken` | string | Yes | Plain UUID |

---

### Tokens

- **Access token** — JWT, short expiry, payload carries `sub`, `email`, `status`, `permissions[]`
- **Refresh token** — plain UUID (not a JWT), longer expiry, stored server-side

---

### Environment Variables

| Variable | Notes |
|---|---|
| `JWT_SECRET` | Required. App should throw on startup if missing. |

---
---

## Planned

### Technical

- `POST /auth/logout` — mark all of the user's refresh tokens as used
- Document the boundary between Auth and Users once rebuilt — the auth module needs a way to look up a user with permissions for login/refresh
