// TASK 02 — Shadowing
//
// Topics: shadowing, let reuse, type change via shadow
//
// ------------------------------------------------------------------
// EXERCISES
// ------------------------------------------------------------------
//
// 1. `spaces` starts as a &str. Shadow it so that by the time you
//    reach the println! it holds the *number* of spaces (a usize),
//    not the string itself. Do not use `let mut` — use shadowing.
//
// 2. After that, shadow `spaces` again with a formatted string like
//    "spaces counted: 3" and print that too.
//
// 3. Answer in a comment: why can't you do this same type change
//    with `let mut spaces` instead of shadowing?
//
// ------------------------------------------------------------------

fn main() {
    let spaces = "   ";

    // shadow spaces here to be the count (usize)
    let spaces = spaces.len();

    println!("number of spaces: {spaces}");
}