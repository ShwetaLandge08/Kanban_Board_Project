import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../_services/token-storage.service';
import { KanbanService } from '../_services/kanban.service';
import { Task } from '../_models/task';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comment } from '../_models/comment';
import { DataStorageService } from '../_services/data-storage.service';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  task: any;
  comments: Comment[] = [];
  role = this.tokenStorage.getUser();
  project = this.tokenStorage.getProject();
  constructor(private fb: FormBuilder, private dataStorage: DataStorageService,
    private tokenStorage: TokenStorageService, private kanbanService: KanbanService
    , private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.task = this.data.task;
    this.dataStorage.refreshNeeded.subscribe(
      () => {
        this.getAllComments();
      }
    );
    this.getAllComments();
  }

  formComment = this.fb.group({
    comment: ['', [Validators.required, Validators.minLength(5)]],
    commenter: ['']
  });

  get comment() {
    return this.formComment.get("comment");
  }
  get commenter() {
    return this.formComment.get("commenter");
  }

  addCommentOnTask() {
    if (this.formComment.invalid) {
      return;
    };
    var myComment: any = this.formComment.value;
    myComment.commenter = this.role;
    const taskId = this.data.task.id;
    const projectId = this.data.project.projectId;
    const stageName = this.data.task.status;

    this.kanbanService.addCommentOnTask(myComment, taskId, projectId, stageName).subscribe(data => {
      console.log(data);
    },
      err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed");
      }
    );
  }
  getAllComments() {
    const taskId = this.data.task.id;
    const projectId = this.data.project.projectId;
    const stageName = this.data.task.status;
    this.kanbanService.getAllCommentOnTask(taskId, projectId, stageName).subscribe(data => {
      console.log(data);
      this.comments = data;
    },
      err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed");
      }
    );
  }

  getFirstCharOfName(name: any) {
    return name.charAt(0);
  }

  deleteTask() {
    if (confirm("Are you sure to Delete your Task")) {
      this.kanbanService.deleteTask(this.project.projectId!, this.task.id!, this.task.status!).subscribe({
        next: data => {
          console.log(data);

          this.snackBar.open("Task Deleted Successfully.", "success", {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
          //location.reload();
          this.dataStorage.isUpdate.next(data);
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