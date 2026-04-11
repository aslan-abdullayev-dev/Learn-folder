---
name: CRM project start timing
description: When to kick off the CRM side project relative to the ecommerce-api work
type: project
---

Do not start the CRM until Categories, Inventory/Products, and Customer Profiles phases are complete in ecommerce-api.

**Why:** Those three phases build the repeatable patterns (closure table SQL, relational schema design, guards, interceptors, module docs) that make starting a new project fast and deliberate. Starting earlier risks splitting focus before the foundation feels solid. Customer Profiles in particular maps directly to CRM concepts, so finishing it first gives a natural bridge.

**How to apply:** If the user brings up the CRM before those three phases are done, remind them of this agreement and redirect to the current phase.
