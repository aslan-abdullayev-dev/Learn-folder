---
name: Microservices architecture goal
description: The ecommerce-api will eventually migrate to a microservices structure
type: project
---

The long-term architecture goal is full microservices — each major module becomes a separate deployable NestJS service communicating via RabbitMQ.

**Why:** User wants to learn microservices architecture as part of this project. The monolith is the starting point, not the end state.

**How to apply:** When the monolith is sufficiently stable (after Cart & Orders or Payments phase is complete), remind the user it is time to plan the microservices migration. In the meantime, keep module boundaries clean and avoid cross-module direct imports — this makes the eventual split easier. RabbitMQ (already planned) is the right transport layer for inter-service communication.

**Architecture when splitting:**
- Monorepo using NestJS built-in monorepo support
- `apps/` — one folder per service (gateway, auth, orders, inventory, notifications, etc.)
- `libs/` — shared code: guards, decorators, interceptors, ApiResponse, event type definitions
- API gateway routes all incoming requests to the correct service
- Modules never import another module's service — cross-module communication via RabbitMQ events only
- `request.user` (populated by JWT guard) is how any service knows who the current user is — never inject UsersService for this
