import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../_models/project';

@Component({
  selector: 'app-dialog-project-view',
  templateUrl: './dialog-project-view.component.html',
  styleUrls: ['./dialog-project-view.component.css']
})
export class DialogProjectViewComponent {
  constructor(private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: Project) { }

  project: Project = this.data;
}
