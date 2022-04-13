// Code goes here!

//to auto bind this keyword
//Decorator
function autoBind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
  let originalMethod = descriptor.value;
  let adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      let bindFn = originalMethod.bind(this);
      return bindFn;
    },
  };
  return adjDescriptor;
}

//Project Input Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    //here html is closed in template tag so we have to import it
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    //it will import data from templte as as documentFragment
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    //we have add id for element with just below code
    this.element.id = "user-input";

    //getting access to input field before attaching it to dom
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attatch();
  }
  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault();

    console.log(this.titleInputElement.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attatch() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
