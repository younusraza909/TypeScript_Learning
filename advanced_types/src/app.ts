//  DESCRIMINATED UNIONS
//it similar to type guard but a different approach
//it uses in object

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving at a speed of " + speed);
}

// *************************************************//

// TYPE CASTING
// const input = <HTMLInputElement>(
//   document.getElementById("message-id")!
// );

const input = document.getElementById(
  "message-id"
)! as HTMLInputElement;

input.value = "Hi there";

// *************************************************//

// INDEX PROPERTIES
interface ErrorContainer {
  //dont know the propety name so we can define its type
  //and dont know how many
  //in this case we cant define id as number becasuse index property is set to string
  [prop: string]: string;
  id: string;
}

const errorBag: ErrorContainer = {
  id: "error",
  email: "Not a valid Email",
  username: "Must Start with a capital character",
};

console.log(errorBag);

// *************************************************//

// FUNCTION OVERLOADED
//we can add more ways of calling a function by adding fucniton overloaded
type Combinable_ = string | number;
type Numeric_ = number | boolean;

type Universal_ = Combinable_ & Numeric_;

//we can add fucniton overloaded with one param
//and call it with one param if funtion is structure in this way
// function add_(a: number): number;
function add_(a: number, b: number): number;
function add_(a: string, b: string): string;
function add_(a: Combinable_, b: Combinable_) {
  //technically this if statement is a type guard
  if (
    typeof a === "string" ||
    typeof b === "string"
  ) {
    return a.toString() + b.toString();
  }
  return a + b;
}

// *************************************************//

// NULL Coalescing
const userInput = "";

//in OR operator case any falsy value will caught and default will be shown
//in second case if null or undefined in caught only then default is shown
// const storedData = userInput || "DEFAULT";
const storedData = userInput ?? "DEFAULT";
