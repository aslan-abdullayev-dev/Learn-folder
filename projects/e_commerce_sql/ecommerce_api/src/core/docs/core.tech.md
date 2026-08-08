# ⚙️ Core — Technical

Business reference: [core.md](./core.md)

---
---

## Technical

Implementation pending — core infrastructure (guards, decorators, interceptors, filters) was deleted in the PostgreSQL rebuild and hasn't been rewritten yet. See [core.md](./core.md) for the request lifecycle and auth model this layer needs to implement.

Full error catalogue: [errors.md](../../docs/errors.md).

---
---

## Planned

### Technical

- `@IsOptionalAuth()` decorator — for future routes that serve both guests and logged-in users differently without requiring authentication
- Standardize error `message` to always be `string[]` — the exception filter should wrap single strings in an array so the CRM and any future consumer never needs to branch on `typeof message`
