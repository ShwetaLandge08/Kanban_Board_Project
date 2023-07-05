import { Component } from '@angular/core';
import { KanbanService } from '../_services/kanban.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../_models/project';
import { Task } from '../_models/task';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatDialog } from '@angular/material/dialog';
import { DataStorageService } from '../_services/data-storage.service';
import { DialogAddProjectComponent } from '../dialog-add-project/dialog-add-project.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private kanbanService: KanbanService, private snackBar: MatSnackBar,
    private dialog: MatDialog, private dataStorage: DataStorageService) { }

  projects: Project[] = [];
  tasks: Task[] = [];
  userProjects: Project[] = [];

  ngOnInit(): void {

    this.dataStorage.refreshNeeded.subscribe(
      () => {
        this.getAdminProjects();
      }
    );

    this.getAdminProjects();
    //this.getAllUsertaskFromProject();
    this.getProjectOfUser();
  }

  openTaskDetailsDialogBox(task: Task): void {
    this.dialog.open(TaskDetailsComponent, {
      width: "50%",
      height: "min-content",
      data: task
    })
  }

  getAdminProjects() {
    this.kanbanService.getAdminProjects().subscribe({
      next: data => {
        console.log(data);
        this.projects = data;
      },
      error: err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed", {
          duration: 7000
        });
      }
    });
  }

  openAddProjectDialog(): void {
    this.dialog.open(DialogAddProjectComponent);
  }

  getProjectOfUser() {
    this.kanbanService.getProjectOfUser().subscribe((data) => {
      console.log(data);
      this.userProjects = data;
    },
      err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed", {
          duration: 5000
        });
      });
  }
}