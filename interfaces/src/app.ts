//specific for typescript
// custom type
// type Person = {
//   name: string;
//   age: number;
//   greet(phrase: string): void;
// };

interface Greetable {
  name: string;
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
