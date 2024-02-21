import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataStorageService } from '../_services/data-storage.service';
import ImageCompressor from 'image-compressor.js';
import { Ng2ImgMaxService } from 'ng2-img-max';

const compressor = new ImageCompressor();

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {

  //selectedImage: any;

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService,
    private router: Router, private fb: FormBuilder, private snackBar: MatSnackBar,
    private dataService: DataStorageService, private ng2ImgMaxService: Ng2ImgMaxService) { }

  user = this.tokenStorage.getUser();

  updateForm = this.fb.group({
    email: [],
    name: [this.user.name, Validators.required],
    phoneNo: [this.user.phoneNo, [Validators.pattern(/^[789]\d{9,9}$/)]],
    image: ['']
  });

  get name() {
    return this.updateForm.get("name");
  }
  get email() {
    return this.updateForm.get("email");
  }
  get phoneNo() {
    return this.updateForm.get("phoneNo");
  }
  // get image() {
  //   return this.updateForm.get("image");
  // }


  updateUser(updateForm: FormGroup) {
    if (updateForm.valid) {
      if (!this.isDefaultImage())
        updateForm.value.image = this.user.image;
      console.log(updateForm.value);

      this.authService.updateUser(updateForm.value).subscribe({
        next: data => {
          console.log(data);
          console.log(this.user.id);

          this.authService.getProfile(this.user.email).subscribe({
            next: response => {
              this.tokenStorage.saveUser(response);
              console.log(response);
              this.dataService.isLoggedIn.next(true);
            }
          });

          this.snackBar.open("User details updated", "Updated", {
            duration: 5000
          });
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          console.log(err);
          this.snackBar.open(err.error.message, "Failed", {
            duration: 7000
          });
        }
      });
    }
  }

  isDefaultImage(): boolean {
    return this.user['image'] === "https://www.citypng.com/public/uploads/preview/download-profile-user-round-purple-icon-symbol-png-11639594314uv1zwqsazt.png";
  }

  onFileChanged(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.ng2ImgMaxService.compressImage(file, 0.8).subscribe({
        next: data => {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            this.user.image = event.target.result.split(",")[1];
          };
          reader.readAsDataURL(data);
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
}