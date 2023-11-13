let myTuple: [number, string];

myTuple = [1, "1"];

myTuple = [1, 1];
myTuple = ["1", "1"];
myTuple = [1, true];

// =============================================================
// =============================================================

let myTuple2: [number, string, string];

myTuple2 = [1, "1", "1"];

myTuple2 = [1, 1];
myTuple2 = ["1", "1"];
myTuple2 = [1, true];

// =============================================================
// =============================================================

const color: [number, number, number] = [0, 0, 0];

// =============================================================
// =============================================================
type HTTPResponse = [number, string];
const request: HTTPResponse = [200, "OK"];
request.push("item that should not be alowed"); // -> should gave an error
request.pop(); // -> should gave an error
request.pop(); // -> should gave an error
request.pop(); // -> should gave an error
request.pop(); // -> should gave an error
