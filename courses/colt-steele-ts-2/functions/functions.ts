function square(num: any) {
  return num * num;
}

square(3)
square(true)
square("asd")

function ts_square(num: number): number {
  return num * num;
}

// ts_square("asd")
// ts_square(true)

function print_number(num: number = 0): void {
  console.log("num ==>", num)
}

function give_error (msg:string): never {
 throw new Error(msg)
}