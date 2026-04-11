# Playground — Learning Reference

## Purpose

Temporary learning files in `src/playground/`. Delete the whole folder when all 7 tutorials are complete.

---

## Tutorial Format

Each tutorial follows this structure:

1. **The problem** — what existed before, why it was painful, what this concept solves. No code yet.
2. **From scratch** — build the concept in a playground file from zero, simpler than the real code so the idea clicks
   first.
3. **Breaking it** — write it wrong intentionally, observe what happens. Failure cements understanding.
4. **NestJS wrapper** — now look at how NestJS wraps the raw concept (if applicable).
5. **Connecting to real code** — open the actual file in `src/core/` and every line should make sense.
6. **Mini quiz** — 3-5 questions on just that concept before moving on.

### Rules

- Each tutorial has its own file in `src/playground/` with all steps, instructions, and expected outputs written as comments inside the file — no need to refer back to chat
- Work through each step by editing the file directly — comment out previous steps, uncomment the next
- Run with: `npx ts-node src/playground/<filename>.ts`
- One step at a time — do not move to the next step until the current one produces the expected output
- Questions are encouraged at any point — answer them, then return to the current step
- Playground files are throwaway — experiment freely

---

## Tutorial Progress

| # | Topic | Status | File |
|---|---|---|---|
| 1 | TypeScript decorators & metadata | ✅ Complete | `01-metadata.ts` |
| 2 | Creating custom decorators in plain TypeScript | ✅ Complete | `02-custom-decorators.ts` |
| 3 | Categories module deep-dive | 🔄 In Progress | `03-categories.ts` |
| 4 | RxJS basics | ✅ Complete | `04-rxjs.ts` |
| 5 | NestJS Interceptors | Not started | — |
| 6 | NestJS Guards | Not started | — |
| 7 | Passport.js + passport-jwt | Not started | — |
| 8 | NestJS Exception Filters | Not started | — |

---

## Tutorial 3 — Categories & The Closure Table

### What this covers

- Why `parent_id` breaks for hierarchical queries
- The closure table pattern — what it stores and why
- Self-reference rows — why they are mandatory
- Inserting parent-child relationships
- Querying ancestors, children, subtree, and breadcrumbs in a single JOIN
- Re-parent logic overview

### Where we stopped

Step 1 — not started. All steps and instructions are inside `03-categories.ts`.

### Next step

Step 1 — naive `parent_id` approach, feel the pain before seeing the solution.

---

## Tutorial 1 — TypeScript Decorators & Metadata

### What we learned

- `Reflect` is a built-in JS object introduced with ES2015 alongside `Proxy`
- `Reflect.defineMetadata` / `Reflect.getMetadata` are NOT part of the JS spec — added by the `reflect-metadata`
  polyfill
- `reflect-metadata` is a side-effect import — it patches the global `Reflect` object with metadata methods
- Metadata = a key-value pair attached to a function externally, not as a property on it
- Key matching is exact — typo in the key silently returns `undefined`
- `SetMetadata` (NestJS) wraps `Reflect.defineMetadata`
- `Reflector` (NestJS) wraps `Reflect.getMetadata` — adds TypeScript generics and context helpers
- In NestJS apps `reflect-metadata` is bootstrapped globally — only playground files need to import it manually

### Key concepts

- **Side-effect import** — `import 'reflect-metadata'` runs the module for its side effect (patching `Reflect`) without
  importing any value
- **`Proxy` vs metadata** — `Proxy` wraps an object and intercepts operations on it; metadata attaches data to a
  function reference externally. Neither modifies the original target.
- **Why `Reflect` for metadata** — natural home for "operations on objects", gives a standardized API so NestJS,
  TypeScript's `emitDecoratorMetadata`, and third-party libs all speak the same     
  language. Internally just a `WeakMap`.

### Current playground file

`src/playground/01-metadata.ts` — at Step 4. All remaining steps and instructions are written as comments inside that file.

### Next step

Step 5 — connecting everything back to the real `@IsPublic()` decorator in `src/core/decorators/public.decorator.ts`. Instructions are inside `01-metadata.ts`.

---

## Tutorial 2 — Custom Decorators in Plain TypeScript

### What we learned so far

- A decorator is a function TypeScript calls automatically at class definition time — never at instance creation or method call time
- **Class decorator** — receives the constructor. Used to tag or wrap the whole class
- **Method decorator** — receives `target` (prototype), `propertyKey` (method name), `descriptor` (PropertyDescriptor)
- `target` is the prototype, not an instance and not the constructor. Instance properties (e.g. `name = 'x'`) do not live there
- `target.constructor` points to the class itself — static methods live there, instance methods live on `target` directly
- `descriptor.value` is the actual method function. Replace it to wrap the method
- `descriptor.writable` — set to `false` to lock the method against reassignment
- `descriptor.enumerable` — class methods are **non-enumerable by default**; setting it to `false` is redundant unless you first set it to `true`
- Always check `Object.keys(SomeClass.prototype)` to test enumerability — never `Object.keys(instance)`, prototype methods never appear there
- When wrapping `descriptor.value`, use a regular `function`, not an arrow function — arrow functions capture the outer `this` and break instance context
- Save the original method before overwriting `desc.value`, otherwise calling `desc.value()` inside the wrapper causes infinite recursion
- Factory decorators (e.g. `@Role('admin')`) are functions that return a decorator function

### Where we stopped

Complete.

### Concepts Learned Along the Way

| Concept | Summary |
|---|---|
| Decorator timing | Runs once at class definition — not per instance, not per call |
| `target` | Prototype of the class. Has instance methods but not instance properties |
| `target.constructor` | The class itself. Static methods live here |
| `descriptor.value` | The method function. Replace it to wrap behaviour |
| `descriptor.writable` | Lock a method against reassignment |
| `descriptor.enumerable` | Class methods are non-enumerable by default — need `@Visible` first to make the contrast visible |
| Arrow vs function in wrapper | Arrow loses `this` — always use `function` when assigning to `desc.value` |
| Infinite recursion | Save original before overwriting `desc.value`; calling `desc.value()` inside the wrapper calls itself |
| Factory decorator | `@Role('admin')` = function returning a decorator; the outer function receives the argument, inner receives decorator args |

---

### Concepts Learned Along the Way

| Concept | Summary |
|---|---|
| Side-effect import | `import 'x'` — runs module for its side effects, imports no value |
| `global` in Node | Node's global object — like `window` in browser. `reflect-metadata` patches `Reflect` onto it |
| `Reflect` | Built-in JS object for intercepting object operations. Pairs with `Proxy` |
| `Proxy` | Wraps an existing object, intercepts operations — original object unaware |
| `reflect-metadata` | Polyfill that adds metadata methods to `Reflect`. Never made it into the JS spec. Internally a `WeakMap` |
| Metadata key safety | Keys are exact strings — a typo silently returns `undefined`, no error |

---
