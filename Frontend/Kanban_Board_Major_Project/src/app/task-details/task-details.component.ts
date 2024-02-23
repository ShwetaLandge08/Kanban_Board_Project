import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../_services/token-storage.service';
import { KanbanService } from '../_services/kanban.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Comment } from '../_models/comment';
import { DataStorageService } from '../_services/data-storage.service';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';
import { User } from '../_models/user';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  task: any;
  comments: Comment[] = [];
  users: User[] = [];
  user = this.tokenStorage.getUser();
  isAdmin = false;

  constructor(private fb: FormBuilder, private dataStorage: DataStorageService,
    private tokenStorage: TokenStorageService, private kanbanService: KanbanService
    , private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog) { }


  selectedUser: User = {};

  getSelectedUser() {
    return this.selectedUser;
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

    this.kanbanService.getAllMembersForGivenProject(this.data.project.projectId).subscribe({
      next: data => {
        this.users = data;
      },
      error: err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed");
      }
    });
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

  openConfirmDeleteDialog(): void {
    this.dialog.open(DialogConfirmDeleteComponent, {
      data: {
        task: `${this.data.project.projectId}/${this.task.status}/${this.task.title}`,
      }
    });
  }

  updateTaskAssignee() {
    const assignee = this.getSelectedUser();
    console.log(this.getSelectedUser()?.name);
    this.kanbanService.updateTaskAssignee(this.task.title, assignee).subscribe({
      next: data => {
        console.log(data);
        this.task = data;
      },
      error: err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed");
      }
    })
  }
}