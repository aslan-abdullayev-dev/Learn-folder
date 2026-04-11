# Memory Index

## Project
- [CRM project start timing](./project_crm_timing.md) — Don't start CRM until Categories, Inventory/Products, and Customer Profiles are done in ecommerce-api
- [No frontend planned](./project_no_frontend.md) — No NextJS or UI frontend for ecommerce-api; CRM is the intended API consumer instead
- [Microservices architecture goal](./project_microservices_goal.md) — Monolith is the starting point; goal is full microservices via RabbitMQ. Remind user to plan migration after Cart & Orders or Payments phase.

## Feedback
- [Doc ownership — core and module docs](./feedback_doc_ownership.md) — Each folder's documentation/*.md owns its content; CLAUDE.md only links, never holds implementation details
- [Module documentation style](./feedback_module_doc_style.md) — Business / Technical / Planned sections with double `---` as major separator; also covers CLAUDE.md writing rules
- [Schema SQL and db commands](./feedback_schema_sql.md) — database/schema.sql is single source of truth for DDL; db:init for new tables, db:reset for structural changes
- [README update rule](./feedback_readme_updates.md) — Update README.md whenever operational details change (scripts, env vars, setup, run commands)
- [README purpose and lifecycle](./feedback_readme_purpose.md) — README is for external people; draws finished-product picture; future module planning lives here until the module is created, then moves to module doc
- [Planned behaviour updates](./feedback_planned_behaviour_updates.md) — Changed or new planned behaviour → update module doc if it exists, otherwise update README. Never leave decisions only in conversation.
- [Dual memory write](./feedback_dual_memory_write.md) — Always write memory files to both the real ~/.claude path AND Learn-folder/.claude/memory/ simultaneously
