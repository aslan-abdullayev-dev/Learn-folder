// =============================================================================
// TUTORIAL 2 — Custom Decorators in Plain TypeScript
// Run: npx ts-node src/playground/02-custom-decorators.ts
// =============================================================================
//
// Work through steps one at a time.
// Comment out the previous step before uncommenting the next.
// =============================================================================
//
// THE PROBLEM
// -----------
// In Tutorial 1 we saw that SetMetadata writes metadata onto a function, and
// the guard reads it back. But how does SetMetadata *attach itself* to a route
// handler in the first place? And how does NestJS know to call it with the
// handler as the target?
//
// The answer is decorators. A decorator is just a function TypeScript calls
// automatically when you use the @ syntax — and it passes the target (class,
// method, or parameter) in for you.
//
// This tutorial builds decorators from zero in plain TypeScript, no NestJS,
// so the mechanism is completely visible before NestJS wraps it.
// =============================================================================

// -----------------------------------------------------------------------------
//* STEP 1 — The simplest decorator: a class decorator
//
// A class decorator is a function that receives the class constructor.
// TypeScript calls it automatically when you put @ in front of it.
//
// Expected output:
//   Decorator called with: [class User]
//   User { name: 'Alice' }
// -----------------------------------------------------------------------------

// function Log(constructor: Function) {
//   console.log('Decorator called with:', constructor);
// }

//
// @Log
// class User {
//   constructor(public name: string) {}
// }
//
// const u = new User('Alice');
// console.log(u);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 1
//
// Task 1.1 — Entity registration
//   You are building a mini ORM. Write a @Entity decorator that logs the class
//   name when the class is defined, simulating entity registration.
//   Use it on a Product class with a name property.
//   Expected: "Registering entity: Product"
//

// const Entity = () => {
//   return function(construnctor: Function) {
//     console.log('construnctor ==>', construnctor.name);
//   };
// };
//
// @Entity()
// class Product {
// }

// Task 1.2 — Read prototype methods
//   Write a @Inspect decorator that logs all method names defined on the class
//   prototype (Object.getOwnPropertyNames(constructor.prototype)).
//   Use it on an OrderService class that has placeOrder() and cancelOrder().
//   Expected: "Methods: constructor, placeOrder, cancelOrder"

// const Inspect = () => {
//   return (constructor: Function) => {
//     console.log('names ==>', Object.getOwnPropertyNames(constructor.prototype));
//   };
// };
//
// @Inspect()
// class OrderService {
//   placeOrder() {
//   }
//
//   cancelOrder() {
//   }
// }

//
// Task 1.3 — Constructor argument count
//   Write a @RequireArgs(n) decorator (just the class decorator shape, no factory yet)
//   that logs how many parameters the constructor expects via constructor.length.
//   Use it on a PaymentService class whose constructor takes (amount, currency).
//   Expected: "PaymentService expects 2 constructor args"

// const RequireArgs = (constructor: Function) => {
//   console.log(`${constructor.name} expects ${constructor.length} constructor args`);
// };
//
// @RequireArgs
// class PaymentService {
//   constructor(amount: number, currency: string) {}
// }

//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 2 — Break it: @ without parentheses vs @ with parentheses
//
// There are two shapes:
//   @Log          ← decorator reference   — TypeScript calls Log(target) for you
//   @Log()        ← decorator factory     — YOU call Log() first, it returns the decorator
//
// If you put parentheses on a decorator that doesn't return a function, it breaks.
//
// Expected output:
//   TypeError: Log is not a decorator
//   (or a similar error depending on your TS version)
// -----------------------------------------------------------------------------

// function Log(constructor: Function) {
//   console.log('Decorator called with:', constructor);
// }
//
// @Log()   // <-- wrong: Log() returns undefined, not a decorator function
// class User {
//   constructor(public name: string) {}
// }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 2
//
// Task 2.1 — Spot the bug
//   A teammate wrote this. Why does it crash? Fix it without changing the @Guard()
//   call site (keep the parentheses).
//
// const Guard = () => {
//   return (constructor: Function) => {
//     console.log('Guarding:', constructor.name);
//   };
// };
//
// @Guard()
// class AdminController {
// }

//
// Task 2.2 — Predict the output
//   Before running, write down what you expect each version to print or throw.
//   Then uncomment and verify.
//
//   Version A:
//     function Tag(constructor: Function) { console.log('A:', constructor.name); }
//     @Tag
//     class Invoice {}
//
//   Version B:
//     function Tag() { console.log('B: Tag called'); }
//     @Tag()
//     class Invoice {}
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 3 — Decorator factory: a function that returns a decorator
//
// When you need to pass arguments (@Log('verbose')), you need a factory —
// a function that takes your arguments and returns the actual decorator function.
// This is the pattern behind @SetMetadata('isPublic', true).
//
// Expected output:
//   [verbose] Decorator called with: [class User]
// -----------------------------------------------------------------------------

// function Log(level: string) {                       // factory — takes your args
//   return function(constructor: Function) {          // returns the actual decorator
//     console.log(`[${level}] Decorator called with:`, constructor);
//   };
// }

//
// @Log('verbose')   // Log('verbose') runs first → returns the inner function → @ applies it
// class User {
//   constructor(public name: string) {
//   }
// }
//
// new User('Alice');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 3
//
// Task 3.1 — @Role() decorator
//   Build a @Role('admin' | 'vendor' | 'customer') factory decorator that logs
//   "UserController requires role: admin" at class definition time.
//   Use it on a UserController class.

// const Role = (role: 'admin' | 'vendor' | 'customer') => {
//   return (constructor: Function) => {
//     console.log(`${constructor.name} requires role: ${role}`);
//   };
// };
//
// @Role('admin')
// class UserController {
// }

//
// Task 3.2 — @Deprecated(reason) decorator
//   Build a @Deprecated(reason: string) factory that logs a warning when the
//   class is defined: "WARNING: LegacyOrderService is deprecated — use OrderService instead"
//   Use it on a LegacyOrderService class.
//


// const Deprecated = (reason: string) => {
//   return (constructor: Function) => {
//     console.log(`${constructor.name} is deprecated. ${reason}`);
//   };
// };
//
// @Deprecated('use OrderService instead')
// class LegacyOrderService {
// }


// Task 3.3 — Multiple decorators stacked
//   Stack @Role('vendor') and @Log('info') on the same class.
//   Before running, predict the order they execute in (top-down or bottom-up?).
//   Then verify by running.
//
// @Role('vendor')
// @Log('info')
// class Stack {
// }

//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 4 — Method decorator
//
// Method decorators receive three arguments:
//   target       — the class prototype (not the instance)
//   propertyKey  — the method name as a string
//   descriptor   — the PropertyDescriptor (contains the actual function as .value)
//
// Expected output:
//   Method decorated: getProfile
// -----------------------------------------------------------------------------

// function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//   console.log('Method decorated:', propertyKey);
//   console.log('target, propertyKey, descriptor ==>', target, propertyKey, descriptor);
// }
//
// class UserController {
//   name = 'sadsas';
//
//   @LogMethod
//   getProfile() {
//     return 'profile data';
//   }
// }

// new UserController(); // decorator runs at class definition, not at call time


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 4
//
// Task 4.1 — Log all three arguments
//   Write a @Trace decorator that logs target (prototype), propertyKey, and
//   descriptor.value for each decorated method.
//   Use it on placeOrder() in an OrderService.
//   Notice: target is the prototype object, not the class or an instance.

//
// function Trace(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//   console.log('Method decorated:', propertyKey);
//   console.log('target, propertyKey, descriptor ==>', target, propertyKey, descriptor);
// }
//
// class OrderService {
//   @Trace
//   placeOrder() {
//     return 'profile data';
//   }
// }

//
// Task 4.2 — Read-only method
//   Write a @ReadOnly decorator that sets descriptor.writable = false.
//   Use it on getTotal() in a CartService.
//   After decoration, try: CartService.prototype.getTotal = () => 'hacked';
//   Expected: silently fails (or throws in strict mode) — method is locked.

// const ReadOnly = (_target, _propertyKey, decriptor) => {
//   decriptor.writable = false;
// };
//
// class CartService {
//   @ReadOnly
//   getTotal() {
//   }
// }
//
// CartService.prototype.getTotal = () => 'hacked';

//
// Task 4.3 — Enumerate vs hide
//   Class methods are non-enumerable by default, so @Hidden alone is unobservable.
//   First write a @Visible decorator (enumerable = true), then a @Hidden decorator
//   (enumerable = false). Apply @Visible to _internalSync() and confirm it appears
//   in Object.keys(SyncService.prototype). Then swap to @Hidden and confirm it
//   disappears. Call it directly both times to confirm it still works.
//   Note: always check Object.keys(SyncService.prototype), never Object.keys(instance)
//   — prototype methods never appear on instances regardless of enumerable.

// const Visible = (_target, _propertyKey, descriptor) => {
//   descriptor.enumerable = true;
// };
//
// const Hidden = (_target, _propertyKey, descriptor) => {
//   descriptor.enumerable = false;
// };
//
// class SyncService {
//   @Visible // swap with @Hidden to see it disappear
//   _internalSync() {}
// }
//
// console.log('Object.keys(SyncService.prototype) ==>', Object.keys(SyncService.prototype));
// // @Visible → ['_internalSync']
// // @Hidden  → []
//
// new SyncService()._internalSync(); // still callable either way

//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 5 — Break it: confusing decoration time vs call time
//
// Decorators run ONCE when the class is defined — not each time the method is called.
// This trips people up.
//
// Expected output:
//   Method decorated: getProfile     <- printed once at class definition
//   (nothing else — decorator doesn't run again when you call getProfile)
// -----------------------------------------------------------------------------

// function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//   console.log('Method decorated:', propertyKey);
// }
//
// class UserController {
//   @LogMethod
//   getProfile() {
//     return 'profile data';
//   }
// }
//
// const ctrl = new UserController();
// ctrl.getProfile(); // does NOT trigger the decorator again
// ctrl.getProfile(); // same — decorator already ran at definition

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 5
//
// Task 5.1 — Predict before running
//   How many times does "decorated" print if you create 3 instances and call
//   the method 5 times each? Write your answer as a comment, then verify.
//
//   Answer 1 time
//   function Mark(target: any, key: string, desc: PropertyDescriptor) {
//     console.log('decorated');
//   }
//   class ReportService {
//     @Mark
//     generate() {}
//   }
//   new ReportService().generate();
//   new ReportService().generate();
//   new ReportService().generate();
//   new ReportService().generate();
//   new ReportService().generate();
//
// Task 5.2 — Confuse a teammate (then fix it)
//   A teammate expects this to log "called" on every request:

// function Track(target: any, key: string, desc: PropertyDescriptor) {
//   const method = desc.value;
//
//   desc.value = () => {
//     console.log('called');
//     method();
//   };
// }
//
// class AnalyticsController {
//   @Track
//   trackEvent() {
//   }
// }
//
// const c = new AnalyticsController();
// c.trackEvent();
// c.trackEvent();

//   Explain why it doesn't, then rewrite @Track so it actually logs "called"
//   every time trackEvent() is invoked. (Hint: you need Step 6.)
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 6 — Wrapping a method with a decorator (modifying the descriptor)
//
// You can replace descriptor.value to wrap the original method.
// This is how logging/timing decorators work in the wild.
//
// Expected output:
//   Before getProfile
//   profile data
//   After getProfile
// -----------------------------------------------------------------------------

// function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//   const original = descriptor.value;                   // save original method
//
//   descriptor.value = function (...args: any[]) {       // replace with wrapper
//     console.log(`Before ${propertyKey}`);
//     const result = original.apply(this, args);         // call original
//     console.log(`After ${propertyKey}`);
//     return result;
//   };
// }
//
// class UserController {
//   @LogMethod
//   getProfile() {
//     console.log('profile data');
//   }
// }
//
// new UserController().getProfile();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 6
//
// Task 6.1 — @Timer decorator
//   Write a @Timer decorator that measures how long a method takes using
//   Date.now() before and after, then logs: "placeOrder took 3ms"
//   Use it on a placeOrder() method that does some fake work (a for loop).
//
// Task 6.2 — @Retry(n) decorator
//   Write a @Retry(times: number) factory decorator.
//   If the method throws, retry it up to `times` times before re-throwing.
//   Use it on a fetchInventory() method that throws on the first 2 calls
//   then succeeds on the 3rd (use a counter variable outside the class).
//   Expected: method eventually succeeds after retries.
//
// Task 6.3 — @Validate decorator
//   Write a @Validate decorator that checks all arguments are non-null/undefined
//   before calling the original method. If any arg is null or undefined, throw:
//   "createOrder: argument at index 1 is null or undefined"
//   Use it on createOrder(userId: string, cartId: string).
//   Test with createOrder('u1', null) — should throw before the method body runs.
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 7 — Decorator + Metadata (the SetMetadata pattern, done manually)
//
// Combining what we learned in Tutorial 1 with decorators:
// write metadata in a decorator, read it back with Reflect.
//
// This is exactly what SetMetadata('isPublic', true) does under the hood.
//
// Expected output:
//   true
//   undefined
// -----------------------------------------------------------------------------

// import 'reflect-metadata';
//
// // Our own mini SetMetadata
// function Mark(key: string, value: any) {             // factory
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     Reflect.defineMetadata(key, value, descriptor.value); // write onto the method
//   };
// }
//
// class UserController {
//   @Mark('isPublic', true)
//   login() {}
//
//   @Mark('isPublic', false)
//   getProfile() {}
// }
//
// const ctrl = new UserController();
// console.log(Reflect.getMetadata('isPublic', ctrl.login));       // true
// console.log(Reflect.getMetadata('isPublic', ctrl.getProfile));  // false

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 7
//
// Task 7.1 — @RequirePermission clone
//   Recreate NestJS's @RequirePermission without importing NestJS.
//   Write a @Permission(value: string) decorator that stores the value under
//   the key 'permission' on the method.
//   Then write a fake guard function:
//     function canActivate(method: Function, userPermissions: string[]): boolean
//   that reads 'permission' off the method and checks if userPermissions includes it.
//   Test: canActivate(ctrl.deleteUser, ['users:read']) → false
//         canActivate(ctrl.deleteUser, ['users:delete']) → true
//
// Task 7.2 — @Roles([]) + guard
//   Write a @Roles(roles: string[]) decorator that stores an array under 'roles'.
//   Write a fake canActivate that checks if the user's role is in the array.
//   Use it on getAdminPanel() with @Roles(['admin', 'superadmin']).
//   Test with role 'vendor' → false, role 'admin' → true.
//
// Task 7.3 — Multiple metadata keys on one method
//   Put both @Permission('orders:read') and @Roles(['admin', 'vendor']) on the
//   same getOrders() method. Read both back and confirm they are stored
//   independently under their own keys.
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 8 — Parameter decorator
//
// Parameter decorators receive:
//   target       — the class prototype
//   propertyKey  — the method name
//   paramIndex   — the index of the parameter (0-based)
//
// NestJS uses this for @Body(), @Param(), @CurrentUser() etc.
// They mark which parameter should receive which value at runtime.
//
// Expected output:
//   Parameter decorator called on method: login, param index: 1
// -----------------------------------------------------------------------------

// function LogParam(target: any, propertyKey: string, paramIndex: number) {
//   console.log(`Parameter decorator called on method: ${propertyKey}, param index: ${paramIndex}`);
// }
//
// class AuthController {
//   login(email: string, @LogParam password: string) {}
// }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TASKS — Step 8
//
// Task 8.1 — @CurrentUser() clone
//   Write a @CurrentUser() parameter decorator that stores the param index under
//   the key 'currentUserIndex' on the method using Reflect.defineMetadata.
//   Use it on: getProfile(@CurrentUser() user: any, includeOrders: boolean)
//   Read it back and log: "currentUser is at index: 0"
//
// Task 8.2 — @Body() clone
//   Write a @Body() parameter decorator that stores param index under 'bodyIndex'.
//   Use it on: createOrder(userId: string, @Body() payload: any)
//   Write a fake dispatcher function that reads 'bodyIndex' and injects a mock
//   payload object at the right position before calling the method.
//
// Task 8.3 — Multiple parameter decorators on one method
//   Decorate: processPayment(@CurrentUser() user: any, @Body() payload: any)
//   Log both indices back. Confirm each key stores the correct index independently.
//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------------------------------
//* STEP 9 — Connect to real code (no code to run — read and understand)
//
// Open: src/core/decorators/public.decorator.ts
//   export const IsPublic = () => SetMetadata('isPublic', true);
//
//   IsPublic is a decorator factory (Step 3 pattern).
//   Calling IsPublic() returns SetMetadata('isPublic', true).
//   SetMetadata('isPublic', true) returns a method decorator.
//   @ applies that decorator to the route handler → Reflect.defineMetadata runs.
//
// Open: src/core/decorators/require-permission.decorator.ts
//   export const RequirePermission = (value: string) => SetMetadata('permission', value);
//
//   Same factory pattern — but takes an argument (the permission string).
//   @RequirePermission('users:read') writes 'permission: users:read' onto the handler.
//   The PermissionsGuard reads it back with reflector.get('permission', handler).
//
// Full picture:
//   @IsPublic()
//     → IsPublic() runs         → returns SetMetadata('isPublic', true)
//     → SetMetadata(...) runs   → returns a method decorator function
//     → @ applies it            → Reflect.defineMetadata('isPublic', true, handler)
//
//   @RequirePermission('users:read')
//     → RequirePermission('users:read') runs → returns SetMetadata('permission', 'users:read')
//     → same chain as above
//     → Reflect.defineMetadata('permission', 'users:read', handler)
//* -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// MINI QUIZ — answer in comments, then move to Tutorial 3
//
// Q1. What is the difference between @Log and @Log() on a class?
// A:
//
// Q2. When does a decorator run — at class definition or when the method is called?
// A:
//
// Q3. A method decorator receives three arguments. What are they?
// A:
//
// Q4. How does a decorator factory work? Why do we need one when passing arguments?
// A:
//
// Q5. In Step 7, why do we write metadata onto descriptor.value instead of the method name string?
// A:
//
// Q6. What decorator type does NestJS use for @Body() and @Param() — class, method, or parameter?
// A:
// -----------------------------------------------------------------------------
