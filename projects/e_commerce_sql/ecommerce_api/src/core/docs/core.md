# ⚙️ Core — Business

Technical reference: [core.tech.md](./core.tech.md)

---
---

## Business

Cross-cutting infrastructure applied globally to every request in the application.
Nothing in `core/` is feature-specific — it defines how all requests are protected, processed, and responded to.

---

### What It Does

Every HTTP request — regardless of which module handles it — passes through the same pipeline before any business logic runs and after it returns:

- **Authentication** — is there a valid, non-expired JWT? If not, reject before the handler ever runs.
- **Authorisation** — does this user hold the permission this route requires? If not, reject with 403.
- **Response shaping** — wrap every success response in a consistent envelope so the CRM and any other consumer never need to branch on response shape.
- **Error formatting** — catch every thrown exception and format it with the same envelope, so errors look the same as successes structurally.

The result: module code never needs to think about auth, tokens, or response formatting. It just runs its logic and returns data.

---

### Why Global Guards Matter

Guards are applied at the framework level via `APP_GUARD` — not per-controller. This means:

- **Secure by default** — a new endpoint is protected the moment it's added. No opt-in required.
- **Cannot be forgotten** — there is no way to accidentally ship an unprotected endpoint. A route must explicitly opt out with `@IsPublic()`.
- **Permission-scoped** — routes that need a specific permission declare it with `@RequirePermission('module:action')`. No permission declared = any authenticated user can call it.

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
