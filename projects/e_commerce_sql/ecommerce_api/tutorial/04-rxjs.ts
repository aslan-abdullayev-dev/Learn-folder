// =============================================================================
// TUTORIAL 4 — RxJS
// Run: npx ts-node src/playground/04-rxjs.ts
// =============================================================================
//
// Work through steps one at a time.
// Comment out the previous step before uncommenting the next.
// =============================================================================
//
// THE PROBLEM
// -----------
// JavaScript handles async in several ways: callbacks, Promises, async/await.
// These work well for "one value, one time" — like a single HTTP response.
//
// But some things emit MULTIPLE values OVER TIME:
//   - a WebSocket that keeps sending messages
//   - a user typing in a search box (many keystrokes)
//   - a timer that fires every second
//
// A Promise can't model this — it resolves once and is done.
// RxJS introduces Observable: a stream that can emit zero, one, or many
// values over time, and you "subscribe" to listen to them.
//
// NestJS uses Observables in interceptors — the interceptor wraps the
// route handler's response in a stream so you can transform it.
// That's why this tutorial exists.
// =============================================================================

// -----------------------------------------------------------------------------
//* STEP 1 — What is an Observable?
//
// An Observable is a function that, when subscribed to, starts producing values.
// Think of it like a newspaper subscription:
//   - the newspaper (Observable) publishes editions
//   - you (subscriber) receive them as they arrive
//   - you can cancel (unsubscribe) at any time
//
// Three things can happen in a stream:
//   next(value)   — a new value arrives
//   error(err)    — something went wrong, stream ends
//   complete()    — stream is done, no more values
//
// Expected output:
//   next: 1
//   next: 2
//   next: 3
//   complete
// -----------------------------------------------------------------------------

// import { Observable } from 'rxjs';
//
// // Creating an Observable manually.
// // The function inside receives a "subscriber" object.
// // You call subscriber.next() to emit values,
// // subscriber.complete() to signal the stream is done.

// const numbers$ = new Observable<number>((subscriber) => {
//   subscriber.next(1); // emit value 1
//   subscriber.next(2); // emit value 2
//   subscriber.next(3); // emit value 3
//   subscriber.complete(); // done — no more values
// });
//
// // Nothing happens until you subscribe.
// // subscribe() takes an object with next, error, complete handlers.
// numbers$.subscribe({
//   next: (value) => console.log('next:', value),
//   error: (err) => console.log('error:', err),
//   complete: () => console.log('complete'),
// });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 1
//
// Task 1.1 — Emit strings
//   Create an Observable<string> that emits 'cat', 'dog', 'bird' then completes.
//   Subscribe and log each value with: "animal: <value>"
//   Expected:
//     animal: cat
//     animal: dog
//     animal: bird
//     complete
// import { Observable } from 'rxjs';
//
// const animals$ = new Observable<string>((subscriber) => {
//   subscriber.next("cat")
//   subscriber.next("dog")
//   subscriber.next("bird")
//   subscriber.complete()
// })
//
// animals$.subscribe({
//   next: (value) => console.log('animal:', value),
//   complete: () => console.log('complete'),
// })

// Task 1.2 — No subscribe, no output
//   Create an Observable that logs "producing..." inside the constructor function,
//   but do NOT call .subscribe() on it.
//   Verify nothing is logged. Write a comment explaining why.


// import { Observable } from 'rxjs';
//
// class UserClass {
//   producing$: Observable<string>;
//
//   constructor() {
//     this.producing$ = new Observable<string>((observer) => {
//       observer.next('producing...');
//     });
//

//   }
//

// }

// if this.producing$ is not subscribed it will not log

// new UserClass();


// Task 1.3 — Emit then error
//   Create an Observable that emits 1, then 2, then calls subscriber.error('oops').
//   Subscribe with all three handlers (next, error, complete).
//   Predict: does "complete" print? Write your answer as a comment, then verify.

// import { Observable } from 'rxjs';
//
// const canThrow$ = new Observable<number>((subscriber) => {
//   subscriber.next(1);
//   subscriber.next(2);
//   subscriber.error('oops');
// });

// I think complete will not run(even error stops the stream). Because it will mess up error handling.

// canThrow$.subscribe({
//   next(value) {
//     console.log('value ==>', value);
//   },
//   complete() {
//     console.log('complete');
//   },
//   error(err) {
//     console.log('err ==>', err);
//   },
// });

//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 2 — of() and from(): creating Observables from existing values
//
// Creating Observables manually with `new Observable()` is verbose.
// RxJS ships creation functions for common cases.
//
// of(...values)  — emits each argument as a value, then completes
// from(iterable) — emits each item from an array (or Promise), then completes
//
// These are the most common ones you'll see in NestJS interceptors and Angular.
//
// Expected output (of):
//   value: 10
//   value: 20
//   value: 30
//   complete
//
// Expected output (from):
//   item: a
//   item: b
//   item: c
//   complete
// -----------------------------------------------------------------------------

// import { of } from 'rxjs';

// // of() — emit each argument one by one, then complete
// // Equivalent to: subscriber.next(10); next(20); next(30); complete()

// const of$ = of(...[10, 20, 30]);

// of$.subscribe({
//   next: (value) => console.log('value:', value),
//   complete: () => console.log('complete'),
// });

// // from() — unwraps an iterable and emits each item
// // Works with arrays, strings, Sets, and Promises
// const from$ = from(['a', 'b', 'c']);
//
// from$.subscribe({
//   next: (item) => console.log('item:', item),
//   complete: () => console.log('complete'),
// });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 2
//
// Task 2.1 — of() with mixed subscription
//   Use of() to emit 'start', 'middle', 'end'.
//   In the next handler, log the value in uppercase.
//   In complete, log 'stream finished'.
//   Expected:
//     START
//     MIDDLE
//     END
//     stream finished
//
// Task 2.2 — from() with a Promise
//   from() also accepts a Promise — it waits for it to resolve and emits the result.
//   Create a Promise that resolves to 'hello from promise'.
//   Wrap it with from() and subscribe.
//   Predict: does complete fire after the Promise resolves? Write your answer first.
//   Expected:
//     hello from promise
//     complete
//
// Task 2.3 — Predict: of() vs new Observable()
//   Without running, write a comment explaining the difference between:
//     Version A: of(1, 2, 3)
//     Version B: new Observable(sub => { sub.next(1); sub.next(2); sub.next(3); sub.complete(); })
//   Are they equivalent? When would you use each?
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 3 — pipe() and map(): transforming stream values
//
// So far you've only received values as-is. In practice you almost always
// need to transform them before using them.
//
// pipe() is how you chain operations on a stream.
// It takes one or more operators and applies them in order — left to right.
// The stream flows through each operator like water through filters.
//
// map(fn) is the first operator to learn.
// It transforms each emitted value — exactly like Array.map but for streams.
//
//   stream:  1 → 2 → 3
//   map(x => x * 10)
//   result: 10 → 20 → 30
//
// Expected output:
//   transformed: 10
//   transformed: 20
//   transformed: 30
//   complete
// -----------------------------------------------------------------------------

// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
//
// const numbers$ = new Observable<number>((subscriber) => {
//   subscriber.next(1);
//   subscriber.next(2);
//   subscriber.next(3);
//   subscriber.complete();
// });
//
// // pipe() takes operators — map receives each value and returns a new one
// // The original stream is not mutated — pipe returns a new Observable
// numbers$
//   .pipe(
//     map((value) => value * 10), // 1 → 10, 2 → 20, 3 → 30
//   )
//   .subscribe({
//     next: (value) => console.log('transformed:', value),
//     complete: () => console.log('complete'),
//   });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 3
//
// Task 3.1 — map to string
//   Create an Observable that emits 1, 2, 3.
//   Use pipe + map to convert each number to a string: "item-1", "item-2", "item-3".
//   Subscribe and log each result.
//   Expected:
//     item-1
//     item-2
//     item-3

// import { of } from 'rxjs';
// import { map } from 'rxjs/operators';
//
// const of$ = of(1, 2, 3);
//
// of$.pipe(map((value) => {
//   return `item-${value}`;
// })).subscribe({
//   next: (value) => {
//     console.log('value ==>', value);
//   },
//   complete: () => console.log('complete'),
//   error: (error) => {
//     console.log('error ==>', error);
//   },
// });


//
// Task 3.2 — chain two maps
//   Create an Observable that emits 2, 4, 6.
//   Chain TWO map operators inside one pipe():
//     First map: multiply each value by 10
//     Second map: add 1 to the result
//   Log each final value.
//   Predict the output before running, write it as a comment.

// import { from, Observer } from 'rxjs';
// import { map } from 'rxjs/operators';
//
// const subscription2nPlus1: Observer<number> = {
//   next: (value) => {
//     console.log(value);
//   },
//   error: (error) => {
//     console.log('error ==>', error);
//   },
//   complete: () => console.log('complete'),
// };
//
// const from$ = from([2, 4, 6]);
// from$
//   .pipe(
//     map((value) => value * 10),
//     map((value) => value + 1),
//   )
//   .subscribe(subscription2nPlus1);

// Task 3.3 — map an object
//   Create an Observable that emits these objects one by one:
//     { id: 1, name: 'Alice' }
//     { id: 2, name: 'Bob' }
//   Use map to transform each to: { userId: id, displayName: name (uppercase) }
//   Expected:
//     { userId: 1, displayName: 'ALICE' }
//     { userId: 2, displayName: 'BOB' }


// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// const users$ = new Observable<{ id: number; name: string }>((observer) => {
//   observer.next({ id: 1, name: 'Alice' });
//   observer.next({ id: 2, name: 'Bob' });
//   observer.complete();
// });
//
// users$
//   .pipe(map((user) => ({ userId: user.id, name: user.name.toUpperCase() })))
//   .subscribe({
//     next: (user) => {
//       console.log(user);
//     },
//     error: (err) => {
//       console.log('err ==>', err);
//     },
//     complete: () => console.log('complete'),
//   });

// Task 3.4 — Connect to real code (no code to run — read and understand)
//   Open: src/core/interceptors/response.interceptor.ts
//   Find the pipe() + map() call.
//   Write a comment here explaining what it does in plain English —
//   what goes in, what comes out, and why.
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 4 — filter() and tap(): skipping values and side effects
//
// map() transforms values. Two more operators you'll use regularly:
//
// filter(fn) — only lets values through if fn returns true.
//   Like Array.filter but for streams.
//   Values that don't pass are silently dropped — no error, no complete.
//
//   stream:  1 → 2 → 3 → 4 → 5
//   filter(x => x % 2 === 0)
//   result:  2 → 4
//
// tap(fn) — runs a side effect for each value WITHOUT changing it.
//   The value passes through unchanged.
//   Used for logging, debugging, or triggering something without altering the stream.
//
//   stream:  1 → 2 → 3
//   tap(x => console.log('saw:', x))
//   result:  1 → 2 → 3   (unchanged, but logs each one)
//
// Expected output:
//   tap saw: 1
//   tap saw: 2
//   tap saw: 3
//   tap saw: 4
//   tap saw: 5
//   even: 2
//   even: 4
//   complete
// -----------------------------------------------------------------------------

// import { Observable } from 'rxjs';
// import { filter, tap } from 'rxjs/operators';
//
// const numbers$ = new Observable<number>((subscriber) => {
//   subscriber.next(1);
//   subscriber.next(2);
//   subscriber.next(3);
//   subscriber.next(4);
//   subscriber.next(5);
//   subscriber.complete();
// });
//
// numbers$
//   .pipe(
//     tap((value) => console.log('tap saw:', value)),   // logs every value, passes all through
//     filter((value) => value % 2 === 0),               // only even values continue
//   )
//   .subscribe({
//     next: (value) => console.log('even:', value),
//     complete: () => console.log('complete'),
//   });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 4
//
// Task 4.1 — filter only
//   Create an Observable that emits: 10, 25, 30, 45, 50.
//   Use filter to only let through values greater than 20.
//   Log each result.
//   Expected: 25, 30, 45, 50

// import { filter, Observable } from 'rxjs';
//
// const numbers$ = new Observable<number>((observer) => {
//   observer.next(10);
//   observer.next(25);
//   observer.next(30);
//   observer.next(45);
//   observer.next(50);
//   observer.complete();
// });
//
// numbers$
//   .pipe(filter(value => {
//     return value > 20;
//   }))
//   .subscribe({
//     next: value => console.log(value),
//     error: err => console.log(err),
//     complete: () => console.log('completed'),
//   });

// Task 4.2 — tap for debugging
//   Create an Observable that emits: 'alice', 'bob', 'charlie'.
//   Chain: tap (log raw value) → map (uppercase) → tap (log transformed value).
//   Subscribe and log the final value.
//   Write a comment explaining what tap is useful for here vs just using console.log
//   inside map.

// import { from, tap } from 'rxjs';
// import { map } from 'rxjs/operators';
//
// const from$ = from(['alice', 'bob', 'charlie']);
//
// from$
//   .pipe(
//     tap(val => console.log(val)),
//     map(value => value.toUpperCase()),
//   )
//   .subscribe({
//     next: value => console.log(value),
//     error: err => console.log(err),
//     complete: () => console.log('complete'),
//   });


// Task 4.3 — filter + map together
//   Create an Observable that emits numbers 1 through 6.
//   Chain: filter (only odd numbers) → map (multiply by 100).
//   Predict the output before running, write it as a comment.
//   Expected: 100, 300, 500

// import { filter, from } from 'rxjs';
// import { map } from 'rxjs/operators';
//
// const from$ = from([1, 2, 3, 4, 5, 6]);
//
// from$
//   .pipe(
//     filter((value) => value % 2 !== 0),
//     map((value) => value * 100),
//   )
//   .subscribe({
//     next: (value) => console.log(value),
//     error: (err) => console.log(err),
//     complete: () => console.log('complete'),
//   });

// Task 4.4 — Predict: does complete fire after filter drops everything?
//   Create an Observable that emits 1, 2, 3.
//   Use filter(value => value > 10) — nothing passes through.
//   Subscribe with next, error, complete handlers.
//   Predict: does complete fire? Does next fire? Write your answer first.

//yes
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 5 — switchMap: when each value triggers a new Observable
//
// map() transforms a value into another value.
// switchMap() transforms a value into a new Observable — and subscribes to it.
//
// This is the operator that confuses people most, so we build it slowly.
//
// WHY IT EXISTS:
// Imagine a search box. Every keystroke emits a value. For each value
// you want to fire an HTTP request (another Observable). You don't want
// all requests running at once — if the user typed 'ph', then 'pho', then 'phon',
// you only care about the result for 'phon'. The previous two are stale.
//
// switchMap does two things:
//   1. For each incoming value, creates a new inner Observable
//   2. CANCELS the previous inner Observable when a new value arrives
//
// map:        value  →  new value          (same stream)
// switchMap:  value  →  new Observable     (switches to a new stream)
//
// Expected output:
//   result for: 1
//   result for: 2
//   result for: 3
// -----------------------------------------------------------------------------

// import { Observable } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
//
// // Outer Observable — emits the "trigger" values
// const trigger$ = new Observable<number>((subscriber) => {
//   subscriber.next(1);
//   subscriber.next(2);
//   subscriber.next(3);
//   subscriber.complete();
// });
//
// trigger$
//   .pipe(
//     switchMap((value) => {
//       // For each trigger value, return a NEW Observable
//       // switchMap subscribes to it and emits its values downstream
//       return new Observable<string>((subscriber) => {
//         subscriber.next(`result for: ${value}`);
//         subscriber.complete();
//       });
//     }),
//   )
//   .subscribe({
//     next: (value) => console.log(value),
//     complete: () => console.log('complete'),
//   });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 5
//
// Task 5.1 — switchMap basics
//   Create an outer Observable that emits: 'cat', 'dog', 'bird'.
//   Use switchMap to return a new Observable for each that emits:
//     'fetching data for: <animal>'
//   Subscribe and log each result.
//   Expected:
//     fetching data for: cat
//     fetching data for: dog
//     fetching data for: bird

// import { Observable, switchMap } from 'rxjs';
//
// const animals$ = new Observable<string>((observer) => {
//   observer.next('cat');
//   observer.next('dog');
//   observer.next('bird');
// });
//
// animals$
//   .pipe(switchMap((value) => {
//     return new Observable<string>((observer) => {
//       observer.next(value);
//       observer.complete();
//     });
//   }))
//   .subscribe({
//     next: (value) => {
//       console.log('value ==>', value);
//     },
//     error: (error) => {
//       console.log('error ==>', error);
//     },
//     complete: () => {
//       console.log('complete');
//     },
//   });

// Task 5.2 — switchMap vs map: spot the difference
//   Rewrite Task 5.1 using map instead of switchMap.
//   Does it still work? What is the type of value in the next() handler?
//   Write a comment explaining the difference in what each one returns.


// import { Observable } from 'rxjs';
//
// const animals$ = new Observable<string>((observer) => {
//   observer.next('cat');
//   observer.next('dog');
//   observer.next('bird');
// });
//
// animals$
//   .subscribe({
//     next: (value) => {
//       console.log('value ==>', value);
//     },
//     error: (error) => {
//       console.log('error ==>', error);
//     },
//     complete: () => {
//       console.log('complete');
//     },
//   });


// Task 5.3 — switchMap with a Promise (the real-world pattern)
//   Outer Observable emits: 1, 2, 3 (simulate user IDs).
//   Use switchMap to return from(fetch) — simulate a DB lookup with a Promise:
//     (id) => Promise.resolve({ id, name: `User ${id}` })
//   Wrap the Promise with from() inside switchMap.
//   Subscribe and log each user object.
//   Expected:
//     { id: 1, name: 'User 1' }
//     { id: 2, name: 'User 2' }
//     { id: 3, name: 'User 3' }


// import { of, switchMap } from 'rxjs';
//
// const apiRes$ = of(1, 2, 3);
//
// apiRes$
//   .pipe(switchMap((id) => Promise.resolve({ id, name: `User ${id}` })))
//   .subscribe({
//     next: value => console.log(value),
//     error: err => console.log(err),
//     complete: () => console.log('complete'),
//   });

// Task 5.4 — Predict: cancellation
//   This is the key behaviour of switchMap. Read this code and predict the output
//   BEFORE running it. Write your prediction as a comment, then verify.
//
//   import { Subject } from 'rxjs';
//   import { switchMap } from 'rxjs/operators';
//
//   const subject$ = new Subject<number>();
//
//   subject$.pipe(
//     switchMap(value =>
//       new Observable(sub => {
//         setTimeout(() => {
//           sub.next(`response for ${value}`);
//           sub.complete();
//         }, 200);
//       })
//     )
//   ).subscribe(value => console.log(value));
//
//   subject$.next(1);   // fires, starts a 200ms timer
//   subject$.next(2);   // fires immediately — cancels the timer for 1
//   subject$.next(3);   // fires immediately — cancels the timer for 2
//
//   // Question: how many lines are logged? Which value(s)?
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
