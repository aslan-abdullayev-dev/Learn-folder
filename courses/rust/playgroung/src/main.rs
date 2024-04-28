fn main() {
    let a = 32;
    println!("Hello, world!");
    print_hello();

    fn print_hello() {
        println!("Hello, rustacians, inside main")
    }
}

fn print_hello() {
    println!("Hello, rustacians, outside main")
}
