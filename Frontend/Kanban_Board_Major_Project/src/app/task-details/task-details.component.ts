import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../_services/token-storage.service';
import { KanbanService } from '../_services/kanban.service';
import { Task } from '../_models/task';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comment } from '../_models/comment';


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
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService, private kanbanService: KanbanService
    , private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: Task) { }
  ngOnInit() {
    this.task = this.data;
    //console.log(this.task);
    this.kanbanService.getAllCommentOnTask(this.task.id, this.project.projectId).subscribe(data => {
      console.log(data);
      this.comments = data;
    },
      err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed");
      }
    );
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
    const taskId = this.task.id;
    const projectId = this.project.projectId;
    console.log(myComment);
    console.log(taskId);
    console.log(projectId);


    this.kanbanService.addCommentOnTask(myComment, taskId,projectId).subscribe(data => {
      console.log(data);
      //formComment.reset();
      //window.location.reload();
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
}