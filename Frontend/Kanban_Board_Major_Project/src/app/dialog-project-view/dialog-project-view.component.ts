import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../_models/project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KanbanService } from '../_services/kanban.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-project-view',
  templateUrl: './dialog-project-view.component.html',
  styleUrls: ['./dialog-project-view.component.css']
})
export class DialogProjectViewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Project,
    private fb: FormBuilder, private kanbanService: KanbanService, private router: Router) {
    this.currentDate = new Date();
    this.currentDate.setHours(0, 0, 0, 0);
  }

  project: Project = this.data;
  currentDate: Date;
  projectToUpdate = this.fb.group({
    title: [this.project.title, Validators.required],
    description: [this.project.description, Validators.required],
    dueDate: [this.project.dueDate, Validators.required],
    priority: [this.project.priority]
  });

  get title() {
    return this.projectToUpdate.get("title");
  }
  get description() {
    return this.projectToUpdate.get("description");
  }
  get dueDate() {
    return this.projectToUpdate.get("dueDate");
  }
  get priority() {
    return this.projectToUpdate.get("priority");
  }

  updateUser(projectToUpdate: FormGroup) {
    var myProject = projectToUpdate.value;
    myProject.projectId = this.project.projectId;
    this.kanbanService.updateProject(myProject).subscribe(
      (res) => {
        console.log(res);
      }),
      (err: any) => {
        alert(err);
      }
  }
}
