// TASK 05 — Handling Result
//
// Topics: Result, Ok, Err, match on Result, parse()
//
// ------------------------------------------------------------------
// EXERCISES
// ------------------------------------------------------------------
//
// 1. `parse_number` below uses `.expect()`. Rewrite the body so it
//    uses a `match` on the Result instead. On Ok return the number,
//    on Err return 0.
//
// 2. In `main`, call `parse_number` with "42", "abc", and "  7  ".
//    Print each result. Note: does " 7 " (with spaces) parse or not?
//
// 3. Write a second version `parse_number_strict` that returns -1
//    on any error instead of 0. Call it with the same inputs and
//    print results so you can see the difference.
//  // it only prints -1 instead of 0. its all the difference i have noticed

// 4. Answer in a comment: what is the type of the value inside
//    `Ok(...)` when you call "42".parse::<i32>()?
//    What is the type inside `Err(...)`?
// // i32
// ------------------------------------------------------------------

fn parse_number(s: &str) -> i32 {
    match s.trim().parse::<i32>() {
        Ok(n) => n,
        Err(_) => 0,
    }
}

fn parse_number_strict(s: &str) -> i32 {
    match s.trim().parse::<i32>() {
        Ok(n) => n,
        Err(_) => -1,
    }
}

fn main() {
    // exercise 2
    println!("Res, {:?}", parse_number_strict("42"));
    println!("Res, {:?}", parse_number_strict("abc"));
    println!("Res, {:?}", parse_number_strict(" 7 "));
}
