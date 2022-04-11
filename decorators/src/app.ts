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

// Another Example

function WithTemplate(
  template: string,
  hookId: string
) {
  //undescore gives typescript hint that we are getting something but we are not interested in it
  return function (constructor: any) {
    const hookEl =
      document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent =
        p.name;
    }
  };
}

//decorator will exucte when class is define
//we do not execute decorator while calling but in methd 2 we have to so outer function can ba called

//decorator run bottom up last one will run first
//function will run in same way but decorator in it will run bottom up
@Logger("Logging-Person")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();
console.log(pers);
