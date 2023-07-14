import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataStorageService } from '../_services/data-storage.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {

  selectedImage: any;

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
  get image() {
    return this.updateForm.get("image");
  }


  updateUser(updateForm: FormGroup) {
    var user = updateForm.value;
    user.email = this.user.email;
    this.authService.updateUser(user).subscribe(
      {
        next: data => {
          console.log(data);
          this.authService.getProfile(this.user.id).subscribe({
            next: response => {
              this.tokenStorage.saveUser(response);
              console.log(response);
              //this.dataService.isLoggedIn.next(true);
            }
          });
          this.snackBar.open("User details updated", "Updated", {
            duration: 1000
          });
          this.dataService.isLoggedIn.next(true);
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          console.log(err);
          this.snackBar.open(err.error.message, "Failed", {
            duration: 1000
          });
        }
      }
    );
  }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    this.selectedImage = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.selectedImage = event.target.result;
        this.user.image = '';
        this.updateForm.value.image = this.user.image.split(",")[1];
        console.log(this.user.id);
      };
      reader.readAsDataURL(file);
    }
  }
}