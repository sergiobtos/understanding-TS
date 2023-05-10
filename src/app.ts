// autoBind decorator
function autoBind(
    _: any,
    _2: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

//Validation Interface
interface Validetable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validetable) {
  let isValid = true;

  if(validatableInput.required){
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  if(
    validatableInput.minLength != null && 
    typeof validatableInput.value === 'string'
    ) {
    isValid = 
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }

  if(
    validatableInput.maxLength != null && 
    typeof validatableInput.value === 'string'
    ) {
    isValid = 
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }

  if(
    validatableInput.min != null && 
    typeof validatableInput.value === 'number'
    ) {
    isValid = 
      isValid && validatableInput.value >= validatableInput.min;
  }

  if(
    validatableInput.max != null && 
    typeof validatableInput.value === 'number'
    ) {
    isValid = 
      isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}

//ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gaterUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidateTable: Validetable = {
      value: enteredTitle,
      required: true
    }
    const descriptionValidateTable: Validetable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    }
    const peopleValidateTable: Validetable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    }

    if(
      !validate(titleValidateTable) ||
      !validate(descriptionValidateTable) ||
      !validate(peopleValidateTable)
    ){
      alert('Invalid input, please try again');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople]
    }
   
  }

  private clearInput(): void {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @autoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gaterUserInput();
    if(Array.isArray(userInput)) {
      //const [title, desc, people] = userInput;
      this.clearInput()
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
