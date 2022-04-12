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
  //we can return value from this decorator but it will be ignored
  title: string;
  private _price: number;

  @Log2
  //can return value
  //can return new descriptor fucntion
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
  //can return value
  //can return new descriptor fucntion
  //we can return value from @LOG4  decorator but it will be ignored
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

function autoBind(
  _: any,
  _2: string | Symbol,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // here this will reperesent the responsible object to tigger this method
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This Work";

  @autoBind
  showMessage() {
    console.log(this.message);
  }
}
const p = new Printer();

const button = document.querySelector("button")!;
//on event listner this keyword inside fucntion changes it context thus giving us undefined
// button.addEventListener("click", p.showMessage);

//this will work
// button.addEventListener(
//   "click",
//   p.showMessage.bind(p)
// );

//we can make a decorator so we can auto bind ir
button.addEventListener("click", p.showMessage);

// -----
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] =
    {
      ...registeredValidators[
        target.constructor.name
      ],
      [propName]: ["required"],
    };
}

function PositiveNumber(
  target: any,
  propName: string
) {
  registeredValidators[target.constructor.name] =
    {
      ...registeredValidators[
        target.constructor.name
      ],
      [propName]: ["positive"],
    };
}

function validate(obj: any) {
  const objValidatorConfig =
    registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[
      prop
    ]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    (this.title = t), (this.price = p);
  }
}

const courseForm = document.querySelector("form");

courseForm?.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();

    const titleInpt = document.querySelector(
      "#title"
    ) as HTMLInputElement;
    const priceInpu = document.querySelector(
      "#price"
    ) as HTMLInputElement;

    const titleValue = titleInpt.value;
    const priceValue = +priceInpu.value;

    const createdCourse = new Course(
      titleValue,
      priceValue
    );
    if (!validate(createdCourse)) {
      alert("Invalid input, please try again!");
      return;
    }
    console.log(createdCourse);
  }
);
