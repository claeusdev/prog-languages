import { equal } from "assert";
import { Environment } from "./Environment.js";
// Eva intepreter
//

class Jan {
  // Creates a Jan instance with the global Env.
  constructor(global = new Environment()) {
    this.global = global;
  }
  eval(exp, env = this.global) {
    //--------- Self evaluating expressions:
    if (isNumber(exp)) {
      return exp;
    }

    if (isString(exp)) return exp.slice(1, -1);

    //------- Math operations
    if (exp[0] === "+") return this.eval(exp[1]) + this.eval(exp[2]);
    if (exp[0] === "-") return this.eval(exp[1]) - this.eval(exp[2]);
    if (exp[0] === "*") return this.eval(exp[1]) * this.eval(exp[2]);
    if (exp[0] === "/") return this.eval(exp[1]) / this.eval(exp[2]);

    //---- variable declaration
    //
    if (exp[0] === "var") {
      const [_, name, value] = exp;
      return env.define(name, this.eval(value));
    }

    // -- variable access
    //
    if (isVariableName(exp)) {
      return env.lookup(exp);
    }

    throw new Error("Not implemented");
  }
}

function isNumber(exp) {
  return typeof exp === "number";
}

function isString(exp) {
  return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
}

function isVariableName(exp) {
  return typeof exp === "string" && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}
// ========
// Tests:

const jan = new Jan(
  new Environment({
    Null: null,
    True: true,
    False: false,
    VERSION: "0.1",
  }),
);

equal(jan.eval(1), 1);
equal(jan.eval('"Hey there"'), "Hey there");
equal(jan.eval(["+", 1, 5]), 6);
equal(jan.eval(["+", ["+", 1, 5], 10]), 16);
equal(jan.eval(["+", ["/", 1, 5], 10]), 10.2);

//------ variables
equal(jan.eval(["var", "x", 10]), 10);
equal(jan.eval(["var", "isTrue", "True"]), true);
equal(jan.eval("x"), 10);
equal(jan.eval("VERSION"), "0.1");

console.log("All assertions passed");
