// GENERICS

//Array Type
//A type which is connected to antoher type as array type
const names: Array<string> = []; //string[]

//Promise Type
const promise: Promise<string> = new Promise(
  (resolve, reject) => {
    setTimeout(() => {
      resolve("This is done");
    }, 2000);
    reject("Something went wrong");
  }
);

// ***************************************************//

// CREATING A GENERICS FUCNTION

//currently T,U will be filled by typescipt dynamically while compliling
// but we can tell ts what type will be there if we want
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// const merged = merge(
//   { name: "Younus" },
//   { age: 20 }
// );

const merged = merge<
  { name: string },
  { age: number }
>({ name: "Younus" }, { age: 20 });

// ***************************************************//

// CONSTRAINS
// in order to constrain type for genrics in fucntion we can use constrain

function mergeAgain<
  T extends object,
  U extends object
>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const merged2 = mergeAgain(
  { name: "Younus" },
  { age: 20 }
);

// Another generics fucntion example

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(
  element: T
): [T, string] {
  let description = "Got not value.";
  if (element.length === 1) {
    description = "Got 1 element.";
  } else if (element.length > 1) {
    description =
      "Got " + element.length + " elements.";
  }

  return [element, description];
}

console.log(countAndDescribe("Hi there!"));

function extractAndConvert<
  T extends object,
  U extends keyof T
>(obj: T, key: U) {
  return obj[key];
}

console.log(
  extractAndConvert({ name: "Hello" }, "name")
);

// GENERIC CLASSES
class DataStorage<
  T extends string | boolean | number
> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");

console.log(textStorage.getItems());

// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: "Max" });
// objStorage.addItem({ name: "Manu" });
// objStorage.removeItem({ name: "Max" });

// console.log(objStorage.getItems());

// *********************************************//
// Generic Utility Types

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  // we have to convert in into coursegoal type bcz currently it is partail type
  return courseGoal as CourseGoal;
}

const names_: Readonly<string[]> = [
  "Max",
  "Anna",
];
// names.push('Manu');
// names.pop();
