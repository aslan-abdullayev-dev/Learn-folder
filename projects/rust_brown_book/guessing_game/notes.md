# guessing_game — Session Notes

---

## Session: 2026-04-11 — Dependencies, Randomness, and Cargo (Book Chapter 2)

### .expect() — does it crash the program?
`.expect("Failed to read line")` is called on the `Result` returned by `read_line`. It only crashes (panics) if `read_line` returns `Err` — which almost never happens on stdin in normal use. For learning purposes `.expect()` is the standard approach. Later in the book, `match` is used to handle errors gracefully without panicking.

---

### Cargo dependency workflow vs npm
Adding a crate as a project dependency:

| npm | Cargo |
|---|---|
| `npm install <pkg>` | add to `Cargo.toml` then `cargo build` |
| `npm install <pkg>` (direct) | `cargo add <pkg>` |
| `package.json` | `Cargo.toml` |
| `node_modules/` | `~/.cargo/registry/` (global cache) |
| `package-lock.json` | `Cargo.lock` |

`cargo add rand` is the direct equivalent of `npm install rand` — it writes to `Cargo.toml` and fetches the crate. The book teaches the manual `Cargo.toml` edit first to show what happens under the hood.

`cargo install` is different — it installs a **binary globally** on your machine, equivalent to `npm install -g`. Not used for project dependencies.

---

### Cargo.lock and reproducible builds
`Cargo.lock` pins the exact resolved versions of all dependencies. If it is lost:
- Cargo re-reads `Cargo.toml` and resolves fresh
- `rand = "0.8.5"` means `^0.8.5` (semver compatible), so Cargo could pick `0.8.9` or whatever is latest compatible
- This can introduce regressions

Always commit `Cargo.lock` to source control. Use `=0.8.5` (exact pin) in `Cargo.toml` only if you need a hard lock even without the lockfile.

---

### Semver — Semantic Versioning
Version format: `MAJOR.MINOR.PATCH`

| Part | Meaning |
|---|---|
| PATCH | bug fixes only, safe to upgrade |
| MINOR | new features, backwards compatible, safe to upgrade |
| MAJOR | breaking changes, upgrade carefully |

Special case: when MAJOR is `0`, a MINOR bump (`0.8` → `0.9`) is treated as breaking. Cargo respects this — `^0.8.5` stays within `0.8.x` only.

---

### Dependency version conflicts across crates
- Same major version required by multiple crates → Cargo picks one version satisfying all (no duplication)
- Different major versions required → Cargo allows both to coexist (each crate gets the version it needs)
- Rust's ecosystem strongly depends on semver being followed reliably for this resolution to work

---

### `rand::thread_rng().gen_range(1..=100)` — broken down

| Piece | Meaning |
|---|---|
| `rand::` | access into the `rand` crate namespace |
| `thread_rng()` | get an OS-seeded RNG local to the current thread |
| `.gen_range(...)` | generate a number within the given range |
| `1..=100` | range from 1 to 100 inclusive (`..=` includes the end) |
| `1..100` | would be 1 to 99 — exclusive end |

JS equivalent: `Math.floor(Math.random() * 100) + 1`

Rust is more verbose because it makes explicit: where randomness comes from, which thread owns it, and whether the range end is included.

---

### What is a thread?
A thread is a worker the OS gives your program to execute code line by line. Simple programs have one thread. Programs can spawn multiple threads to work in parallel (e.g. a web server handling many requests simultaneously).

---

### Why `thread_rng` exists — the thread problem
A PRNG (pseudo-random number generator) holds internal state. If multiple threads share one generator:
1. **Data race** — two threads reading/writing state simultaneously causes corruption
2. **Contention** — threads queue up waiting to use it, hurting performance

`thread_rng` solves this by giving each thread its own generator, seeded independently by the OS. No sharing, no waiting, no corruption.

---

### PRNG algorithms — how computers fake randomness
Computers are deterministic — true randomness is impossible from pure computation. PRNGs use math to produce sequences that *look* random. They start from a **seed** (a starting value) and apply a formula repeatedly.

Same seed → always same sequence.

**LCG (Linear Congruential Generator)**
- Oldest, simplest: `next = (a * current + c) % m`
- Fast but weak — patterns emerge. Used in old C `rand()`

**Xorshift / Xoshiro** — used by `SmallRng`
- Uses XOR and bit-shifting operations
- Very fast, good distribution
- Not cryptographically secure — good for games and simulations

**ChaCha** — used by `thread_rng`
- Originally a cryptographic cipher adapted for randomness
- Complex math — seeing 1000 outputs cannot let you predict the next one
- Cryptographically secure — safe for secrets, tokens, auth
- Slower than Xoshiro but fast enough for general use

**OsRng** — not an algorithm
- Reads directly from the OS (`/dev/urandom` on Linux, `BCryptGenRandom` on Windows)
- OS collects physical entropy: CPU timing jitter, keyboard/mouse interrupts, network noise
- Truly unpredictable, but slowest — talks to the OS on every call
- No seed concept — each call is independent

Security/speed spectrum:
```
LCG → Xoshiro → ChaCha → OsRng
faster/weaker ────────────► slower/stronger
```

---

### The four rand generators compared

| Generator | Seed | Thread safe? | Use case |
|---|---|---|---|
| `thread_rng` | OS automatic | yes, automatic | general purpose |
| `StdRng` | you control | no, your responsibility | reproducible tests, simulations |
| `SmallRng` | you control or OS | no, your responsibility | games, fast simulations |
| `OsRng` | none (direct OS) | yes, naturally | cryptography, passwords |

Generators where you control the seed give you thread responsibility in return. Rust exposes the choice because different use cases need different tradeoffs — speed vs security vs reproducibility.

---

### Why Rust exposes these details instead of hiding them
Rust's philosophy: **explicit over magic**. JS gives you `Math.random()` (Xoshiro128 under V8) and you have no control or visibility. This means JS devs unknowingly use a non-cryptographically-secure generator everywhere — including places where it matters.

Rust lets you choose: fast and weak for games, secure and slower for auth tokens. The verbosity is the control.

---

### Who built the rand crate
Community project under the **rust-random** GitHub organization. Key contributor: **@dhardy (Diggory Hardy)** who led the major `0.5` redesign that is the foundation of modern `rand`. Rust's standard library (`std`) intentionally ships with no built-in RNG — they didn't want to bless one approach since cryptographic standards evolve and different use cases need different tradeoffs. `rand` won by community adoption on crates.io.

---

### Why Rust crates feel more rigorous than npm packages
Real structural reasons, not just illusion:
- **Domain self-selection** — Rust attracts systems programmers and security engineers used to thinking carefully about tradeoffs
- **Compiler as filter** — the borrow checker rejects low-effort code before it can be published; the bar to compile is higher
- **Smaller ecosystem** — ~150k crates vs npm's ~2.5M; less noise, serious projects more visible
- **semver consequences** — breaking dependents in Rust has real downstream effects, making maintainers more deliberate

Prediction: signal-to-noise ratio will gradually decline as Rust grows mainstream and AI-generated crates increase — similar to PyPI's trajectory. But the core foundational crates (`rand`, `serde`, `tokio`, `rayon`) are mature and will stay solid.