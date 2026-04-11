---
name: Where to update planned behaviour changes
description: Rule for where to record changes to planned business behaviour depending on whether the module exists yet
type: feedback
---

When a planned business behaviour is changed or added during a conversation:

1. **Module doc exists** (`src/modules/<name>/docs/`) → update `<name>.md` Planned → Business or `<name>.tech.md` Planned → Technical (whichever fits)
2. **Module doc does not exist yet** → update `src/docs/roadmap.md` under the relevant phase or Future Modules section

**Why:** Module docs are the source of truth once a module exists. `roadmap.md` holds planning for everything not yet built. README is external-facing only — no planning content. Decisions should never be lost or left only in conversation history.

**How to apply:** Any time we discuss, change, or refine how a future feature should work — immediately find where it lives (module doc or roadmap) and update it. Don't wait until implementation.
