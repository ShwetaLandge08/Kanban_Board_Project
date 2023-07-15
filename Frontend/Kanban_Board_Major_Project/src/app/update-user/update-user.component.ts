import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataStorageService } from '../_services/data-storage.service';
import ImageCompressor from 'image-compressor.js';

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
    private dataService: DataStorageService) { }

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

          this.authService.getProfile(this.user.id).subscribe({
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
    const file = event.target.files[0];
    const blobURL = URL.createObjectURL(file);
    const img = new Image();
    img.src = blobURL;

    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        console.log(file);
        //const output = compressor.compress(file, { quality: .7 });
        this.user.image = event.target.result.split(",")[1];
        console.log(this.updateForm.value.image);
      };
      reader.readAsDataURL(file);
    }
    // const file = event.target.files[0];
    // if (!file) return;
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = (event: any) => {
    //   const image = document.createElement("img");
    //   image.src = event.target.result;
    //   this.user.image = event.target.result;
    //   image.onload = (event: any) => {
    //     const canvas = document.createElement("canvas");
    //     const max_width = 400;
    //     const scalesize = max_width / event.target.width;
    //     canvas.width = max_width;
    //     canvas.height = event.target.height * scalesize;
    //     const ctx = canvas.getContext("2d");
    //     ctx?.drawImage(event.target, 0, 0, canvas.width, canvas.height);
    //     const Encoded = ctx?.canvas.toDataURL(event.target.result.split(",")[1]);
    //     this.user.image = Encoded;
    //     console.log(Encoded);
    //     console.log(this.updateForm.value.image);
    //   }
    // }
  }
}