import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { KanbanService } from '../_services/kanban.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../_models/project';
import { Task } from '../_models/task';
import { MatDialog } from '@angular/material/dialog';
import { DataStorageService } from '../_services/data-storage.service';
import { DialogAddProjectComponent } from '../dialog-add-project/dialog-add-project.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private kanbanService: KanbanService, private snackBar: MatSnackBar,
    private dialog: MatDialog, private dataStorage: DataStorageService) { }
  projects: Project[] = [];
  tasks: Task[] = [];
  userProjects: Project[] = [];
  projectsPerPage: number = 1;
  userProjectsPerPage: number = 1;
  userTaskPerpage: number = 1;
  ngOnInit(): void {
    this.dataStorage.refreshNeeded.subscribe(
      () => {
        this.getAdminProjects();
      }
    );
    this.getAdminProjects();
    this.getProjectOfUser();
    this.getAllUserTask();
  }

  onSearchTextChanged(searchText: string) {
    this.kanbanService.getAdminProjects().subscribe({
      next: data => {
        this.projects = data.filter((obj: Project) => obj.title?.toLowerCase().includes(searchText.toLowerCase()));
      },
      error: err => {
        this.snackBar.open(err.error.status + ": Can't search projects of admin at the moment", "Failed", {
          duration: 5000
        });
      }
    });
    this.kanbanService.getProjectOfUser().subscribe({
      next: data => {
        this.userProjects = data.filter((obj: Project) => obj.title?.toLowerCase().includes(searchText.toLowerCase()));
      },
      error: err => {
        this.snackBar.open(err.error.status + ": Can't search assigned projects at the moment", "Failed", {
          duration: 5000
        });
      }
    });
    this.kanbanService.getAllUsertaskFromProject().subscribe({
      next: data => {
        this.tasks = data.filter((obj: Task) => obj.title?.toLowerCase().includes(searchText.toLowerCase()));
      },
      error: err => {
        this.snackBar.open(err.error.status + ": Can't search user tasks at the moment", "Failed", {
          duration: 5000
        });
      }
    });
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

  getAllUserTask() {
    this.kanbanService.getAllUsertaskFromProject().subscribe((data) => {
      console.log(data);
      this.tasks = data;
    },
      err => {
        console.log(err);
      })
  }
}