// TASK 04 — Loop, Break, Continue
//
// Topics: loop, break, break with value, continue
//
// ------------------------------------------------------------------
// EXERCISES
// ------------------------------------------------------------------
//
// 1. Write a loop that counts from 1 to 10, printing each number.
//    Use `break` to exit when the counter exceeds 10.
//    Do not use a `for` or `while` loop — only `loop`.
//
// 2. Write a loop that prints only the odd numbers between 1 and 20.
//    Use `continue` to skip even numbers.
//
// 3. Write a loop that keeps a running total, adding 7 each iteration.
//    When the total exceeds 100, break and return the total from the
//    loop itself (assign the break value to a variable).
//    Print: "Reached: <value> after <n> iterations"
//
// ------------------------------------------------------------------

fn main() {
    // exercise 1
    // let mut count = 0;
    // loop {
    //     println!("Count: {count}");
    //     count += 1;
    //     if count > 10 {
    //         break;
    //     }
    // }

    // exercise 2
    // let mut odd = 0;
    // loop {
    //     odd += 1;
    //     if odd >= 20 {
    //         break;
    //     }
    //     if odd % 2 == 0 {
    //         continue;
    //     } else {
    //         println!("Odd: {odd}");
    //     }
    // }

    // exercise 3
    // let mut total = 0;
    // let mut iterations = 0;
    // let result = loop {
    //     total += 7;
    //     iterations += 1;
    //     if total > 100 {
    //         break total;
    //     }
    // };

    // println!("Reached: {result} after {iterations} iterations");
}
