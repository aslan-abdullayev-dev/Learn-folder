// yup adli clasimiz var

// bu klasin icinde static methodlar var (ex: yup.string())

// bu static metodlar ozleri de arxa planda classlarin instance-larini yaradir (ex: yup.string().required())

// her bir type clasi (ex: object, string, number) geriye schema clas instance qaytarir

// schema icersinde validate metodu cagrilir, icerisine value ve schema gonderilir


class AVL {
  static string() {
    return new String_AVL();
  }
}

class String_AVL {
  #type = "string";
  #checkers = [];

  constructor() {
    this.#checkers.push({
      method: (value) => typeof value === this.#type,
      message: `Value must be a string`
    })
  }

  validate(value) {
    const errors = []
    this.#checkers.forEach(checker => {
      if (!checker.method(value)) {
        errors.push(checker.message);
      }
    })
    return {
      isValid: errors.length === 0,
      errors: errors,
      // transformed values
    }
  }

  min(minLength) {
    this.#checkers.push({
      method: (value) => value.length >= minLength,
      message: `Value must be at least ${minLength} characters long`
    })
    return this;
  }

  max(maxLength) {
    this.#checkers.push({
      method: (value) => value.length <= maxLength,
      message: `Value must be at most ${maxLength} characters long`
    })
    return this;
  }
}


export const runAVL = () => {
  console.log("runAVL");

  const strSchema = AVL.string().min(5)
  const res = strSchema.validate(5)
  const res2 = strSchema.validate("a")
  const res3 = strSchema.validate("aslan")
  console.log("res ==>", res);
  console.log("res2 ==>", res2);
  console.log("res3 ==>", res3);
}






/*
When designing a validation library like AVL, you should consider the following approaches for user experience and API design:

1. **Validation Result Abstraction**:
   - Instead of just returning a boolean from the `validate` method, return a result object that includes:
     - Whether the value is valid (`isValid` boolean).
     - An array of error messages (if any).
     - Optionally, the validated value (possibly transformed).
   - This is similar to how Yup works: Yup's `validate` method returns a Promise that resolves with the value if valid, or throws a ValidationError containing error messages if invalid. Yup also provides a `validateSync` method for synchronous validation.

2. **Error Handling**:
   - Provide a way for users to access the current errors after validation. This can be via a method like `getErrors()` or by returning errors in the result object.
   - Avoid storing errors as internal state on the schema instance, since schemas are typically reusable and stateless in libraries like Yup.

3. **API Consistency**:
   - Make your API chainable, so users can build up validation rules fluently (as you have started).
   - Ensure that validation does not mutate the schema instance, so schemas can be reused for multiple values.

4. **Yup's Approach**:
   - Yup schemas are immutable and reusable.
   - Validation returns a Promise (async) or throws (sync), and errors are provided as an array of messages.
   - Yup does not store errors on the schema instance; errors are returned as part of the validation result or thrown as exceptions.

5. **Recommendation**:
   - Return a result object from `validate` (or throw on error, or both, depending on sync/async).
   - Provide clear access to error messages.
   - Keep schema instances stateless and reusable.
   - Optionally, provide both sync and async validation methods.

This approach gives users flexibility, clear error reporting, and a familiar API similar to established libraries like Yup.
*/
/*
Yes, you are correct: you should remove the `errors` property from your class and instead return errors as part of the response from the `validate` method. This keeps your schema instances stateless and reusable, which is a best practice for validation libraries.

Regarding the `checkers` property: **you should preserve it**. The `checkers` property (or a similar mechanism) is essential for storing the validation rules that have been chained onto the schema instance. This allows you to build up a list of validation functions (or "checkers") that are applied in order when `validate` is called. This is how libraries like Yup and Joi work internally.

**Summary:**
- Remove the `errors` property from your class.
- Return a result object from `validate` that includes `isValid`, `errors` (array), and optionally the validated value.
- Keep the `checkers` property (or similar) to store the validation rules for each schema instance.

This approach will give you a stateless, reusable, and user-friendly validation API.
*/
