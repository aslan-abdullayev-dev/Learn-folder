# 🔐 Auth — Technical

Business reference: [auth.md](./auth.md)

---
---

## Technical

### Endpoints

| Method | Path | Access |
|---|---|---|
| `POST` | `/auth/login` | Public |
| `POST` | `/auth/update-access-token` | Public |

Both use `@IsPublic()` — the global `JwtAuthGuard` skips them entirely. See [core.tech.md](../../core/docs/core.tech.md) for guard and decorator internals.

---

### Service Dependency

`AuthController` injects both `AuthService` (for login) and `TokenService` (for token refresh) directly.

```mermaid
flowchart TD
    AC[AuthController]
    AC -->|login| AS[AuthService]
    AC -->|updateAccessToken| TS[TokenService]
    AS -->|findUserForLogin| US[UsersService]
    AS -->|validateUserStatus| UVS[UserValidationService]
    AS -->|issueTokenPair| TS
    TS -->|findUserForLogin on refresh| US
    TS -->|DB operations| DB[(refresh_tokens)]
    US -->|DB operations| UDB[(users)]
```

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

### Login Flow (detailed)

```mermaid
sequenceDiagram
    participant AC as AuthController
    participant AS as AuthService
    participant US as UsersService
    participant UVS as UserValidationService
    participant TS as TokenService
    participant DB as Database

    AC->>AS: login(email, password, userAgent)
    AS->>US: findUserForLogin(email.toLowerCase())
    US->>DB: SELECT u.id, u.email, u.password_hash, u.status,\nGROUP_CONCAT(p.name) AS permissions\nJOIN user_roles → roles → permissions
    DB-->>US: RawUserWithPassword
    US-->>AS: UserWithPassword { id, email, password_hash, status, permissions[] }

    alt user undefined
        AS-->>AC: throw UnauthorizedException Invalid credentials
    end

    AS->>AS: bcrypt.compare(password, user.password_hash)
    alt no match
        AS-->>AC: throw UnauthorizedException Invalid credentials
    end

    AS->>UVS: validateUserStatus(user.status)
    alt blocked status
        UVS-->>AC: throw ForbiddenException or NotFoundException
    end

    AS->>TS: issueTokenPair(user, userAgent)
    TS->>TS: generateAccessToken — jwtService.sign(payload, expiresIn)
    TS->>TS: generateRefreshToken — uuidv4()
    TS->>DB: INSERT refresh_tokens (id, user_id, token, expires_at, device_type, user_agent)
    TS-->>AS: { accessToken, refreshToken }
    AS-->>AC: new ApiResponse('User logged in successfully', tokens)
```

---

### Token Refresh Flow (detailed)

```mermaid
sequenceDiagram
    participant AC as AuthController
    participant TS as TokenService
    participant US as UsersService
    participant DB as Database

    AC->>TS: updateAccessToken(refreshToken, userAgent)
    TS->>DB: SELECT rt.token, rt.is_used, rt.expires_at, rt.user_id,\nu.email, u.status\nFROM refresh_tokens rt JOIN users u\nWHERE rt.token = ? AND u.is_deleted = 0
    DB-->>TS: record or undefined

    alt record undefined
        TS-->>AC: throw UnauthorizedException UNAUTHORIZED
    end

    alt record.is_used = 1
        TS->>DB: UPDATE refresh_tokens SET is_used = 1 WHERE user_id = ?
        TS-->>AC: throw UnauthorizedException UNAUTHORIZED
    end

    alt expires_at < now
        TS-->>AC: throw UnauthorizedException TOKEN_EXPIRED
    end

    TS->>US: findUserForLogin(record.email) — re-fetch fresh permissions
    TS->>DB: UPDATE refresh_tokens SET is_used = 1 WHERE token = ?
    TS->>TS: issueTokenPair(user, userAgent)
    TS->>DB: INSERT new refresh_tokens row
    TS-->>AC: new ApiResponse('Token refreshed successfully', tokens)
```

---

### Access Token

**Format:** JWT signed with `JWT_SECRET`.
**Expiry:** `ACCESS_TOKEN_EXPIRY` in `token.constants.ts`

**Payload:**
```typescript
{
  sub: string           // user id
  email: string
  status: string
  permissions: string[] // e.g. ['users:create', 'categories:read']
}
```

---

### Refresh Token

**Format:** Plain UUID (not a JWT).
**Expiry:** `REFRESH_TOKEN_EXPIRY_MS` in `token.constants.ts`

---

### Examples

#### `POST /auth/login`

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "secret123"
}
```

**200 — success:**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**401 — wrong credentials:**
```json
{
  "success": false,
  "message": "Invalid credentials",
  "data": null
}
```

**403 — blocked account:**
```json
{
  "success": false,
  "message": "Account has been suspended. Please contact support",
  "data": null
}
```

---

#### `POST /auth/update-access-token`

**Request:**
```json
{
  "refreshToken": "550e8400-e29b-41d4-a716-446655440000"
}
```

**200 — success:**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "7c9e6679-7425-40de-944b-e07fc1f90ae7"
  }
}
```

**401 — token reused or not found:**
```json
{
  "success": false,
  "message": "UNAUTHORIZED",
  "data": null
}
```

**401 — token expired:**
```json
{
  "success": false,
  "message": "TOKEN_EXPIRED",
  "data": null
}
```

---

### Database

```mermaid
erDiagram
    users {
        TEXT id PK
        TEXT email
        TEXT password_hash
        TEXT status
        INTEGER is_deleted
        TEXT created_by FK
        TEXT created_at
        TEXT updated_at
    }
    refresh_tokens {
        TEXT id PK
        TEXT user_id FK
        TEXT token
        INTEGER is_used
        TEXT expires_at
        TEXT device_type
        TEXT user_agent
        TEXT created_at
    }
    users ||--o{ refresh_tokens : "has many"
```

---

### Environment Variables

| Variable | Notes |
|---|---|
| `JWT_SECRET` | Required. App throws on startup if missing. |

---

### File Structure

```
src/modules/auth/
├── auth.controller.ts          injects AuthService + TokenService
├── auth.module.ts
├── auth.service.ts             login flow
├── auth.service.spec.ts
├── jwt.strategy.ts             JwtPayload type lives here
│
├── dto/
│   ├── login.dto.ts
│   └── update-access-token.dto.ts
│
├── modules/token/
│   ├── token.service.ts        updateAccessToken + issueTokenPair
│   ├── token.service.spec.ts
│   └── token.constants.ts      ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY_MS
│
└── types/
    └── auth.types.ts           UserWithPassword, RawUserWithPassword
```

---

### Gotchas

**`device_type` Is Heuristic** — Derived from regex on user-agent string — not authoritative.

**`AuthController` Bypasses `AuthService` for Token Refresh** — `updateAccessToken` is called directly on `TokenService`, not through `AuthService`. `AuthService` only handles login.

**`deleted` Status Throws 404 Not 403** — `UserValidationService` throws `NotFoundException` for `deleted` status and `ForbiddenException` for all other blocked statuses. See business doc.

---
---

## Planned

### Technical

- `POST /auth/logout` — mark all of the user's refresh tokens as `is_used = 1`
- Add cross-module dependency section — document the `UsersService.findUserForLogin` boundary (called by both `AuthService` at login and `TokenService` at refresh)
