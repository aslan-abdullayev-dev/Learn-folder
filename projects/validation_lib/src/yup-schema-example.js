// Comprehensive Yup validation schema example
// Install Yup: npm install yup

// Import the yup library for schema validation
import * as yup from 'yup';

// Define the main validation schema using yup.object()
// Not every Yup schema must start with yup.object({}). 
// You can create schemas for primitive types directly, e.g. yup.string(), yup.number(), etc.
// However, for validating an object with multiple fields, you use yup.object({...}).
export const schema = yup.object({
  // Validate 'name' as a required string between 2 and 50 characters
  // name: user's full name
  name: yup.string().required('Name is required').min(2).max(50),

  // Validate 'age' as a required number between 0 and 120
  // age: user's age
  age: yup.number().required().min(0).max(120),

  // Validate 'email' as a required email string
  // email: user's email address
  email: yup.string().email().required(),

  // Validate 'website' as an optional URL string
  // website: user's website URL
  website: yup.string().url().notRequired(),

  // When you set a default value in the schema (like .default(true)), if your input object does not have
  // the 'isActive' field, Yup will add 'isActive' with the default value (true) to the validated result.
  // However, your original input object is not changed—only the object returned by schema.validate() or
  // schema.cast() will include the defaulted field.
  isActive: yup.boolean().default(true),
  // isActive: whether the user is active
  isActive: yup.boolean().default(true),

  // Validate 'createdAt' as a date with a default value of now
  // createdAt: account creation date
  createdAt: yup.date().default(() => new Date()),

  // Validate 'uuid' as a UUID string
  // uuid: unique user identifier
  uuid: yup.string().uuid(),

  // Validate 'nickname' as a nullable string
  // nickname: optional nickname, can be null
  nickname: yup.string().nullable(),

  // Validate 'bio' as a defined string (must be present, can be empty)
  // bio: user's biography
  bio: yup.string().defined(),

  // Validate 'role' as a string that must be one of the specified values
  // role: user's role in the system
  role: yup.string().oneOf(['admin', 'user', 'guest']),

  // Validate 'forbiddenColor' as a string that must NOT be one of the specified values
  // forbiddenColor: color that is not allowed
  forbiddenColor: yup.string().notOneOf(['red', 'blue']),

  // Validate 'phone' as a string matching a 10-digit number
  // phone: user's phone number
  phone: yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits'),

  // Validate 'tags' as an array of strings, each at least 2 chars, 1-5 items
  // tags: list of user tags
  tags: yup.array().of(yup.string().min(2)).min(1).max(5),

  // Validate 'addresses' as an array of objects with street, city, and zip
  // addresses: list of user addresses
  addresses: yup.array().of(
    // Each address must have a required street, city, and a zip matching 5 digits
    yup.object({
      // street: street address
      street: yup.string().required(),
      // city: city name
      city: yup.string().required(),
      // zip: 5-digit postal code
      zip: yup.string().matches(/^\d{5}$/),
    })
  ),

  // Validate 'profile' as a nested object with avatar and dob
  // profile: user's profile information
  profile: yup.object({
    // avatar: URL to profile image
    avatar: yup.string().url(),
    // dob: date of birth, can be null
    dob: yup.date().nullable(),
  }),

  // Conditionally validate 'password' based on 'role'
  // password: required and min 8 chars if admin, else min 4 chars
  password: yup.string().when('role', {
    is: 'admin',
    then: (schema) => schema.required().min(8),
    otherwise: (schema) => schema.min(4),
  }),

  // Custom validation for 'customField' to be exactly 'foo'
  // customField: must be the string 'foo'
  customField: yup.string().test('is-foo', 'Must be foo', value => value === 'foo'),

  // Transform 'upperCaseName' to uppercase before validation
  // upperCaseName: name converted to uppercase
  upperCaseName: yup.string().transform((val) => val && val.toUpperCase()),

  // Validate 'anything' as a required mixed type (any value)
  // anything: can be any type, required
  anything: yup.mixed().required(),

  // Validate 'strictField' as a string in strict mode (no type coercion)
  // strictField: must be a string, strict mode
  strictField: yup.string().strict(),
});

// Example usage function to validate data against the schema
async function validateExample(data) {
  try {
    // Validate the data, collecting all errors (abortEarly: false)
    const valid = await schema.validate(data, { abortEarly: false });
    // Log the valid result if validation passes
    console.log('Valid:', valid);
  } catch (err) {
    // Log validation errors if validation fails
    console.error('Validation errors:', err.errors);
  }
}

// Example data object to test the schema
const exampleData = {
  // Example name
  name: 'John',
  // Example age
  age: 30,
  // Example email
  email: 'john@example.com',
  // Example website
  website: 'https://example.com',
  // Example isActive value
  isActive: false,
  // Example createdAt date
  createdAt: new Date(),
  // Example uuid
  uuid: '123e4567-e89b-12d3-a456-426614174000',
  // Example nickname (null)
  nickname: null,
  // Example bio
  bio: 'Hello!',
  // Example role
  role: 'admin',
  // Example forbiddenColor
  forbiddenColor: 'green',
  // Example phone number
  phone: '1234567890',
  // Example tags array
  tags: ['dev', 'js'],
  // Example addresses array
  addresses: [
    { street: '123 Main St', city: 'NYC', zip: '10001' },
  ],
  // Example profile object
  profile: { avatar: 'https://avatar.com/img.png', dob: null },
  // Example password
  password: 'supersecret',
  // Example customField
  customField: 'foo',
  // Example upperCaseName
  upperCaseName: 'john',
  // Example anything value
  anything: 42,
  // Example strictField
  strictField: 'strict',
};

// Set a custom error message for required fields
yup.setLocale({
  mixed: {
    required: 'This field is required',
  },
});

// Run the validation example with the sample data
// validateExample(exampleData);


// List of all common Yup string methods attached to yup.string()
// (Assuming Yup v0.32+)

const yupStringMethods = [
  "required",         // Marks the field as required (value must be present, but can be null if .nullable() is also used)
  "nullable",         // Allows the value to be null (so a field can be both required and nullable: must be present, but can be null)
  "min",              // Minimum string length
  "max",              // Maximum string length
  "length",           // Exact string length
  "email",            // Must be a valid email
  "url",              // Must be a valid URL
  "matches",          // Must match a regex
  "uuid",             // Must be a valid UUID
  "trim",             // Trims whitespace
  "lowercase",        // Converts to lowercase
  "uppercase",        // Converts to uppercase
  "ensure",           // Ensures a string (empty string if undefined/null)
  "nullable",         // Allows null
  "defined",          // Must be defined (not undefined)
  "notRequired",      // Field is not required
  "oneOf",            // Must be one of the provided values
  "notOneOf",         // Must not be one of the provided values
  "default",          // Sets a default value
  "transform",        // Custom transform function
  "test",             // Custom validation test
  "strict",           // Disables coercion and transformation
  "when",             // Conditional validation
  "concat",           // Concatenate with another schema
];

// Example: Print all string methods
console.log("Yup string methods:", yupStringMethods);

// Answer: No, there is no `validate` method on the `yup` class (the main `yup` import itself).
// The `validate` method exists on schema instances, such as those created by `yup.string()`, `yup.object()`, etc.
// Example:
const stringSchema = yup.string().required();
stringSchema.validate("hello") // <-- This works

// But this does NOT work:
// yup.validate("hello") // <-- This will throw an error: yup.validate is not a function

// If you want to validate a value, you must first create a schema instance, then call `.validate()` on it.
console.log("Does yup have a validate method?", typeof yup.validate === "function"); // false
