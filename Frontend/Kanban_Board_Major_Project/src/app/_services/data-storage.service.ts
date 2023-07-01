import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
