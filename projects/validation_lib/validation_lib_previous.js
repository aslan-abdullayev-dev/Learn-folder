class CVString {
  #nullable = false;
  #value = "";
  #key = "";
  nullable(isNullable) {
    this.#nullable = isNullable;
    return this;
  }
  setStringValue(newVal) {
    this.#value = newVal;
  }
  setStringKey(key) {
    this.#key = key;
  }
  getStringKey() {
    return this.#key;
  }
  validate() {
    let message = "";
    if (typeof this.#value !== "string") {
      message = "field has to be a string";
    }
    if (!this.#nullable && !this.#value) {
      message = "field is required";
    }
    return message;
  }
}

class CVS {
  static #values = {};
  static #errors = {};
  static #shape = {};
  static shape(validationSchema) {
    this.#shape = validationSchema;
    return this;
  }
  static string() {
    return new CVString();
  }
  static validate(data) {
    for (const shapeKey in this.#shape) {
      this.#shape[shapeKey].setStringValue(data[shapeKey]);
      this.#shape[shapeKey].setStringKey(shapeKey);
      const errMessage = this.#shape[shapeKey].validate();
      if (errMessage) {
        this.#errors[shapeKey] = errMessage;
      } else {
        this.#values[shapeKey] = data[shapeKey];
      }
    }

    if (Object.keys(this.#errors).length) {
      return { isValid: false, data: this.getErrors() };
    } else {
      return { isValid: true, data: this.getValues() };
    }
  }
  static getValues() {
    return this.#values;
  }
  static getErrors() {
    return this.#errors;
  }
}

const myData = {
  name: "Aslan",
  surname: 5,
};

const mySchema = CVS.shape({
  name: CVS.string(),
  surname: CVS.string().nullable(true),
});

const validatedVals = mySchema.validate(myData);

console.log(validatedVals);
