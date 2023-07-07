import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../_models/project';
import { DialogAddProjectComponent } from '../dialog-add-project/dialog-add-project.component';
import { DialogProjectViewComponent } from '../dialog-project-view/dialog-project-view.component';
import { Router } from '@angular/router';
import { KanbanService } from '../_services/kanban.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../_services/token-storage.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  constructor(private dialog: MatDialog, private kanban: KanbanService,
    private snackBar: MatSnackBar, private tokenStorage: TokenStorageService) { }

  @Input()
  project: Project = {};
  user: User = this.tokenStorage.getUser();
  isAdmin = false;


  ngOnInit(): void {
    if (this.project?.admin?.email == this.user.email) {
      this.isAdmin = true;
    }
  }

  openProjectViewDialog(): void {
    this.dialog.open(DialogProjectViewComponent, {
      data: this.project
    });
  }

  deleteProject(id: any) {
    if (confirm("Are you sure to Delete your Project")) {
      this.kanban.deleteProject(id).subscribe({
        next: data => {
          console.log(data);

          this.snackBar.open("Project Deleted Successfully.", "success", {
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