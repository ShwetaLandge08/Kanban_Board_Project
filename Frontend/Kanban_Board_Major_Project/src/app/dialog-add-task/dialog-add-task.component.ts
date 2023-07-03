import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmStageComponent } from '../dialog-confirm-stage/dialog-confirm-stage.component';
import { KanbanService } from '../_services/kanban.service';
import { Task } from '../_models/task';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../_models/user';
import { Stage } from '../_models/stage';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../_models/project';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.css']
})
export class DialogAddTaskComponent {
  constructor(private fb: FormBuilder, private tokenStorage: TokenStorageService,
    private authService: AuthService, private kanbanService: KanbanService,
    private snackBar: MatSnackBar) { }

  users: User[] = [];
  //selectedUsers: Role[] = [];
  project: Project = {};
  stages: Stage[] = [];
  tasks: Task[] = [];
  role = this.tokenStorage.getUser();

  myProject = this.tokenStorage.getProject();


  taskForm = this.fb.group({
    //id: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    assignee: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    status: ['', [Validators.required]]
  });

  // get id() {
  //   return this.taskForm.get("id");
  // }
  get title() {
    return this.taskForm.get("title");
  }
  get description() {
    return this.taskForm.get("description");
  }
  get assignee() {
    return this.taskForm.get("assignee");
  }
  get priority() {
    return this.taskForm.get("priority");
  }
  get status() {
    return this.taskForm.get("status");
  }

  ngOnInit(): void {
    //this.users.filter(user => user.email != this.myProject.admin.email);
    //console.log(this.users);
    this.kanbanService.getAllMembersForGivenProject(this.myProject.projectId).subscribe({
      next: data => {
        this.users = data;
        console.log(this.myProject.projectId);
        console.log(this.users);
      },
      error: err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed");
      }
    });
    this.stages = this.myProject.stages;
    //console.log(this.stages);
  }


  addTask(taskForm: FormGroup) {
    var task: Task = taskForm.value;
    // task.id = this.tasks.length + 1;
    console.log(task);
    // console.log(this.tasks.length + 1);
    //console.log(taskForm.value);
    this.kanbanService.addtask(task).subscribe({
      next: data => {
        console.log(data);
        this.snackBar.open("Task added successfully", "Done");
        window.location.reload();
      },
      error: err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed");
      }
    });
  }
}