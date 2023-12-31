import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

const LOGIN_API = 'http://localhost:9000/api/auth/login';
const REGISTER_API = 'http://localhost:9000/api/kanban/user/register';
const PROFILE_API = 'http://localhost:9000/api/auth/';
const ALL_USERS_API = 'http://localhost:9000/api/kanban/user/all';
const UPDATE_USER = "http://localhost:9000/api/kanban/user/update";
const UPDATE_PASSWORD_API = "http://localhost:9000/api/auth/updatePassword";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(user: User): Observable<any | null> {
    return this.http.post(LOGIN_API, user, httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http.post(REGISTER_API, user, httpOptions);
  }

  getProfile(id: number): Observable<any> {
    return this.http.get(PROFILE_API + id, httpOptions);
  }

  getAllUsers(): Observable<any | null> {
    return this.http.get(ALL_USERS_API, httpOptions);
  }

  updateUser(role: any) {
    return this.http.put(UPDATE_USER, role, httpOptions);
  }//using

  changePassword(email: string, currentPassword: string | null | undefined, newPassword: string | null | undefined): Observable<any> {
    const body = {
      email,
      currentPassword,
      newPassword
    };
    return this.http.put(UPDATE_PASSWORD_API, body, httpOptions);
  }//using
}