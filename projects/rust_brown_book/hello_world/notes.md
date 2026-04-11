# hello_world — Session Notes

---

## Session: 2026-04-11 — Direct rustc compilation

### Leftover files from rustc
Calling `rustc main.rs` directly inside this directory produced `main.exe` and `main.pdb` next to the source file. These were deleted manually. Prefer `cargo run` going forward — output goes to `target/` and is handled cleanly by Cargo.