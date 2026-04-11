# hello_cargo — Session Notes

---

## Session: 2026-04-11 — Cargo Basics (Book Chapter 1.3)

### Why hello_cargo has no .git folder
`cargo new` skips creating a `.git` directory when the new project is inside an existing git repository. Since `rust_brown_book/` is already a git repo, Cargo detected that and did not initialize a nested one.

### Who added hello_cargo to workspace members
Cargo 1.71+ automatically adds a newly created crate to the `[workspace] members` list in the root `Cargo.toml`. No manual edit needed. Current version is 1.94 so this happens automatically on `cargo new`.

### rustc vs cargo build
Calling `rustc main.rs` directly compiles a single file and drops the output (`main.exe`, `main.pdb`) next to the source. Cargo builds output to `target/debug/` or `target/release/` at the workspace root, handles dependencies, and supports incremental builds. Always prefer `cargo run` / `cargo build` over calling `rustc` directly.

### cargo run
Does two things in one step — builds if anything changed, then runs the binary. Equivalent to:
```bash
cargo build
./target/debug/<project_name>
```
Skips the compile step if nothing has changed since the last build.

### cargo build output files
| File | Purpose |
|---|---|
| `<name>.exe` / `<name>` | The actual binary — only this gets deployed |
| `<name>.pdb` (Windows) | Debug symbols — kept privately, never shipped to users |
| `target/deps/`, `target/incremental/` | Incremental build cache — never deployed |

Always use `cargo build --release` for deployment. Output lands in `target/release/`.

### Debug build vs release build
- **Debug (default):** fast to compile, unoptimized, includes debug symbols — good for development and debugging
- **Release (`--release`):** slow to compile, aggressively optimized, symbols stripped — use for deployment
- Optimization can reorder/remove instructions, making debugging harder, which is why they are kept separate

### Debug symbols
Extra data that maps raw CPU memory addresses back to human-readable source info:
- Memory address → `src/main.rs line 42`
- Address → variable name
- Address → function name

Without them a crash shows raw hex addresses. With them it shows file, line, and function names. Stripped from release builds for size and security (they expose internal code structure).

### .pdb files (Windows)
`.pdb` = Program Database — Microsoft's format for storing debug symbols separately from the binary.
- On Windows: symbols live in a separate `.pdb` file alongside the `.exe`
- On Linux: symbols are embedded in the binary and stripped with a separate tool
- Ship only the `.exe` to users; keep the `.pdb` privately
- A `.pdb` is tied to the exact binary it was built with — a different build's `.pdb` won't map correctly
- Teams archive every release's `.pdb` (in S3, CI artifact storage, or a symbol server) so production crashes can be decoded using the user's crash dump + the private `.pdb`

### Archiving .pdb files
- **Small teams:** folder per version in cloud storage (`releases/v1.2.0/app.exe` + `app.pdb`)
- **CI/CD:** pipeline auto-uploads `.pdb` on every release build, indexed by git commit hash
- **Large teams:** dedicated symbol server — debugger fetches the right `.pdb` automatically by build ID
- Git commit hash is always the link between a crash report, the binary, and the source code

### Embedding build info into the binary
Use `env!()` macro for compile-time values baked into the binary:
```rust
println!("{}", env!("CARGO_PKG_VERSION")); // built-in from Cargo
```
For custom values like git hash, use `build.rs`:
```rust
// build.rs
fn main() {
    let output = std::process::Command::new("git")
        .args(["rev-parse", "--short", "HEAD"])
        .output().unwrap();
    let hash = String::from_utf8(output.stdout).unwrap();
    println!("cargo:rustc-env=GIT_HASH={}", hash.trim());
}
```
Then in source: `env!("GIT_HASH")` — resolved at compile time, frozen into the binary.

### What to embed vs what to keep in .env
| Embed in binary (`env!()`) | Keep in `.env` at runtime |
|---|---|
| App version, package name | Database URLs (contain credentials) |
| Git commit hash / build number | API keys and tokens |
| Build timestamp | JWT secrets, passwords |
| Target platform | Per-environment hostnames/ports |

`env!()` values are compile-time — anyone can extract them by inspecting the binary. Never embed secrets this way. `.env` lives only on the server, never travels with the binary, and can be rotated without rebuilding. Never commit `.env` to git — commit a `.env.example` with dummy values instead.
