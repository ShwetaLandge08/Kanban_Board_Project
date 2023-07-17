import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stage } from '../_models/stage';
import { Observable, tap } from 'rxjs';
import { Project } from '../_models/project';
import { Task } from '../_models/task';
import { TokenStorageService } from './token-storage.service';
import { Comment } from '../_models/comment';
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
    return this.http.get(PROJECT_API + "getActiveUser/" + id, httpOptions);
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

  deleteTask(endPoint: string, task: Task): Observable<any> {
    return this.http.put(`${TASK_API}deleteTask/${endPoint}`, task, httpOptions);
  }

  //=======================================================================

  addStage(stage: Stage, projectId: number): Observable<any | null> {
    return this.http.put(STAGE_API + '/addStage/' + projectId, stage, httpOptions);
  }

  deleteStage(endPoint: string): Observable<any> {
    return this.http.put(`${STAGE_API}deleteStage/${endPoint}`, httpOptions);
  }

  updateStages(id: number, stages: Stage[]): Observable<any> {
    return this.http.put(`${STAGE_API}update/${id}`, stages, httpOptions);
  }

  //=====================================================================

  addCommentOnTask(comment: Comment, task: Task, projectId: any, stageName: any): Observable<any> {
    const body = {
      comment,
      task,projectId,stageName
    };
    return this.http.put(COMMENT_API + "addComment", body, httpOptions).
      pipe(
        tap(() => {
          this.dataStorage.refreshNeeded.next();
        })
      );
  }

  getAllCommentOnTask(task: any, projectId: any, stageName: any): Observable<any> {
    return this.http.get(COMMENT_API + 'comments/' + projectId + '/' + stageName, task);
  }

  //=======================================================================
}
