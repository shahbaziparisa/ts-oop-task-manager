import {Component} from './main-component.js'
import {Draggable} from '../models/dragdrop.js'
import {autobinder} from '../utils/autobinder.js'
import {Project} from '../models/project.js'

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
implements Draggable
{
   @autobinder
  dragEndHandler(_: DragEvent): void {
      this.element.classList.remove('dragging');

    
  }
   @autobinder
  dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
    this.element.classList.add('dragging');
    
  }

  private project: Project;

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;
    this.renderContent();
    this.configure();
  }

  renderContent() {
  // عنوان
  this.element.querySelector('h2')!.textContent = this.project.title;
  
  // badge ساعت
  this.element.querySelector('.hours-badge')!.textContent = `${this.project.hours} hours`;
  
  // توضیحات
  this.element.querySelector('p')!.textContent = this.project.description;

    this.element.classList.add('project-item'); 
  }

 
  configure() {
    this.element.addEventListener("dragstart",this.dragStartHandler);
    this.element.addEventListener("dragend",this.dragEndHandler);
  }
}