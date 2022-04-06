// Code goes here!
class Department {
  //   private name: string;
  //we can add private keyword
  //it will make sure this var is not accessible from outside diretyl
  //it is called modifier
  //private && public(default) && readonly
  protected employees: string[] = [];

  // public :accessible from anywhere
  //private:accessible from class where it is init
  //readonly:cant change once init
  //protected:accessible from class where init and extended class

  //   constructor(n: string) {
  //     this.name = n;
  //   }

  //shorthand to init var
  //in this method we do not have to double initialize the var
  constructor(private readonly id: string, public name: string) {}

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

// Inheritence
class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
  }

  addEmployees(employee: string) {
    if (employee === "Max") {
      return;
    }
    this.employees.push(employee);
  }
}

const IT = new ITDepartment("IT1", ["Max", "Younus"]);

IT.describe();
IT.addEmployees("Max");
IT.addEmployees("Manu");

IT.printEmployeeInformation();

// *********************
//tricky part for this in order to safe this we add a type on method
// const accountingCopy = {  describe: accounting.describe };

// const accountingCopy = { name: "DUMMY", describe: accounting.describe };
// accountingCopy.describe();