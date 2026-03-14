use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("Guess the number!");

    for i in 0..100 {
        let random_number = rand::random::<f32>() * 20.0 - 10.0;
        println!("Random number: {}", random_number);
    }

    let secret_number = rand::thread_rng().gen_range(-10..=10);
    ask_for_guess(&secret_number);
}

fn ask_for_guess(&secret_number: &i32) {
    println!("Please input your guess.");
    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    let guess = guess.trim().parse::<i32>().expect("Please type a number!");

    println!("You guessed: {guess}");

    match guess.cmp(&secret_number) {
        Ordering::Equal => println!("You guessed the secret number."),
        Ordering::Greater => {
            println!("Too big!");
            ask_for_guess(&secret_number);
        }
        Ordering::Less => {
            println!("Too little!");
            ask_for_guess(&secret_number);
        }
    }
}
