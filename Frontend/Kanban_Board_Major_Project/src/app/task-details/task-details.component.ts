import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../_services/token-storage.service';
import { KanbanService } from '../_services/kanban.service';
import { Task } from '../_models/task';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  task: any;
  comments: Comment[] = [];
  role = this.tokenStorage.getUser();
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService, private kanbanService: KanbanService
    , private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: Task) { }
  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe(params => {
    //   const id = params.get('taskId') ?? 'invalid';
    //   this.kanbanService.getUserTask(id).subscribe(data => {
    //     console.log(data);
    //     this.task = data;
    //     console.log(this.task.taskId);
    //   });
    // this.kanbanService.getAllCommentOnTask(id).subscribe(data => {
    //   console.log(data);
    //   this.comments = data;
    //   console.log(this.task.taskId);
    // });
    // });
    this.task = this.data;
  }

  formComment = this.fb.group({
    comment: ['', [Validators.required, Validators.minLength(5)]],
    //task: [''],
    commenter: ['']
  });

  get comment() {
    return this.formComment.get("comment");
  }
  // get tasks() {
  //   return this.formComment.get("task");
  // }
  get commenter() {
    return this.formComment.get("commenter");
  }

  addCommentOnTask(formComment: FormGroup) {
    var mycomment: Comment = formComment.value;
    // mycomment.task = this.task;
    //mycomment.commenter = this.role;
    //console.log(mycomment.commenter);
    //console.log(mycomment);
    // this.kanbanService.addCommentOnTask(mycomment, this.task.taskId).subscribe(data => {
    //   console.log(data);
    // },
    //   err => {
    //     console.log(err);
    //     this.snackBar.open(err.error.message, "Failed");
    //   }
    // );
  }
  getFirstCharOfName(name: any) {
    return name.charAt(0);
  }
}