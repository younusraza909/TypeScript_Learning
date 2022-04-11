// Decorators
//in this case decorator get constructor as argument

//creating decorator method 1
// function Logger(constructor: Function) {
//   console.log("Logging");
//   console.log("constructor", constructor);
// }

//creating decorator method 2
function Logger(logString: String) {
  return function (constructor: Function) {
    console.log(logString);
    console.log("constructor", constructor);
  };
}

//decorator will exucte when class is define
//we do not execute decorator while calling but in methd 2 we have to so outer function can ba called
@Logger("Logging-Person")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();
console.log(pers);
