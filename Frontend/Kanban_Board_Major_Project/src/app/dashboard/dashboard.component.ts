import { Component } from '@angular/core';
import { KanbanService } from '../_services/kanban.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../_models/project';
import { Task } from '../_models/task';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private kanbanService: KanbanService, private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  projects: Project[] = [];
  tasks: Task[] = [];
  userProjects: Project[] = [];
  ngOnInit(): void {
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

    this.kanbanService.getAllUsertaskFromProject().subscribe((data) => {
      console.log(data);
      this.tasks = data;
    },
      err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed", {
          duration: 5000
        });
      });
  }
  openTaskDetailsDialogBox(task: Task): void {
    this.dialog.open(TaskDetailsComponent, {
      width: "50%",
      height: "max-content",
      data: task
    })
  }
}