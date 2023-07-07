import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Project } from '../_models/project';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  //for login update
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  //for project and comment update
  private needRefresh = new Subject<void>();
  get refreshNeeded() {
    return this.needRefresh;
  }
  //for task and stage update
  public isUpdate: BehaviorSubject<Project> = new BehaviorSubject<Project>({});
}
