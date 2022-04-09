// INTERSECTION TYPES
//it actually very close to interface extend
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "younus",
  privileges: ["create-server"],
  startDate: new Date(),
};

// Example other
//in case of union it will give its intersection
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// *************************************************************//

//TYPE GUARDS
function add(a: Combinable, b: Combinable) {
  //technically this if statement is a type guard
  if (
    typeof a === "string" ||
    typeof b === "string"
  ) {
    return a.toString() + b.toString();
  }
  return a + b;
}

// Another Example
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(
  emp: UnknownEmployee
) {
  //these if are type guard
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("StartDate: " + emp.startDate);
  }
}

printEmployeeInformation(e1);

// Another Example
class Car {
  drive() {
    console.log("Driving....");
  }
}

class Truck {
  drive() {
    console.log("Driving a Truck....");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo ...." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  //   if ("loadCargo" in vehicle) {
  //     vehicle.loadCargo(1000);
  //   }
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);
