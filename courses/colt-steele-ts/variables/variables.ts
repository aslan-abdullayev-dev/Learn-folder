let movieTitle: string = "Amadaeus";
movieTitle = "Arrival";
// movieTitle = 9;
// movieTitle.upper()

let myBoolean: boolean = true;
// myBoolean = 9

// ================================================================

let vAny: any = 10;          // We can assign anything to any
let vUnknown: unknown =  10; // We can assign anything to unknown just like any 


let s1: string = vAny;     // Any is assignable to anything 
let s2: string = vUnknown; // Invalid; we can't assign vUnknown to any other type (without an explicit assertion)

vAny.method();     // Ok; anything goes with any
vUnknown.method(); // Not ok; we don't know anything about this variable