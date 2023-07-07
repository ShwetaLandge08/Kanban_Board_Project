import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KanbanService } from '../_services/kanban.service';
import { DataStorageService } from '../_services/data-storage.service';

@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrls: ['./dialog-confirm-delete.component.css']
})
export class DialogConfirmDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private snackBar: MatSnackBar,
    private kanbanService: KanbanService, private dataSharingService: DataStorageService
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
              duration: 5000
            });
          },
          error: err => {
            console.log(err);
            this.snackBar.open(err.error.message, "Failed", {
              duration: 7000
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
              duration: 5000
            });
          },
          error: err => {
            console.log(err);
            this.snackBar.open(err.error.message, "Failed", {
              duration: 7000
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
              duration: 5000
            });
          },
          error: err => {
            console.log(err);
            this.snackBar.open(err.error.message, "Failed", {
              duration: 7000
            });
          }
        });
        break;

      default:
        this.snackBar.open("Check object transfered to DialogConfirmDeleteComponent", "Error", {
          duration: 7000
        });
        break;
    }
  }
}