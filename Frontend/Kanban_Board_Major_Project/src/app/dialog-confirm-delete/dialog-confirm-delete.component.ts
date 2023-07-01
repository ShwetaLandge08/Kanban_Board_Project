import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrls: ['./dialog-confirm-delete.component.css']
})
export class DialogConfirmDeleteComponent {
  constructor(private authService: AuthService, private snackBar: MatSnackBar, private tokenStorageService: TokenStorageService) { }
  onClickYes(): void {
    console.log("Deleting");
    this.authService.delete().subscribe({
      next: data => {
        console.log(data);
        this.snackBar.open("User account deleted", "Deleted", {
          duration: 5000
        });
        this.tokenStorageService.signOut();
        // this.dataSharingService.isLoggedIn.next(false);
      },
      error: err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed");
      }
    });
  }
}