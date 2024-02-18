import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-otp',
  templateUrl: './get-otp.component.html',
  styleUrls: ['./get-otp.component.css']
})
export class GetOtpComponent {
  constructor(private route:Router){}
  otpFormControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]);
  getOTP() {
    localStorage.setItem("otp", this.otpFormControl.value);
    this.route.navigateByUrl("/forgot-password");
  }
}
