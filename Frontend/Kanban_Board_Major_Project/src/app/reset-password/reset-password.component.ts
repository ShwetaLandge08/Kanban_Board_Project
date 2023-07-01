import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}
  emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);

  verifyUser() {
    console.log(this.emailFormControl.value);
    
      // if (loginForm.valid) {
        // const user: User = loginForm.value;

        // this.authService.update(this.emailFormControl?.value).subscribe({
        //   next: data => {
        //     console.log(data);
        //     this.snackBar.open("Email address found and password reset link has been sent to the address", 'OK', {
        //       duration: 5000,
        //     });
        //   },
        //   error: err => {
        //     // this.errorMessage = err.error.message;
        //     console.log(err);
            
        //     this.snackBar.open(err.error.message, "Failed", {
        //       duration: 5000,
        //     });
        //   }
        // });
      }
    }
