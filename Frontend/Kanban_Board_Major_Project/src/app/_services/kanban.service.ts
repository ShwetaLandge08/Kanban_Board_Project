import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stage } from '../_models/stage';
import { Observable, tap } from 'rxjs';
import { Project } from '../_models/project';
import { Task } from '../_models/task';
import { TokenStorageService } from './token-storage.service';
import { Comment } from '../_models/comment';
import { StageComponent } from '../stage/stage.component';
import { DataStorageService } from './data-storage.service';

const STAGE_API = 'http://localhost:9000/api/kanban/stage/';
const TASK_API = 'http://localhost:9000/api/kanban/task/';
const PROJECT_API = 'http://localhost:9000/api/kanban/project/';
const COMMENT_API = 'http://localhost:9000/api/kanban/comment/';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService,
    private dataStorage: DataStorageService) { }
  role = this.tokenStorage.getUser();
  project = this.tokenStorage.getProject().projectId;

  addProject(project: Project): Observable<any> {
    return this.http.post(PROJECT_API + "add", project, httpOptions).pipe(
      tap(() => {
        this.dataStorage.refreshNeeded.next();
      })
    );
  }

  deleteProject(id: any): Observable<any> {
    return this.http.delete(PROJECT_API + "delete" + "/" + id, httpOptions).pipe(
      tap(() => {
        this.dataStorage.refreshNeeded.next();
      })
    );
  }

  updateProject(project: Project): Observable<any> {
    return this.http.put(PROJECT_API + "update", project, httpOptions).pipe(
      tap(() => {
        this.dataStorage.refreshNeeded.next();
      })
    );
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get(PROJECT_API + id, httpOptions);
  }

  getAdminProjects(): Observable<any> {
    return this.http.get(PROJECT_API + "admin", httpOptions);
  }

  getAllMembersForGivenProject(id: any): Observable<any | null> {
    return this.http.get(PROJECT_API + "getMember/" + id, httpOptions);
  }

  // =========================================================================

  addTask(projectId: number, stageName: string, task: Task): Observable<any> {
    return this.http.put(`${TASK_API}${projectId}/${stageName}/add`, task, httpOptions);
  }

  getAllUsertaskFromProject(): Observable<any | null> {
    return this.http.get(TASK_API + "userTask", httpOptions);
  }

  getProjectOfUser(): Observable<any | null> {
    return this.http.get(TASK_API + "user", httpOptions);
  }

  updateStatusOftask(projectId: number, taskId: number, stageName: string, status: string): Observable<any> {
    return this.http.put(`${TASK_API}update/${projectId}/${stageName}/${taskId}`, status, httpOptions);
  }

  // add for delete task
  deleteTask(projectId: number, taskId: number, stageName: string): Observable<any> {
    return this.http.put(`${TASK_API}deleteTask/${projectId}/${stageName}/${taskId}`, httpOptions);
  }

  //=======================================================================

  addStage(stage: Stage): Observable<any | null> {
    return this.http.put(STAGE_API + '/addStage/' + this.project, stage, httpOptions);
  }

  //add for delete stage
  deleteStage(projectId: any, stageName: any): Observable<any> {
    return this.http.put(STAGE_API + "deleteStage/" + projectId + '/' + stageName, httpOptions);
  }

  updateStages(id: number, stages: Stage[]): Observable<any> {
    return this.http.put(`${STAGE_API}update/${id}`, stages, httpOptions);
  }

  //=====================================================================

  addCommentOnTask(comment: Comment, taskId: any, projectId: any, stageName: any): Observable<any> {

    return this.http.put(COMMENT_API + "addComment/" + taskId + '/' + projectId + '/' + stageName, comment, httpOptions).
      pipe(
        tap(() => {
          this.dataStorage.refreshNeeded.next();
        })
      );
  }

  getAllCommentOnTask(taskId: number, projectId: any, stageName: any): Observable<any | null> {
    return this.http.get(COMMENT_API + 'comments/' + taskId + '/' + projectId + '/' + stageName);
  }

  //=======================================================================
}
