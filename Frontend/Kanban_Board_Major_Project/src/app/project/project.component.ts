import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../_models/project';
import { DialogProjectViewComponent } from '../dialog-project-view/dialog-project-view.component';
import { TokenStorageService } from '../_services/token-storage.service';
import { User } from '../_models/user';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  constructor(private dialog: MatDialog, private tokenStorage: TokenStorageService,
    public datepipe: DatePipe) { }

  @Input()
  project: Project = {};
  user: User = this.tokenStorage.getUser();
  isAdmin = false;
  presentDate = new Date();
  isDateLessThanToday = false;
  isDateIsSameAsTodayDate = false;
  dueDate: string | null | undefined;

  ngOnInit(): void {
    if (this.project?.admin?.email == this.user.email) {
      this.isAdmin = true;
    }

    if (this.datepipe.transform(this.project.dueDate, 'yyyy-MM-dd')! < this.datepipe.transform(this.presentDate, 'yyyy-MM-dd')!)
      this.isDateLessThanToday = true;
    if (this.datepipe.transform(this.project.dueDate, 'yyyy-MM-dd')! == this.datepipe.transform(this.presentDate, 'yyyy-MM-dd')!)
      this.isDateIsSameAsTodayDate = true;
  }

  openProjectViewDialog(): void {
    this.dialog.open(DialogProjectViewComponent, {
      data: this.project
    });
  }

  // deleteProject(id: any) {
  //   if (confirm("Are you sure to Delete your Project")) {
  //     this.kanban.deleteProject(id).subscribe({
  //       next: data => {
  //         console.log(data);

  //         this.snackBar.open("Project Deleted Successfully.", "success", {
  //           duration: 5000,
  //           panelClass: ['mat-toolbar', 'mat-primary']
  //         });
  //       },
  //       error: err => {
  //         this.snackBar.open(err.errorMessage, "\nFailed", {
  //           panelClass: ['mat-toolbar', 'mat-primary']
  //         });
  //       }
  //     });
  //   }
  // }
  openConfirmDeleteDialog(id: any): void {
    this.dialog.open(DialogConfirmDeleteComponent, {
      data: { project: id }
    });
  }

}