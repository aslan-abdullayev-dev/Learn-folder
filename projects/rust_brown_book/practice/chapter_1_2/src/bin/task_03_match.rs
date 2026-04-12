// TASK 03 — Match Expressions
//
// Topics: match, arms, exhaustiveness, Ordering
//
// ------------------------------------------------------------------
// EXERCISES
// ------------------------------------------------------------------
//
// 1. Complete the `describe_score` function using a match expression.
//    Map the score to a &str label:
//      0        => "zero"
//      1..=59   => "failing"
//      60..=79  => "passing"
//      80..=99  => "great"
//      100      => "perfect"
//      anything else => "invalid"
//    Return the label. Print it in main for a few test values.
//
// 2. In `main`, create a variable `guess: u32 = 42` and a
//    `secret: u32 = 57`. Use a match on `guess.cmp(&secret)` with
//    arms for Less, Greater, and Equal (import std::cmp::Ordering).
//    Print "too low", "too high", or "correct!" accordingly.
//
// 3. Remove one arm from your match in exercise 2 and read the
//    compiler error. Then put it back.
//    Goal: understand what "non-exhaustive patterns" means.
//
// ------------------------------------------------------------------

use std::cmp::Ordering;

fn describe_score(score: u32) -> &'static str {
    match score {
        0 => "zero",
        1..=59 => "failing",
        60..=79 => "passing",
        80..=99 => "great",
        100 => "perfect",
        _ => "invalid",
    }
}

fn main() {
    println!("{}", describe_score(0));
    println!("{}", describe_score(45));
    println!("{}", describe_score(95));
    println!("{}", describe_score(100));

    // exercise 2 here
    let guess: u32 = 42;
    let secret: u32 = 57;

    match guess.cmp(&secret) {
        Ordering::Less => println!("Too small!"),
        Ordering::Equal => println!("Correct!"),
        Ordering::Greater => println!("Too big!"),
    }
}
