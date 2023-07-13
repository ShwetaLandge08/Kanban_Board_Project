import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { User } from '../_models/user';
import { DataStorageService } from '../_services/data-storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(private serviceVar: AuthService, private router: Router,
    private fb: FormBuilder, private tokenStorage: TokenStorageService,private dataSharingStorage:DataStorageService) { }
  role = this.tokenStorage.getUser();

  changeP = this.fb.group({
    email: [''],
    currentPassword: [''],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.mustMatchValidator });


  get email() {
    return this.changeP.get("email");
  }
  get password() {
    return this.changeP.get("password");
  }
  get currentPassword() {
    return this.changeP.get("currentPassword");
  }
  get confirmPassword() {
    return this.changeP.get("confirmPassword");
  }

  changePassword() {
    if (this.changeP.invalid) {
      return;
    }
    const email = this.role.email;
    const currPassword = this.changeP.value.currentPassword;
    const newPassword = this.changeP.value.password;
    console.log(email);
    console.log(currPassword);
    console.log(newPassword);
    this.serviceVar.changePassword(email, currPassword, newPassword)
      .subscribe(
        () => {
          alert('Password updated!');
          this.tokenStorage.signOut();
          this.dataSharingStorage.isLoggedIn.next(false);
          this.router.navigate(['/login']);
          // this.changeP.reset();
        },
        error => {
          console.error('Password update failed:', error);
          alert('Password update failed. Please try again later.');
        }
      );
  }

  mustMatchValidator(fg: AbstractControl): { [key: string]: boolean } | null {
    const passwordValue = fg.get("password")?.value;
    const confirmPasswordValue = fg.get("confirmPassword")?.value;
    console.log(passwordValue + '\n' + confirmPasswordValue);
    if (passwordValue !== confirmPasswordValue) {
      console.log("mustMatch true");
      fg.get('confirmPassword')?.setErrors({ mustMatch: true });
      return { mustMatch: true }
    }
    return null;
  }
}