---
name: Frontend plan
description: CRM will be Angular consuming ecommerce-api directly; customer-facing frontend is out of scope for now
type: project
---

The CRM frontend will be built in **Angular** — it consumes `ecommerce-api` directly. No separate CRM backend.

`ecommerce-api` serves all consumers:
- CRM → Angular frontend for internal operators
- Customer-facing ecommerce frontend → not planned

**Why:** User has prior Angular experience. CRM is the first real consumer of the API. Customer-facing frontend deferred until the API is more complete.

**How to apply:** When CRM work begins, it is an Angular project. Never suggest NextJS or a separate CRM NestJS backend. Keep the API frontend-friendly — clean response shapes, proper HTTP codes, pagination-ready endpoints.
