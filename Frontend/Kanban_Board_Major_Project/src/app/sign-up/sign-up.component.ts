import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  imgsrc = 'https://c.staticblitz.com/assets/client/components/SideMenu/blitz_logo-11cebad97cad4b50bc955cf72f532d1b.png';
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,
    private authService: AuthService, private router: Router,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  registrationForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    confirmPassword: ['', [Validators.required]],
    phoneNo: ['', [Validators.required, Validators.pattern(/^[789]\d{9,9}$/)]],
    photo: []
  }, { validators: this.mustMatchValidator });

  get name() {
    return this.registrationForm.get("name");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get password() {
    return this.registrationForm.get("password");
  }
  get confirmPassword() {
    return this.registrationForm.get("confirmPassword");
  }
  get phoneNo() {
    return this.registrationForm.get("phoneNo");
  }
  get photo() {
    return this.registrationForm.get("photo");
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

  onSubmit(registrationForm: FormGroup): void {
    if (registrationForm.valid) {
      const user: User = registrationForm.value;

      this.authService.register(user).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/login']);
          this.snackBar.open("Congrats!!! You are registered with us.", "success", {
            duration: 1000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
          this.resetForm();
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          this.snackBar.open(err.errorMessage, "\nFailed", {
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        }
      });
    }
  }

  resetForm() {
    this.registrationForm.reset();
    Object.keys(this.registrationForm.controls).forEach(key => {
      this.registrationForm.get(key)?.setErrors(null);
    });
  }
  // selectedFile: File | undefined;
  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  // onUpload() {
  //   const formData = new FormData();
  //   formData.append('profilePicture', this.selectedFile!, this.selectedFile?.name!);
  //   console.log(this.selectedFile);
  // }
}