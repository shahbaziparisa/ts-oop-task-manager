//component class is a root class that help us to find an element and its host to add element to that host but about detail in rendering and ... in its children we will use methods
export abstract class Component<T extends HTMLElement , U extends HTMLElement>{

  templateElement : HTMLTemplateElement;
  //host element is where I want to add my element like app
  hostElement : T;
  element:U;

  constructor(templateId:string , hostElementId:string,insertAtStart:boolean,newElementId? : string){

    this.templateElement=document.getElementById(templateId) as HTMLTemplateElement;
    this.hostElement= document.getElementById(hostElementId) as T;
    //clone the content of template
    const importedNode= document.importNode(this.templateElement.content,true);
   this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    //now this.elemnt is ready to add it to host element
    this.attach(insertAtStart);

  }
   private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;

}