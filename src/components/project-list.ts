
import {ProjectStatus,Project} from '../models/project.js'
import {DragTarget} from '../models/dragdrop.js'
import {Component} from '../components/main-component.js'
import { autobinder } from '../utils/autobinder.js';
import { projectState } from '../state/project-state.js';
import { ProjectItem } from './project-item.js';

export class ProjectList extends Component<HTMLDivElement,HTMLElement>
implements DragTarget{
 assignedProject: Project[];

  constructor(private type: 'todo'|'doing'|'done'){
    super('project-list','app',false,`${type}-projects`)

      this.assignedProject = [];

    projectState.addListener((projects: Project[]) => {
      const relatedProject = projects.filter((prj) => {
        if (this.type === "todo") {
          return prj.status === ProjectStatus.ToDO;
        } 
         if (this.type === "doing") {
          return prj.status === ProjectStatus.Doing;
        } 
        return prj.status === ProjectStatus.Done;
      });

      this.assignedProject = relatedProject;
      this.renderProjects();
    });

    this.configure();
    this.renderContent();
    
   
  }

  @autobinder
  dragLeaveHandler(_: DragEvent): void {
      const listEl = this.element.querySelector('ul')!;
  listEl.classList.remove('droppable');
    
  }
  @autobinder
  dragOverHandler(event: DragEvent): void {
    event.preventDefault();
    const listEl = this.element.querySelector('ul')!;
  listEl.classList.add('droppable');

    
  }
  @autobinder
  dropHandler(event: DragEvent): void {
 event.preventDefault();
  
  const projectId = event.dataTransfer!.getData('text/plain');
  
  let newStatus: ProjectStatus;
  if (this.type === 'todo') newStatus = ProjectStatus.ToDO;
  else if (this.type === 'doing') newStatus = ProjectStatus.Doing;
  else newStatus = ProjectStatus.Done;
  
  projectState.moveProject(projectId, newStatus);
  
  const listEl = this.element.querySelector('ul')!;
  listEl.classList.remove('droppable');
    
  }

     private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-project-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProject) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }
  renderContent() {
  // تنظیم id برای ul
  const listId = `${this.type}-project-list`;
  this.element.querySelector('ul')!.id = listId;
  
  // تنظیم تایتل
  let title = '';
  if (this.type === 'todo') title = 'TO DO';
  else if (this.type === 'doing') title = 'DOING';
  else title = 'DONE';
  
  this.element.querySelector('h2')!.textContent = `${title} PROJECTS`;
}
configure():void{
  this.element.addEventListener("dragover",this.dragOverHandler)
  this.element.addEventListener('dragleave',this.dragLeaveHandler)
  this.element.addEventListener('drop',this.dropHandler)
}
  
}
