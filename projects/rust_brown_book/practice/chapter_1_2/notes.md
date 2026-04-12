# practice — Session Notes

---

## Session: 2026-04-12 — Never type, return, block expressions (Ch 2 practice tasks)

### The problem: match arms with mismatched types
In `task_06_guessing_game.rs`, parsing a guess with error handling looked like:

```rust
let guess: i32 = match gues.trim().parse() {
    Ok(num) => num,      // type: i32
    Err(_) => continue,  // how does this compile?
};
```

The confusion: all match arms must have the same type, so how can `continue` sit alongside `i32`?

---

### The `!` type (never type)
`continue`, `break`, `return`, and `panic!()` never produce a value — they diverge (jump somewhere else). Rust gives them the special type `!`, called the **never type**.

Key property: `!` coerces into any type automatically.

This makes logical sense — if a branch never completes and produces a value, it can't violate any type contract. Rust says "fine, pretend it's whatever type is needed here."

So the compiler sees:
```
Ok(num)  => i32
Err(_)   => !   →  coerces to i32
```

Both arms unify to `i32`. No conflict.

The same trick works with any diverging expression:
```rust
let x: i32 = match result {
    Ok(n)  => n,
    Err(_) => return,    // ! coerces to i32
};

let y: i32 = match result {
    Ok(n)  => n,
    Err(_) => panic!(),  // ! coerces to i32
};
```

---

### `break 0` vs `continue` — the original bug
The original code used `break 0` in the `Err` arm, which **exits the loop entirely** rather than skipping to the next iteration. The fix was `continue`.

| Keyword | Exits |
|---|---|
| `return` | the whole function |
| `break` | the innermost `loop`/`while`/`for` |
| `continue` | current iteration of the innermost loop |

---

### `return` — what does it exit?
`return` always exits the **entire function**, regardless of how deeply nested you are inside blocks or loops:

```rust
fn main() {
    loop {
        let x = {
            return; // exits main() entirely, not just the block or loop
        };
    }
}
```

**Exception — closures:** a `return` inside a closure exits the closure, not the surrounding function:

```rust
fn main() {
    let add_one = |x: i32| {
        return x + 1; // exits the closure only
    };
    println!("{}", add_one(5)); // main() keeps going, prints 6
}
```

Rule: `return` exits the nearest `fn`, not the nearest `{}`.

---

### Returning values from blocks — last expression without semicolon
Since `return` exits the whole function, the way to produce a value from a block is via its **last expression without a semicolon**:

```rust
let x = {
    let a = 5;
    a + 1   // no semicolon — block evaluates to 6
};
```

Adding a semicolon turns the expression into a statement and throws the value away (block returns `()` instead).

This is the same pattern used in match arms, if expressions, and loop bodies:

```rust
// match arm
let label = match score {
    100 => "perfect",   // evaluates to &str
    _   => "other",
};

// if as expression
let x = if condition { 5 } else { 10 };

// loop with break value
let result = loop {
    if done { break 42; }  // loop evaluates to 42
};
```

Everything in Rust is an expression that evaluates to a value — blocks, `if`, `match`, `loop`. The semicolon is what turns an expression into a statement and discards the value.

---

### Ch 2 practice coverage — assessment
Tasks 01–06 cover: mutability, shadowing, match, loop/break/continue, Result/Ok/Err, and a full guessing game rebuild.

The only Ch 2 concept with no dedicated task is `&mut` references (used in `read_line(&mut guess)`). This was intentionally skipped — Ch 4 covers ownership and borrowing in depth, so drilling `&mut` before the full picture exists would create more confusion than clarity.

**Verdict:** coverage is sufficient to move to Ch 3. Ch 3 introduces fresh ground: data types (integers, floats, booleans, char, tuples, arrays), functions, statements vs expressions, `if` as an expression, `while` and `for` loops.