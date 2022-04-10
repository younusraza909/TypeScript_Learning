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
