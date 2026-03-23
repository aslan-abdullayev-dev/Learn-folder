---
name: Module documentation style
description: How module MD files are structured — two-file split (business + technical), section separation, Planned sections, Mermaid diagrams
type: feedback
---

Every module has **two doc files** in `src/modules/<name>/docs/`:

**Business doc** (`<name>.md`):
```
# Module Name (with emoji) — Business
Technical reference: [<name>.tech.md](./<name>.tech.md)
---
---
## Business
### What It Does
### [business rules, statuses, decisions, workflow]
---
---
## Planned
### Business   ← upcoming features from operator/user perspective
```

**Technical doc** (`<name>.tech.md`):
```
# Module Name (with emoji) — Technical
Business reference: [<name>.md](./<name>.md)
---
---
## Technical
### Endpoints
### DTOs
### Database Schema
### Service Behaviour
### File Structure
### Gotchas
---
---
## Planned
### Technical  ← deferred implementation items
```

This structure applies to **all** docs — including `src/core/docs/core.md` and `src/core/docs/core.tech.md`.

**Why:** Business audience (what/why) and technical audience (how) should be in separate files. Diagrams (Mermaid) belong in both files where a flow, state machine, or relationship is clearer visually than prose.

**How to apply:** Any time a new module doc is created or updated, maintain this split. Never mix business decisions into the Technical section or implementation details into the Business section. Update Mermaid diagrams whenever the code or rules they represent change.

## CLAUDE.md role in the doc hierarchy

- `CLAUDE.md` = project-wide context for Claude: conventions, phase status, cross-cutting rules
- It must contain **links** to each module's doc pair via the Module Doc Links table — never duplicate content
- Module docs are the source of truth; CLAUDE.md just points to them
- `README.md` = operational only: install, run, env vars — no architecture or business rules

## CLAUDE.md writing style

1. **Contents list at the top** — every section linked
2. **Five sections in order:** For Claude → Project Status → Architecture → Module Docs → Decisions
3. **Double `---`** between every top-level section
4. **Tables over bullet lists** wherever data is tabular
5. **Decisions section at the bottom** — one short named entry per decision

## When the user says "memorize"

Write to BOTH: memory file AND CLAUDE.md (in the most relevant of the five sections). The five sections and what goes in each:

- **For Claude** — rules about how Claude should behave in this repo
- **Project Status** — phase changes, completions, what's in progress
- **Architecture** — tech choices, patterns, conventions
- **Module Docs** — doc structure rules, links, lifecycle rules
- **Decisions** — judgment calls, strategic choices, constraints

## Where to write a decision

**Cross-module decisions** → write in the module that owns the action; add a short reference in the affected module.

**Module boundary decisions** → CLAUDE.md Decisions section (system-level contract).

**Global conventions** → CLAUDE.md Architecture → Key Patterns.
