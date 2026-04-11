// =============================================================================
// TUTORIAL 1 — TypeScript Decorators & Metadata
// Run: npx ts-node src/playground/01-metadata.ts
// =============================================================================
//
// Work through steps one at a time.
// Comment out the previous step before uncommenting the next.
// =============================================================================

// -----------------------------------------------------------------------------
// STEP 1 — Raw Reflect API
// Expected output:
//   true
//   undefined
// -----------------------------------------------------------------------------

// import 'reflect-metadata'; // side-effect import — patches global Reflect object
//
// function loginHandler() {}
//
// Reflect.defineMetadata('isPublic', true, loginHandler); // write metadata
// const isPublic = Reflect.getMetadata('isPublic', loginHandler); // read it back
// console.log(isPublic); // true
//
// function profileHandler() {}
// const isPublicProfile = Reflect.getMetadata('isPublic', profileHandler);
// console.log(isPublicProfile); // undefined — no metadata attached

// -----------------------------------------------------------------------------
// STEP 2 — Break it: wrong key
// Expected output:
//   undefined   <- typo in key returns undefined silently, no error thrown
// -----------------------------------------------------------------------------

// import 'reflect-metadata';
//
// function loginHandler() {}
// Reflect.defineMetadata('isPublic', true, loginHandler);
//
// const isPublic = Reflect.getMetadata('ispublic', loginHandler); // typo — lowercase
// console.log(isPublic); // undefined

// -----------------------------------------------------------------------------
// STEP 3 — Break it: read before write
// Expected output:
//   undefined   <- metadata does not exist yet when you read it
// -----------------------------------------------------------------------------

// import 'reflect-metadata';
//
// function loginHandler() {}
//
// const isPublic = Reflect.getMetadata('isPublic', loginHandler); // read BEFORE write
// console.log(isPublic); // undefined
// Reflect.defineMetadata('isPublic', true, loginHandler); // too late

// -----------------------------------------------------------------------------
// STEP 4 — NestJS wrappers: SetMetadata + Reflector
// These wrap the raw Reflect API with TypeScript generics and NestJS context helpers.
// Expected output:
//   true
// -----------------------------------------------------------------------------

// import 'reflect-metadata';
// import { SetMetadata } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
//
// function loginHandler() {
// }
//
// // SetMetadata returns a decorator function — you call it with the target to apply it
// const decorator = SetMetadata('isPublic', true);
// decorator(loginHandler);
//
// // Reflector.get<T> is typed Reflect.getMetadata
// const reflector = new Reflector();
// const isPublic = reflector.get<boolean>('isPublic', loginHandler);
// console.log(isPublic); // true

// -----------------------------------------------------------------------------
// STEP 5 — Connect to real code (no code to run — read and understand)
//
// Open: src/core/decorators/public.decorator.ts
//   export const IsPublic = () => SetMetadata('isPublic', true);
//
//   IsPublic() is just SetMetadata('isPublic', true) wrapped in a function
//   so it can be used as a decorator: @IsPublic()
//
// Open: src/core/guards/jwt-auth.guard.ts
//   const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
//   if (isPublic) return true;
//
//   context.getHandler() returns the route handler function (like loginHandler above).
//   reflector.get reads the metadata attached to it.
//   If isPublic is true — skip auth entirely.
//
// Full picture:
//   @IsPublic() on a route  ->  SetMetadata writes 'isPublic: true' onto the handler
//   Guard runs              ->  Reflector reads 'isPublic' from the handler
//   If true                 ->  canActivate returns true, request passes through
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// MINI QUIZ — answer in comments, then move to Tutorial 2
//
// Q1. What does SetMetadata('isPublic', true) actually do under the hood?
// A: SetMetadata calls Reflect.defineMetadata directly, no Reflector involved)
//
// Q2. Why does reading metadata with a typo in the key return undefined instead of throwing?
// A: because it object property reach behaviour
//
// Q3. Why does the playground file need `import 'reflect-metadata'` but the real NestJS app does not?
// A: nest js will inject it once it runs but tutorial file is outside of nest project
//
// Q4. In jwt-auth.guard.ts, what does context.getHandler() return?
// A: route handler
//
// Q5. If you attach metadata with key 'isPublic' but the guard reads key 'ispublic', what happens to the route?
// A: reflector.get('ispublic', handler) returns undefined. In the guard it then skips checking it

// -----------------------------------------------------------------------------
