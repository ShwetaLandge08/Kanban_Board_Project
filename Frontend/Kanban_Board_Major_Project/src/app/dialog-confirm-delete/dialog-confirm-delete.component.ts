import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KanbanService } from '../_services/kanban.service';
import { DataStorageService } from '../_services/data-storage.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrls: ['./dialog-confirm-delete.component.css']
})
export class DialogConfirmDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private snackBar: MatSnackBar,
    private kanbanService: KanbanService, private dataSharingService: DataStorageService, private auth: AuthService,
    private router: Router, private tokenStorage: TokenStorageService
  ) { }

  key: string = Object.keys(this.data)[0];
  value: any = Object.values(this.data)[0];

  onClickYes(): void {
    switch (this.key) {

      case "project":
        console.log("CASE: project");
        this.kanbanService.deleteProject(this.value).subscribe({
          next: data => {
            console.log(data);
            this.snackBar.open("Project Deleted", "Deleted", {
              duration: 1000
            });
          },
          error: err => {
            console.log(err);
            this.snackBar.open(err.error.message, "Failed", {
              duration: 1000
            });
          }
        });

        break;

      case "task":
        console.log("CASE: task");
        this.kanbanService.deleteTask(this.value).subscribe({
          next: data => {
            console.log(data);
            this.dataSharingService.isUpdate.next(data);
            this.snackBar.open("Task Deleted", "Deleted", {
              duration: 1000
            });
          },
          error: err => {
            console.log(err);
            this.snackBar.open(err.error.message, "Failed", {
              duration: 1000
            });
          }
        });
        break;

      case "stage":
        console.log("CASE: stage");
        this.kanbanService.deleteStage(this.value).subscribe({
          next: data => {
            console.log(data);
            this.dataSharingService.isUpdate.next(data);
            this.snackBar.open("Stage Deleted", "Deleted", {
              duration: 1000
            });
          },
          error: err => {
            console.log(err);
            this.snackBar.open(err.error.message, "Failed", {
              duration: 1000
            });
          }
        });
        break;

      case "user":
        console.log("CASE: user");
        this.auth.deleteUser(this.value).subscribe(
          (data) => {
            console.log(data);
            this.snackBar.open("User Deleted Successfully.", "success", {
              duration: 1000,
              panelClass: ['mat-toolbar', 'mat-primary']
            });
            this.tokenStorage.signOut();
            this.dataSharingService.isLoggedIn.next(false);
            this.router.navigateByUrl("/register");
          },
          (error) => {
            console.log(error.error);
            this.snackBar.open(error.error, "\nFailed", {
              panelClass: ['mat-toolbar', 'mat-primary']
            });
          }
        );
        break;

      default:
        this.snackBar.open("Check object transfered to DialogConfirmDeleteComponent", "Error", {
          duration: 1000
        });
        break;
    }
  }
}
