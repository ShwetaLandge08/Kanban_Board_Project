import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password-reset',
  templateUrl: './forgot-password-reset.component.html',
  styleUrls: ['./forgot-password-reset.component.css']
})
export class ForgotPasswordResetComponent {
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,
    private authService: AuthService, private router: Router,
    private http: HttpClient) { }

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
      const userPassword: string = resetPassword.value.password;
      const resetToken = localStorage.getItem("otp");
      const token = "http://localhost:9000/api/auth/password/forgot-password?otp=" + resetToken;
      this.http.put(token, userPassword).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/login']);
          localStorage.removeItem("otp");
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
