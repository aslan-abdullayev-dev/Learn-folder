// TASK 06 — Rebuild the Guessing Game
//
// Topics: all of Ch 2 — stdin, parse, match, loop, rand, cmp
//
// ------------------------------------------------------------------
// EXERCISES
// ------------------------------------------------------------------
//
// Rebuild the guessing game from memory. Do not look at your
// guessing_game project. Requirements:
//
// 1. Generate a secret number between 1 and 100 using rand.
//
// 2. Loop: read a line from stdin, parse it as u32.
//    Handle the parse error with match — on Err, print "enter a
//    number" and continue the loop (do not panic).
//
// 3. Compare the guess to the secret using .cmp() and match:
//    - Too small  => "too low!"
//    - Too big    => "too high!"
//    - Equal      => "you got it!" then break
//
// 4. After the game ends, print how many guesses it took.
//
// ------------------------------------------------------------------

use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    let random_num = rand::thread_rng().gen_range(1..=100);

    loop {
        println!("Guess the number!");
        let mut gues = String::from("");

        io::stdin()
            .read_line(&mut gues)
            .expect("Failed to read line");

        let guess: i32 = match gues.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("enter a number");
                continue;
            }
        };

        match guess.cmp(&random_num) {
            Ordering::Less => println!("too low!"),
            Ordering::Greater => println!("too high!"),
            Ordering::Equal => {
                println!("you got it!");
                break;
            }
        }
    }
}
