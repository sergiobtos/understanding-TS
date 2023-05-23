/// <reference path="base-component.ts"/>

namespace App {
   //ProjectInput Class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");
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
    }

    private gaterUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValidateTable: Validetable = {
        value: enteredTitle,
        required: true,
      };
      const descriptionValidateTable: Validetable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };
      const peopleValidateTable: Validetable = {
        value: enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidateTable) ||
        !validate(descriptionValidateTable) ||
        !validate(peopleValidateTable)
      ) {
        alert("Invalid input, please try again");
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }

    private clearInput(): void {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }

    @autoBind
    private submitHandler(e: Event) {
      e.preventDefault();
      const userInput = this.gaterUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        this.clearInput();
      }
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent(): void {}
  }
 
}