import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../_services/token-storage.service';
import { KanbanService } from '../_services/kanban.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Comment } from '../_models/comment';
import { DataStorageService } from '../_services/data-storage.service';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';
import { Task } from '../_models/task';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  task: any;
  comments: Comment[] = [];
  //stage: any;
  user = this.tokenStorage.getUser();
  //project = this.tokenStorage.getProject();
  isAdmin = false;
  constructor(private fb: FormBuilder, private dataStorage: DataStorageService,
    private tokenStorage: TokenStorageService, private kanbanService: KanbanService
    , private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog) {
    // this.dataStorage.isUpdate.subscribe(value => {
    //   this.data.project = value;
    //   console.log(value);
    //   // this.stage = value.stages?.filter(stage => stage.name == this.data.stageName);
    //   // this.stage = this.data.stageName;
    //   this.data.task.comments = this.comments;
    // });
  }


  ngOnInit() {
    this.task = this.data.task;
    this.dataStorage.refreshNeeded.subscribe(
      () => {
        this.getAllComments();
      }
    );
    this.getAllComments();
    if (this.data.project.admin.email == this.user.email)
      this.isAdmin = true;
  }

  formComment = this.fb.group({
    comment: ['', [Validators.minLength(5)]],
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
    myComment.commenter = this.user;
    myComment.commenter.image = null;
    const taskTitle = this.data.task.title;
    const projectId = this.data.project.projectId;
    // const stageName = this.data.task.statu

    this.kanbanService.addCommentOnTask(myComment, taskTitle, projectId, this.data.stageName).subscribe(data => {
      console.log(data);
      this.dataStorage.isUpdate.next(data);
      this.formComment.reset();
    },
      err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed");
      }
    );
  }
  getAllComments() {
    const task = this.data.task.title;
    const projectId = this.data.project.projectId;
    // const stageName = this.data.task.status;
    this.kanbanService.getAllCommentOnTask(task, projectId, this.data.task.status).subscribe(data => {
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

  openConfirmDeleteDialog(task1: Task): void {
    this.dialog.open(DialogConfirmDeleteComponent, {
      data: {
        task: `${this.data.project.projectId}/${this.task.status}`,
        task1
      }
    });
  }
}