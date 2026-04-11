---
name: README purpose and lifecycle
description: What README is for, what belongs in it, and how it evolves as modules are built
type: feedback
---

README is written for **other people** — it describes the project scope and presents an interesting picture of the finished product. It is not an internal planning doc.

**What belongs in README:**
- Compelling project description and finished-product vision
- Tech stack highlights
- Setup, install, env vars, run commands
- Build phases table (status overview only — no scope details)

**What does NOT belong in README:**
- Implementation details, business rules, or module planning — those live in module docs or `src/docs/roadmap.md`

**Lifecycle rule:**
When a new module phase starts:
1. Create `src/modules/<name>/docs/<name>.md` + `<name>.tech.md`
2. Move the relevant planning content from `src/docs/roadmap.md` into the new module docs (business scope → `<name>.md` Planned, technical items → `<name>.tech.md` Planned)
3. Delete that section from `roadmap.md`
4. Add both doc links to the Module Doc Links table in CLAUDE.md
5. Update phase status in CLAUDE.md Project Status

**Why:** README draws a picture of the finished project for external eyes. Module docs are the internal source of truth. `roadmap.md` is the internal planning buffer for unstarted modules. Never let them duplicate each other.
