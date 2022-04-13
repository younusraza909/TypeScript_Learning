// Code goes here!

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    //here html is closed in template tag so we have to import it
    this.templateElement =
      document.getElementById(
        "project-input"
      )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(
      "app"
    )! as HTMLDivElement;

    //it will import data from templte as as documentFragment
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element =
      importedNode.firstElementChild as HTMLFormElement;

    this.attatch();
  }

  private attatch() {
    this.hostElement.insertAdjacentElement(
      "afterbegin",
      this.element
    );
  }
}

const prjInput = new ProjectInput();
