import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../_models/project';
import { DialogAddProjectComponent } from '../dialog-add-project/dialog-add-project.component';
import { DialogProjectViewComponent } from '../dialog-project-view/dialog-project-view.component';
import { Router } from '@angular/router';
import { KanbanService } from '../_services/kanban.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router,
    private kanban: KanbanService, private snackBar: MatSnackBar) { }

  @Input()
  project: Project = {};
  // color: string = 'primary';

  ngOnInit(): void {
    switch (this.project.priority) {
      case "High":
        // this.color = "warn"
        break;
      case "Medium":
        // this.color = "accent"
        break;
      case "Low":
        // this.color = "primary"
        break;
    }
  }

  openProjectViewDialog(): void {
    this.dialog.open(DialogProjectViewComponent, {
      data: this.project
    });
  }

  // Role: string = this.tokenStorage.getUser().role;

  // drop(event: CdkDragDrop<any[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }

  // openAddTaskDialog(): void {
  //   this.dialog.open(DialogAddTaskComponent, {
  //     // data: vehicle
  //   });
  // }

  openAddProjectDialog(): void {
    this.dialog.open(DialogAddProjectComponent, {
      // data: vehicle
    });
  }

  deleteProject(project: Project) {
    if (confirm("Are you sure to Delete your account")) {
      this.kanban.deleteProject(project).subscribe({
        next: data => {
          console.log(data);

          this.snackBar.open("Projected Deleted Successfully.", "success", {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        },
        error: err => {
          this.snackBar.open(err.errorMessage, "\nFailed", {
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        }
      });
    }
  }
}