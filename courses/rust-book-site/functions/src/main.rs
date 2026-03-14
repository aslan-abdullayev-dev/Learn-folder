fn main() {
    println!("Hello, world!");

    another_function(5);


    let my_tuple = (String::from("hello"), 100);
    let (s) = my_tuple;

    // print!(my_tuple.1);
}

fn another_function(x: i32) {
    println!("The value of x: {x}");
}
