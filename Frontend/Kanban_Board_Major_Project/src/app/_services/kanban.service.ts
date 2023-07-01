import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stage } from '../_models/stage';
import { Observable } from 'rxjs';
import { Project } from '../_models/project';
import { Task } from '../_models/task';
import { TokenStorageService } from './token-storage.service';
import { Comment } from '../_models/comment';

//const STAGE_API = 'http://localhost:9000/api/kanban/project/addStage';
//const TASK_API = 'http://localhost:9000/api/kanban/task/';
const PROJECT_API = 'http://localhost:9000/api/kanban/project/';
const DELETE_PROJECT_API = 'http://localhost:9000/api/kanban/project/delete';

const GET_TASK_COMMENT = "http://localhost:9000/api/kanban/project/comments";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
  role = this.tokenStorage.getUser();
  project = this.tokenStorage.getProject().projectId;

  addProject(project: Project): Observable<any> {
    return this.http.post(PROJECT_API + "add", project, httpOptions);
  }
  deleteProject(project: Project): Observable<any> {
    return this.http.delete(DELETE_PROJECT_API, httpOptions);
  }

  getAdminProjects(): Observable<any> {
    return this.http.get(PROJECT_API + "admin", httpOptions);
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get(PROJECT_API + id, httpOptions);
  }

  addtask(task?: Task): Observable<any | null> {
    return this.http.post(PROJECT_API + 'addTask/' + this.project, task, httpOptions);
  }

  getProjectOfUser(): Observable<any | null> {
    return this.http.get(PROJECT_API + "user", httpOptions);
  }//using

  getAllProjectTask(id: any): Observable<any | null> {
    return this.http.get(PROJECT_API + "getAllTask/" + id, httpOptions);
  }

  getAllMembersForGivenProject(id: any): Observable<any | null> {
    return this.http.get(PROJECT_API + "getMember/" + id, httpOptions);
  }

  addStage(stage: Stage): Observable<any | null> {
    return this.http.post(PROJECT_API + '/addStage/' + this.project, stage, httpOptions);
  }
  getAllUsertaskFromProject(): Observable<any | null> {
    return this.http.get(PROJECT_API + "userTask", httpOptions);
  }


  addCommentOnTask(comment: Comment, taskId: any, projectId: any): Observable<any> {
    // const body = {
    //   comment,
    //   taskId,
    //   projectId
    // };
    return this.http.post(PROJECT_API + "addComment/" + taskId + '/' + projectId, comment, httpOptions);
  }//using

  getAllCommentOnTask(taskId: number, projectId: any): Observable<any | null> {
    return this.http.get(GET_TASK_COMMENT + '/' + taskId + '/' + projectId);
  }
}
