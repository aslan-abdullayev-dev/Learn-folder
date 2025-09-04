// !--------------------------------------------------
// !--------------------------------------------------
// * CVS class
// * should return  {values, errors, validate, static string, static number, static object}

// * CVS.shape() :
// * should return CSV class instance
// ! shape() should be class itself
// ! when it returns CSV class instance it is not possible to access latest data of CSV properties {schema, errors, values}

// * CVS.string() :
// * should return CSV string class instance. {#key, #isValid, #errMessage, validate}

// * CVS.number() :
// * should return CSV string class instance. {key, isValid, errMessage, validate}

// * CVS.object() :
// * should return CSV object class instance. {key, isValid, errMessage, validate}
// !--------------------------------------------------
// !--------------------------------------------------
class CVS {
  static values = {};
  static errors = {};
  static globalSchema = {};
  static validate() {}
  static shape() {
    return this;
  }
  static string() {
    return new CVSString();
  }
  static object(obj) {
    const cvsObj = new CVSObject(obj);
    this.schema = cvsObj;
    return cvsObj;
  }
}

class CVSType {
  key = "";
  errMessage = "";
  isValid = false;
  value = "";
  schema = {};
}

class CVSString extends CVSType {}
class CVSObject extends CVSType {
  constructor(obj) {
    super();
    this.schema = obj;
  }
}

const myData = {
  name: "Aslan",
  surname: "Abdullayev",
  jobInfo: {
    title: "Developer",
  },
  hobbies: ["programming", "games"],
};

// !---------------------------------------
// const mySchema = CVS.shape().object({
// name: CVS.string(),
// surname: CVS.string().nullable(true),
// jobInfo: CVS.object({
//   title: CVS.string(),
// }),
// hobbies: CVS.array().min(5).of(CVS.string()),
// });
// const validatedVals = mySchema.validate(myData);
// !---------------------------------------
const mySchema = CVS.shape(
  CVS.object({
    name: CVS.string(),
    jobInfo: CVS.object({
      title: CVS.string(),
    }),
  })
);

console.log(mySchema);
