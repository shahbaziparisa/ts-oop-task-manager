export enum ProjectStatus {
  ToDO,
  Doing,
  Done
}
export class Project{
 constructor(
    public id: string,
    public title: string,
    public description: string,
    public hours: number,
    public status: ProjectStatus
  ) {}
}