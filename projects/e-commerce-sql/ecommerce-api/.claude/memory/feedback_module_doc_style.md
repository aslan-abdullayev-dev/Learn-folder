---
name: Module documentation style
description: Two-file doc split, required sections, Examples standard, Roadmap phase format, Mermaid diagrams, CLAUDE.md writing rules
type: feedback
---

Every module has **two doc files** in `src/modules/<name>/docs/`:

---

## Business doc (`<name>.md`)

```
# Module Name — Business
Technical reference: [<name>.tech.md](./<name>.tech.md)
---
---
## Business
### What It Does
  - What problem does this module solve for the product?
  - Why does it work the way it does? (key design decisions in plain language)
### [Domain rules, workflows, state machines]
  - Mermaid diagrams for any flow, state machine, or decision tree
---
---
## Planned
### Business   ← upcoming features from operator/user perspective
```

The "What It Does" section must explain the *why*, not just the *what*. A reader with no code context should understand the design intent.

---

## Technical doc (`<name>.tech.md`)

```
# Module Name — Technical
Business reference: [<name>.md](./<name>.md)
---
---
## Technical
### Endpoints       ← method, path, permission, status
### DTOs            ← field tables with types, required, notes
### Examples        ← one block per endpoint: request + every response variant
### [Service flows] ← sequenceDiagram or flowchart per non-trivial operation
### Database Schema ← erDiagram + column tables
### File Structure  ← annotated directory tree
### Gotchas         ← non-obvious behaviours, traps, internal-only methods
---
---
## Planned
### Technical  ← deferred implementation items
```

---

## Examples section — standard (required in every `.tech.md`)

Every endpoint needs a block showing:
- The request body (if applicable), with realistic values
- The success response with realistic data
- Every distinct error response the endpoint can return — one block per status code

```markdown
#### `POST /categories`

**Request:**
\`\`\`json
{ "name": "Electronics", "slug": "electronics" }
\`\`\`

**201 — success:**
\`\`\`json
{ "success": true, "message": "...", "data": { ... } }
\`\`\`

**409 — slug taken:**
\`\`\`json
{ "success": false, "message": "Slug already in use", "data": null }
\`\`\`
```

---

## Error catalogue

All HTTP error codes and messages live in `src/docs/errors.md`. Update it whenever a new error code or message is added or changed. Never leave error responses undocumented.

---

## Roadmap phase entries (`src/docs/roadmap.md`)

Each phase section must include:
- A one-line scope summary
- **Business rules** — what operators/customers can do, constraints they feel
- **Technical constraints** — atomicity requirements, implementation decisions, known traps

---

## Diagrams

Use Mermaid (` ```mermaid `). Match diagram type to use case:
- `sequenceDiagram` — service-to-service or client-to-service flows
- `flowchart TD` — decision trees, guard logic, multi-branch flows
- `stateDiagram-v2` — lifecycle state machines
- `erDiagram` — database table relationships

Diagrams are part of the doc — update them when the code or rules they represent change.

---

## CLAUDE.md role

- Links to module docs via Module Doc Links table — never holds content itself
- Five sections in order: For Claude → Project Status → Architecture → Module Docs → Decisions
- Double `---` between top-level sections, single `---` between subsections
- Tables over bullet lists wherever data is tabular

## When the user says "memorize"

"Memorize" = a decision was made. Always write it to CLAUDE.md (in the most relevant of the five sections) AND to the memory file system. The five sections and what goes in each:

- **For Claude** — rules about how Claude should behave in this repo
- **Project Status** — phase changes, completions, what's in progress
- **Architecture** — tech choices, patterns, conventions
- **Module Docs** — doc structure rules, links, lifecycle rules
- **Decisions** — judgment calls, strategic choices, constraints (CRM timing, no ORM, etc.)

## Edge cases: where to write a decision

**Cross-module decisions** (e.g. "deleting a vendor deactivates their products"):
→ Write in the module that *owns the action* (Vendors doc owns the deletion consequence)
→ Add a short reference note in the affected module (Products doc: "see Vendors doc for deletion cascade behaviour")

**Module boundary / interaction decisions** (e.g. "inventory reservation happens at cart stage, not checkout"):
→ Write in CLAUDE.md Decisions section — it's a system-level contract not owned by either module

**Global conventions that apply everywhere** (e.g. "all IDs use UUID v4", "all timestamps ISO 8601"):
→ Write in CLAUDE.md Architecture → Key Patterns

**Why:** User corrected Claude multiple times for holding content in CLAUDE.md instead of module docs, and for incomplete doc sections missing Examples or shallow business descriptions.

**How to apply:** When starting any module, follow the full template. Examples section is not optional. Business "What It Does" must explain design intent, not just list features.
