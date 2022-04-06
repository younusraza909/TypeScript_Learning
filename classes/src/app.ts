// Code goes here!
class Department {
  //   private name: string;
  //we can add private keyword
  //it will make sure this var is not accessible from outside diretyl
  //it is called modifier
  //private && public(default)
  private employees: string[] = [];

  //   constructor(n: string) {
  //     this.name = n;
  //   }

  //shorthand to init var
  //in this method we do not have to double initialize the var
  constructor(private id: string, public name: string) {}

  //if we dont use this keyword it will not access name var inside class but something define globally so we have to use this keyword
  describe(this: Department) {
    console.log(`Department:  + ${this.name} (${this.id}) `);
  }

  addEmployees(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("d1", "Accounting");

accounting.describe();
accounting.addEmployees("Max");
accounting.addEmployees("Manu");

accounting.printEmployeeInformation();

// *********************
//tricky part for this in order to safe this we add a type on method
// const accountingCopy = {  describe: accounting.describe };

// const accountingCopy = { name: "DUMMY", describe: accounting.describe };
// accountingCopy.describe();
