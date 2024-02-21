import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-get-otp',
  templateUrl: './get-otp.component.html',
  styleUrls: ['./get-otp.component.css']
})
export class GetOtpComponent {
  constructor(private route:Router, private auth:AuthService,private snackbar:MatSnackBar){}
  otpFormControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]);
  
  getOTP() {
   this.auth.validateOTP(this.otpFormControl.value).subscribe(
    (data)=>{
      console.log(data);
      localStorage.setItem("otp", this.otpFormControl.value);
      this.route.navigateByUrl("/forgot-password");
    },
    error=>{
      console.error('OTP expired.',error);
      this.snackbar.open("Your OTP expired. Create a new one if you want to proceed.","\nFailed",{
        panelClass:['mat-toolbar','mat-pimary']
      });
    }
    
   )
  }
}
