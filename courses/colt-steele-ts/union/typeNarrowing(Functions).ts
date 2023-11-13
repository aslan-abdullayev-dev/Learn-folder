function printAge(age: number | string): void {
  console.log(`You are ${age} years old`);
}

function calculateTax(price: number | string, tax: number) {
  return price * tax;
}

function calculateTax2(price: number | string, tax: number): number {
  if (typeof price === "string") {
    price = price.replace("$", "");
    price = parseFloat(price) * tax;
  }
  return price * tax;
}
