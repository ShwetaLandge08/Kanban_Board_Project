import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { DataStorageService } from '../_services/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(private authService: AuthService, private snackBar: MatSnackBar,
    private token: TokenStorageService, private dataStorage: DataStorageService,
    private router: Router) { }
  emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);

  verifyUserAndGenerateToken() {
    console.log(this.emailFormControl.value);
    this.authService.generateOTPForForgotPassword(this.emailFormControl.value)
      .subscribe(
        () => {
          this.token.signOut();
          this.dataStorage.isLoggedIn.next(false);
          this.router.navigateByUrl("/get-otp");
        },
        error => {
          console.error('Password change falied:', error);
        }
      )
  }
}
