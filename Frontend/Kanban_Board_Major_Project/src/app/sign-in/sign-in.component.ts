import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../_services/data-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,
    private authService: AuthService, private tokenStorage: TokenStorageService,
    private dataSharingService: DataStorageService, private router: Router) { }

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
  });

  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
    }
    if(this.tokenStorage.isLoggedIn()){
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(loginForm: FormGroup): void {
    if (loginForm.valid) {
      const user: User = loginForm.value;
      this.authService.login(user).subscribe({
        next: data => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.role = this.tokenStorage.getUser().role;
          this.dataSharingService.isLoggedIn.next(true);

          this.router.navigate(['/dashboard']);
          this.snackBar.open("You are Looged In", 'OK', {
            duration: 1000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        },
        error: err => {
          this.errorMessage = err.error.message;
          // console.log(err);

          this.isLoginFailed = true;
          this.snackBar.open(this.errorMessage, "Failed", {
            duration: 5000,
          });
        }
      });
    }
  }
}