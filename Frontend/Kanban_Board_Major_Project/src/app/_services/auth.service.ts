import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Request } from '../_models/requestForForgotPassword';

const LOGIN_API = 'http://localhost:9000/api/auth/login';
const REGISTER_API = 'http://localhost:9000/api/kanban/user/register';
const PROFILE_API = 'http://localhost:9000/api/auth/';
const ALL_USERS_API = 'http://localhost:9000/api/kanban/user/all';
const UPDATE_USER = "http://localhost:9000/api/kanban/user/update";
const UPDATE_PASSWORD_API = "http://localhost:9000/api/auth/updatePassword";
const SENT_OTP = "http://localhost:9000/api/auth/password/sentOTP/";
const VALIDATE_OTP = "http://localhost:9000/api/auth/password/validate-otp/"
const FORGOT_PASSWORD = "http://localhost:9000/api/auth/password/forgot-password"
const DELETE_API = 'http://localhost:9000/api/kanban/user/delete/';
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

  getProfile(email: string): Observable<any> {
    return this.http.get(PROFILE_API + email, httpOptions);
  }

  getAllUsers(): Observable<any | null> {
    return this.http.get(ALL_USERS_API, httpOptions);
  }

  updateUser(role: any) {
    return this.http.put(UPDATE_USER, role, httpOptions);
  }//using

  deleteUser(email: any) {
    return this.http.delete(DELETE_API + email);
  }

  changePassword(email: string, currentPassword: string | null | undefined, newPassword: string | null | undefined): Observable<any> {
    const body = {
      email,
      currentPassword,
      newPassword
    };
    return this.http.put(UPDATE_PASSWORD_API, body, httpOptions);
  }//using

  generateOTPForForgotPassword(email: string) {
    return this.http.put<any>(SENT_OTP + email, httpOptions);
  }

  validateOTP(otp: number) {
    return this.http.get(VALIDATE_OTP + otp, httpOptions);
  }

  forgotPassword(request: Request) {
    return this.http.put(FORGOT_PASSWORD, request, httpOptions);
  }
}