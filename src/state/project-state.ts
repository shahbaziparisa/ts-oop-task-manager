
import { Project } from "../models/project.js";
import { ProjectStatus } from "../models/project.js";

export class ProjectState {

  private projects:Project[]=[];
  private listeners:((projects: Project[]) => void)[]=[];
  private static instance:ProjectState;

  //no one can create new object from this class
  private constructor(){
   
  }
 static getInstance() {
    if (this.instance) {  
      return this.instance;
    }
    this.instance = new ProjectState();  // فقط یک بار ساخته میشه
    return this.instance;
  }

 addProject(title: string, description: string, hours: number) {
   const newId = crypto.randomUUID(); 
  const newProject = new Project(newId, title, description, hours, ProjectStatus.ToDO);
  this.projects.push(newProject);
  this.updateListeners();
}

// این متد باید همه listenerها رو صدا بزنه و یه کپی از پروژه‌ها بهشون بده:

private updateListeners() {
  for (const listener of this.listeners) {
    listener(this.projects.slice());  // slice() برای کپی گرفتن
  }
}
addListener(listener: (projects: Project[]) => void) {
  this.listeners.push(listener);
}
moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      project.status = newStatus;
      this.updateListeners();  // ← اینجا صدا زده میشه
    }
  }


}


 export const projectState = ProjectState.getInstance(); 

