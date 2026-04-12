// TASK 01 — Mutability
//
// Topics: let, let mut, immutability by default
//
// ------------------------------------------------------------------
// EXERCISES
// ------------------------------------------------------------------
//
// 1. The line below will not compile. Fix it with the smallest
//    possible change so that `score` can be updated.
//
// 2. Add a third variable `final_score` that is immutable and holds
//    the value of `score` after the update. Print all three values.
//
// 3. Try assigning a new value to `final_score` after you declare it.
//    Read the compiler error. Then delete that line.
//    Goal: understand what the error says and why.
//
// ------------------------------------------------------------------

fn main() {
    let mut score = 0;

    let final_score = score + 10;

    println!("score: {final_score}");
}
