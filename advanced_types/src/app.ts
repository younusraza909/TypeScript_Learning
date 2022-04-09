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
