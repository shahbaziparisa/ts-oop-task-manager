 
 import { Component } from "./main-component.js";
 import { autobinder } from "../utils/autobinder.js";
 import { projectState } from "../state/project-state.js";
 import * as Validate from "../utils/validation.js"
 
export class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{

  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  hoursInputElement: HTMLInputElement;

  constructor(){
    super('project-input','app',true,'user-input')

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.hoursInputElement = this.element.querySelector('#people') as HTMLInputElement;
        this.configure();

  }

  @autobinder
  private submitHandler(event: Event) {
    //prevent default submit to prevent refresh the page
  event.preventDefault();

    const userInput = this.getUserInput();
if (userInput) {
    const [title, desc, hour] = userInput;
  
   projectState.addProject(title.toString(), desc.toString(), +hour);
    
    this.clearInputs();
}

  
  }
    configure(){
      //we listen to form- not button
      this.element.addEventListener('submit',this.submitHandler)
    
   }
   renderContent(){
    
  }

 
  getUserInput(){
 const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredHour = this.hoursInputElement.value;


const titleValidatable: Validate.Validatable = {
      value: enteredTitle,
      required: true,
      minLength: 3,
    };

    const descriptionValidable: Validate.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
      maxLength: 120,
    };

    const hourValidatable: Validate.Validatable = {
      value: +enteredHour,
      required: true,
      min: 1,
      max: 10,
    };

    if (
      !Validate.validate(titleValidatable) ||
      !Validate.validate(descriptionValidable) ||
      !Validate.validate(hourValidatable)
    ) {
      alert("Invalid Input,Please Try Again !");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredHour];
    }

  }
  private clearInputs() {
  this.titleInputElement.value = '';
  this.descriptionInputElement.value = '';
  this.hoursInputElement.value = '';
}


}