import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const PROJECT_VALUE = 'project';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private dataSharingService: DataStorageService, private router: Router) { }

  signOut(): void {
    window.sessionStorage.clear();
    this.dataSharingService.isLoggedIn.next(false);
    this.router.navigateByUrl('/home');
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public saveProject(project: any): void {
    window.sessionStorage.removeItem(PROJECT_VALUE);
    window.sessionStorage.setItem(PROJECT_VALUE, JSON.stringify(project));
  }
  public getProject():any{
    const project = window.sessionStorage.getItem(PROJECT_VALUE);
    if (project) {
      //console.log(project);

      return JSON.parse(project);
    }
    return {};
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      //console.log(user);

      return JSON.parse(user);
    }
    return {};
  }
}
