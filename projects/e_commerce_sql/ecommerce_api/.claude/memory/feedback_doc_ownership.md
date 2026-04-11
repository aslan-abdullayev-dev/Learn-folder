---
name: Doc ownership — core and module docs
description: Each module's docs/ pair owns its content; CLAUDE.md only links, never duplicates or holds implementation details
type: feedback
---

Each module (including `src/core/`) has its own `docs/` directory containing two files:
- `<name>.md` — business rules, workflows, decisions
- `<name>.tech.md` — endpoints, DTOs, DB schema, service behaviour, file structure, gotchas

Those files are the sole owner of all implementation details for that module.

When code in a module changes, update **that module's doc**, not CLAUDE.md.

CLAUDE.md's role is to link to module docs via the Module Doc Links table — never to hold the content itself.

**Why:** User corrected Claude for putting a `core/` guard behaviour note directly into CLAUDE.md instead of updating `src/core/docs/core.tech.md`.

**How to apply:** Before writing any implementation detail (guard behaviour, decorator rules, service logic, etc.), check if a module doc exists for that folder. If it does, write there. Only update CLAUDE.md if it's a cross-cutting rule about how Claude should behave, a phase status change, or a top-level architecture/decision entry.
