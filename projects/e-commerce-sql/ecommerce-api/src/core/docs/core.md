# ⚙️ Core — Business

Technical reference: [core.tech.md](./core.tech.md)

---
---

## Business

Cross-cutting infrastructure applied globally to every request in the application.
Nothing in `core/` is feature-specific — it defines how all requests are protected, processed, and responded to.

---

### Request Lifecycle

Every request passes through guards → handler → interceptor. Exceptions at any point go to the filter.

```mermaid
sequenceDiagram
    participant C as Client
    participant JA as JwtAuthGuard
    participant PG as PermissionsGuard
    participant H as Route Handler
    participant RI as ResponseInterceptor
    participant EF as HttpExceptionFilter

    C->>JA: HTTP Request

    alt @IsPublic() on route
        JA-->>PG: skip auth — pass through
    else valid JWT
        JA->>JA: verify token
        JA-->>PG: attach req.user
    else expired JWT
        JA->>EF: TOKEN_EXPIRED
        EF-->>C: 401 · success false
    else missing or invalid JWT
        JA->>EF: UNAUTHORIZED
        EF-->>C: 401 · success false
    end

    alt @RequirePermission() on route
        PG->>PG: req.user.permissions.includes(required)
        alt permission missing
            PG->>EF: 403 Forbidden
            EF-->>C: 403 · success false
        else permission present
            PG-->>H: pass through
        end
    else no @RequirePermission()
        PG-->>H: pass through
    end

    H->>RI: return ApiResponse
    RI-->>C: 200 · success true · message · data

    note over H,EF: Any HttpException thrown inside handler<br/>is caught by HttpExceptionFilter
```

---

### Auth Model

- Every route is protected by default — authentication and permission checks run globally
- Routes opt out of auth with `@IsPublic()`, not the other way around
- Permission requirements are declared per-route with `@RequirePermission('module:action')`
- Permissions are embedded in the JWT at login — no DB lookup per request

---

### Response Contract

All responses follow one consistent shape regardless of which module produced them:

**Success:** `{ success: true, message, data }`
**Error:** `{ success: false, message, data: null }`

Consumers never receive raw NestJS errors or unformatted exceptions.

---
---

## Planned

### Business

- **Optional auth** — future routes that serve both guests and authenticated users differently (e.g. public product listing enriched with wishlist state for logged-in users)
