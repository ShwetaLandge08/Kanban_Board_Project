import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Request } from '../_models/requestForForgotPassword';

@Component({
  selector: 'app-forgot-password-reset',
  templateUrl: './forgot-password-reset.component.html',
  styleUrls: ['./forgot-password-reset.component.css']
})
export class ForgotPasswordResetComponent {
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,
    private authService: AuthService, private router: Router) { }

  resetPassword = this.fb.group({
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    confirmPassword: ['', [Validators.required]],
  }, { validators: this.mustMatchValidator });

  get password() {
    return this.resetPassword.get("password");
  }
  get confirmPassword() {
    return this.resetPassword.get("confirmPassword");
  }

  mustMatchValidator(fg: AbstractControl): { [key: string]: boolean } | null {
    const passwordValue = fg.get("password")?.value;
    const confirmPasswordValue = fg.get("confirmPassword")?.value;
    if (passwordValue !== confirmPasswordValue) {
      console.log("mustMatch true");
      fg.get('confirmPassword')?.setErrors({ mustMatch: true });
      return { mustMatch: true }
    }
    return null;
  }

  onSubmit(resetPassword: FormGroup): void {
    if (resetPassword.valid) {
      const email = localStorage.getItem("email");
      const userPassword: string = resetPassword.value.password;
      const otp = localStorage.getItem("otp");
      const request: Request = {
        otp: otp,
        email: email,
        password: userPassword
      }

      this.authService.forgotPassword(request).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/login']);
          localStorage.removeItem("otp");
          localStorage.removeItem("email");
          this.snackBar.open("Your Password has been reset Successfully", "success", {
            duration: 1000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        },
        error: err => {
          this.snackBar.open(err.errorMessage, "\nFailed", {
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        }
      });
    }
  }
}
