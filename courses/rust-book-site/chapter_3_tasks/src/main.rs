enum InputUnit {
    Celsius,
    Fahrenheit,
}

fn convert_to_opposite_unit(input_unit: InputUnit, temperature: f64) -> f64 {
    match input_unit {
        InputUnit::Fahrenheit => (temperature - 32.0) * 5.0 / 9.0,
        InputUnit::Celsius => temperature * 9.0 / 5.0 + 32.0,
    }
}

fn nth_fibonacci(n: u32) -> u32 {
    if n == 0 {
        return 0;
    }
    if n == 1 {
        return 1;
    }
    let mut prev_2 = 0;
    let mut prev = 1;
    let mut curr = prev_2 + prev;

    for i in 2..n {
        curr += prev;
        prev_2 = prev;
        prev = curr - prev_2;
    }

    curr
}

enum ChristmasSon

fn main() {
    let _celsius_result = convert_to_opposite_unit(InputUnit::Fahrenheit, 68.0);
    let _fahrenheit_result = convert_to_opposite_unit(InputUnit::Celsius, 20.0);
    // println!("68.0 F is: {:?} C", celsius_result);
    // println!("20.0 C is: {:?} F", fahrenheit_result);

    let _fibonacci_result = nth_fibonacci(0);
    // println!("{}nth  fibonacci value: {}", 0, _fibonacci_result);
}
