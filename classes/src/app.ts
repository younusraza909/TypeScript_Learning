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

  // static method or prop can directly access from class without init
  static createEmployee(name: string) {
    return { name: name };
  }
  //static prop are detatched from instance so we can not call it from constructor
  //as this.** only static method can access it
  //in order to use it in constructor we have to use class.methodName
}

// Inheritence
class ITDepartment extends Department {
  private lastReport: string;

  // defining getters
  //we can get last report private property with this getter
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found");
  }

  // setter
  set mostRecentReport(value: string) {
    this.addReports(value);
  }

  constructor(id: string, public admins: string[], private reports: string[]) {
    super(id, "IT");
    this.lastReport = reports[0];
  }

  addEmployees(employee: string) {
    if (employee === "Max") {
      return;
    }
    this.employees.push(employee);
  }

  addReports(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
}

const emp1 = Department.createEmployee("MAX");
console.log(emp1);

const IT = new ITDepartment("IT1", ["Max", "Younus"], ["report 1", "report 2"]);
//
//we dont use getter as function but as property
console.log(IT.mostRecentReport);
//setter is called not as func but have to pass value after equal sign
IT.mostRecentReport = "Recent Report";
IT.describe();
IT.addEmployees("Max");
IT.addEmployees("Manu");

IT.printEmployeeInformation();

// *********************
//tricky part for this in order to safe this we add a type on method
// const accountingCopy = {  describe: accounting.describe };

// const accountingCopy = { name: "DUMMY", describe: accounting.describe };
// accountingCopy.describe();
