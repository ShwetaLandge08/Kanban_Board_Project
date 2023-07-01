import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { KanbanService } from '../_services/kanban.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  constructor(private tokenStorage: TokenStorageService, private authService:AuthService,
    private router: Router,private fb: FormBuilder) { }
  role = this.tokenStorage.getUser();
  roleToUpdate =this.fb.group({
    email: [],
    name: [this.role.name,Validators.required],
    phoneNo: ['', [Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]]
  });

  get name() {
    return this.roleToUpdate.get("name");
  }
  get email(){
    return this.roleToUpdate.get("email");
  }
  get phoneNo(){
    return this.roleToUpdate.get("phoneNo");
  }

  updateUser(roleToUpdate:FormGroup) {
    var user = roleToUpdate.value;
    user.email= this.role.email;
    this.authService.updateUser(user).subscribe(
      (res) => {
        //this.tokenStorage.saveUser(this.roleToUpdate);
        console.log(user.phoneNo);
        console.log(res);
        this.router.navigate(['/login']);
      }),
      (err: any) => {
        console.log(err);
      }
  }
}