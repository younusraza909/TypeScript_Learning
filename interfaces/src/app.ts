//specific for typescript
//use to define structure for function and object
// custom type
// type Person = {
//   name: string;
//   age: number;
//   greet(phrase: string): void;
// };

//Fucntion Structure
// type AddFn=(a:number,b:number)=>number
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, b1: number) => {
  return n1 + b1;
};

interface Named {
  readonly name: string;
  outputName?: string; //option property
  myMethod?(a: number, b: number): number; //option method
}

//in interface and custom type we can use only readonly modifier
//interfaces can be extend
//for interfaces we can extend multiple interfaces unlike class
interface Greetable extends Named {
  greet(phrase: string): void;
}

//interface can e use with class || type cannot
//we can add more than that in class but minimum should satify interfase
class Person implements Greetable {
  name: string;
  age = 30;
  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string): void {
    console.log(phrase + " " + this.name);
  }
}

let user1: Greetable;

user1 = new Person("Max");
user1.greet("Hi-There");
