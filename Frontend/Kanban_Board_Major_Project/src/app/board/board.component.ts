import { Component } from '@angular/core';
import { KanbanService } from '../_services/kanban.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../_models/project';
import { Stage } from '../_models/stage';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../_models/task';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { TokenStorageService } from '../_services/token-storage.service';
import { DialogAddStageComponent } from '../dialog-add-stage/dialog-add-stage.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  constructor(private kanbanService: KanbanService, private snackBar: MatSnackBar,
    private dialog: MatDialog, private activatedRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService,private auth:AuthService) { }

  selectedProject: Project | null = null;
  // isProjectname = localStorage.getItem("projectName");

  project: Project = {};
  stages: Stage[] = [];
  tasks: Task[] = [];
  myProject = this.tokenStorage.getProject();
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id') ?? 0;
      this.kanbanService.getProjectById(+id).subscribe(data => {
        console.log(data);
        this.project = data;
        console.log(this.project.projectId);
        this.tokenStorage.saveProject(this.project);
        if (this.project.stages)
          this.stages = this.project.stages;
          console.log(this.stages)
      });

      this.kanbanService.getAllProjectTask(id).subscribe(
        (data) => {
          console.log(data);
          this.tasks = data;
        },
        err => {
          console.log(err);
          this.snackBar.open(err.error.message, "Failed", {
            duration: 5000
          });
        });
        
    }
    )
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data as Task[],
        event.container.data as Task[],
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  onTaskDropped(event: CdkDragDrop<any[]>) {
    // const task = event.item.data;
    // console.log(task);
    // const previousColumnIndex = this.stages.indexOf(task.status);
    // console.log(previousColumnIndex);
    // const newColumnIndex = event.currentIndex;
    // console.log(newColumnIndex);
    // const newColumnName = this.stages[newColumnIndex];
    // console.log(newColumnName);
    // // Change the status of the task to the new column name
    // task.status = newColumnName;

    // // Move the task from the previous column to the new column
    // // this.tasks = this.tasks.filter(t => t !== task);  // Remove task from the tasks array
    //  this.tasks.splice(newColumnIndex, 0, task);      // Insert task into the new position
  }

  openAddTaskDialog(): void {
    this.dialog.open(DialogAddTaskComponent, {
      // data: vehicle
    });
  }
  openAddStageDialog(): void {
    this.dialog.open(DialogAddStageComponent, {
    });
  }
  openTaskDetailsDialogBox(task:Task): void {
    this.dialog.open(TaskDetailsComponent, {
      width: "50%", 
      height: "max-content",
      data:task
    })
  }
}