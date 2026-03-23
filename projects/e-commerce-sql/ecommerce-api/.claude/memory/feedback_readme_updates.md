---
name: README update rule
description: Keep README.md in sync when operational details change
type: feedback
---

Always update `README.md` when anything changes that belongs there: install steps, run commands, env vars, port, scripts, test commands, or project setup.

**Why:** README is the operational reference — if it drifts from reality it becomes misleading.

**How to apply:** After any change that touches startup, configuration, scripts, or environment variables, check README.md and update it. README scope = operational only (how to run the project). Architecture and business rules stay in module docs and CLAUDE.md.

Note: README.md did not exist at the start of this project — create it if/when the project reaches a state worth documenting for a new developer.
