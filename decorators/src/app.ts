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
  return function <
    T extends {
      //it is telling that it will be a constructor function
      new (...args: any[]): { name: string };
    }
  >(originalConstructor: T) {
    //decorator when attatched to class can return a constructor function which will extend from base function
    //now this deccorator will not call when class is define but will be called when instance is called
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        const hookEl =
          document.getElementById(hookId);

        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector(
            "h1"
          )!.textContent = this.name;
        }
      }
    };
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

//---Other usecases of decorator

//in case if we add decorator to property so target will be prototype that will be created by class
//if we add decorator to static property target will be constructor
function Log(
  target: any,
  propertName: string | Symbol
) {
  console.log("Property Decorator 1");
  console.log(target, propertName);
}

//using decorator on accessor
//in this case getting 3 arguments
function Log2(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  console.log("Accessor Decorator Called 2");
  console.log(target);
  console.log(name, descriptor);
}

//using decorator on method
//in this case getting 3 arguments
function Log3(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  console.log("Method Decorator Called 3");
  console.log(target);
  console.log(name, descriptor);
}

//using decorator on parameters
//in this case getting 3 arguments
//in this case name is not of parameter but of method in which it is used

function Log4(
  target: any,
  name: string,
  position: number
) {
  console.log("parameter Decorator  4");
  console.log(target);
  console.log(name, position);
}

// Order
//1 Property @
//2 Accessor @
//3 Parameter @
//4 Method @

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error(
        "Invalid price-should be positive"
      );
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}
