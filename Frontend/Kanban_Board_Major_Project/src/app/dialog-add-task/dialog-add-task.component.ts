import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { KanbanService } from '../_services/kanban.service';
import { Task } from '../_models/task';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../_models/user';
import { Stage } from '../_models/stage';
import { Project } from '../_models/project';
import { DataStorageService } from '../_services/data-storage.service';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.css']
})
export class DialogAddTaskComponent {

  constructor(private fb: FormBuilder, private tokenStorage: TokenStorageService,
    private kanbanService: KanbanService, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any, private dataStorage: DataStorageService) { }

  users: User[] = [];

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
    status: ['']
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
    //console.log(this.data.project.projectId);
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
    //console.log(this.data.stage);
    taskForm.value.status = this.data.stage.name;
    console.log(taskForm.value);
    this.kanbanService.addTask(this.myProject.projectId, this.data.stage.name, taskForm.value).subscribe({
      next: data => {
        console.log(data);
        console.log(typeof(data));
        this.dataStorage.isUpdate.next(data);
        this.snackBar.open("Task added successfully", "Added", {
          duration: 7000
        });
        // location.reload();
        
      },
      error: err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed", {
          duration: 7000
        });
      }
    });
  }
}