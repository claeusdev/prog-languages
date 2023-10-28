import { equal } from "assert";
// Eva intepreter
//

class Jan {
  eval(exp) {
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

    throw new Error("Not implemented");
  }
}

function isNumber(exp) {
  return typeof exp === "number";
}

function isString(exp) {
  return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
}
// ========
// Tests:

const jan = new Jan();

equal(jan.eval(1), 1);
equal(jan.eval('"Hey there"'), "Hey there");
equal(jan.eval(["+", 1, 5]), 6);
equal(jan.eval(["+", ["+", 1, 5], 10]), 16);
equal(jan.eval(["+", ["/", 1, 5], 10]), 10.2);
console.log("All assertions passed");
