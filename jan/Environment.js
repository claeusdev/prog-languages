/*
 * Environment: names storage
 *
 * */

export class Environment {
  // initializes the environment record
  constructor(record = {}) {
    this.record = record;
  }
  // Creates a variable and assigns a value
  define(name, value) {
    this.record[name] = value;
    return value;
  }

  lookup(name) {
    if (!this.record.hasOwnProperty(name))
      throw new ReferenceError(`Variable ${name} is not defined`);
    return this.record[name];
  }
}
