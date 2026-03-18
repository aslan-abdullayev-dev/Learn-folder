# 🔐 Auth Module

---

## What It Does

Handles login and token management. Returns a **JWT access token** and a **refresh token** on login. The refresh token exchanges for a new pair without re-entering credentials.

---

## Endpoints

| Method | Path | Access |
|---|---|---|
| `POST` | `/auth/login` | Public |
| `POST` | `/auth/update-access-token` | Public |

Both use `@IsPublic()` — the global `JwtAuthGuard` skips them entirely.

---

## Login Flow

### Step 1 — Find User
Look up by email (stored and queried as lowercase).

### Step 2 — Verify Password
`bcrypt.compare(submitted, password_hash)`

### Step 3 — Check Status
`UserValidationService.validateUserStatus` — throws `401` for blocked statuses.

### Step 4 — Issue Tokens
`TokenService.issueTokenPair` generates and stores the token pair.

> **Security:** Both "email not found" and "wrong password" return the same `401 Invalid credentials` — no user enumeration.

---

## Blocked Statuses

Users with these statuses **cannot log in**:

`pending_verification` · `inactive` · `suspended` · `banned` · `deleted`

---

## Access Token

### Format
JWT signed with `JWT_SECRET`.

### Expiry
`ACCESS_TOKEN_EXPIRY` in `token.constants.ts`

### Payload
```typescript
{
  sub: string           // user id
  email: string
  status: string
  permissions: string[] // e.g. ['users:create', 'categories:read']
}
```

### How Permissions Get In
Loaded at login via a JOIN: `user_roles → roles → role_permissions → permissions`.
Embedded in the token — **no DB lookup on every request**.

> If a user's role changes, they must re-login to get the updated permissions.

---

## Refresh Token

### Format
Plain UUID (not a JWT).

### Expiry
`REFRESH_TOKEN_EXPIRY_MS` in `token.constants.ts`

### Storage
Stored in `refresh_tokens` table with `is_used`, `expires_at`, `user_agent`, `device_type`.

---

## Token Refresh Flow

```
POST /auth/update-access-token  { refreshToken }
```

### Step 1 — Look Up Token
Join with user row. If not found → `401 UNAUTHORIZED`.

### Step 2 — Reuse Detection
If `is_used = 1` → token was already used → **revoke ALL tokens for this user** → `401 UNAUTHORIZED`.

> This signals a replay attack or stolen token. Killing all sessions is intentional.

### Step 3 — Expiry Check
If `expires_at < now` → `401 TOKEN_EXPIRED`.

### Step 4 — Issue New Pair
Re-fetch user for fresh permissions. Mark old token as used. Store and return a new token pair.

---

## Guards

### JwtAuthGuard — Global

Applied to every route via `APP_GUARD`.

| Scenario | Result |
|---|---|
| Valid token | Attaches `JwtPayload` to `req.user` |
| `@IsPublic()` route | Skipped entirely |
| Expired token | `401 TOKEN_EXPIRED` |
| Invalid token | `401 UNAUTHORIZED` |

### PermissionsGuard — Global

Runs after `JwtAuthGuard`. Checks `req.user.permissions` against `@RequirePermission('x:y')`.
No decorator on a route → passes through.

---

## Decorators

### `@IsPublic()`
Route is public. `JwtAuthGuard` will not run.

### `@RequirePermission(permission)`
Declares the required permission string. Read by `PermissionsGuard`.

---

## File Structure

```
src/modules/auth/
├── auth.controller.ts
├── auth.service.ts
├── auth.service.spec.ts
├── jwt.strategy.ts                 JwtPayload type lives here
│
├── dto/
│   ├── login.dto.ts                { email, password }
│   └── update-access-token.dto.ts  { refreshToken }
│
├── modules/token/
│   ├── token.service.ts
│   ├── token.service.spec.ts
│   └── token.constants.ts          ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY_MS
│
└── types/
    └── auth.types.ts               UserWithPassword, RawUserWithPassword
```

---

## Database — `refresh_tokens`

| Column | Notes |
|---|---|
| `id` | UUID |
| `user_id` | FK → users(id) |
| `token` | UUID, UNIQUE |
| `is_used` | `0` active · `1` consumed |
| `expires_at` | ISO timestamp |
| `device_type` | `Mobile` / `Desktop` / `unknown` |
| `user_agent` | Raw string |
| `created_at` | ISO timestamp |

---

## Environment Variables

| Variable | Notes |
|---|---|
| `JWT_SECRET` | Required. App throws on startup if missing. |

---

## Gotchas

### Permissions Are Snapshotted at Login
Role changes don't take effect until the user re-logs in and gets a new token.

### No Logout Endpoint Yet
Logout = mark all user's refresh tokens as `is_used = 1`. Not implemented yet.

### `device_type` Is Heuristic
Derived from regex on user-agent — not authoritative.
