import { ChangeDetectorRef, Component } from '@angular/core';
import { KanbanService } from '../_services/kanban.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../_models/project';
import { Stage } from '../_models/stage';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../_models/task';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { TokenStorageService } from '../_services/token-storage.service';
import { DialogAddStageComponent } from '../dialog-add-stage/dialog-add-stage.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { DataStorageService } from '../_services/data-storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  constructor(private kanbanService: KanbanService, private snackBar: MatSnackBar,
    private dialog: MatDialog, private activatedRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService) {
  }

  project: Project = {};
  stages: Stage[] = [];
  updatedtask: Task | undefined;
  stage: Stage | undefined;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id') ?? 0;
      this.kanbanService.getProjectById(+id).subscribe(data => {
       // console.log(data);
        this.project = data;
        this.tokenStorage.saveProject(this.project);
        if (this.project.stages)
          this.stages = this.project.stages;
        //console.log(this.stages)
      });
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    //for getting stagename
    const stageId = event.container.id;
    var newStr = stageId.replace(/-/g, "");
    var getIndex = newStr.charAt(newStr.length - 1);
    var getNum = parseInt(getIndex);
    this.stage = this.project.stages?.at(getNum);
    console.log(this.stage?.name);//status for task

    // for getting taskId
    var update = event.container.data.map((task, index) => ({
      ...task,
      position: index + 1
    }));
    console.log(update.at(0));// got task array
    this.updatedtask = update.at(0);


    console.log(this.project.stages!);

    this.kanbanService.updateStatusOftask(this.project.projectId!, this.updatedtask?.id!,
      this.updatedtask?.status!, this.stage?.name!).subscribe(
        (data) => {
          console.log(data.stages);
        },
        error => {
          console.log(error)
        }
      );

    this.kanbanService.updateStages(this.project.projectId!, this.project.stages!).subscribe({
      next: data => {
        console.log(data);
        this.snackBar.open("Task moved Successfully", "Saved", {
          duration: 3000
        });
      },
      error: err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Task does not Move, Try Again!", {
          duration: 3000
        });
      }
    });

  }


  openAddTaskDialog(project: Project, stage: Stage): void {
    this.dialog.open(DialogAddTaskComponent, {
      data: { project, stage }
    });
  }

  openAddStageDialog(): void {
    this.dialog.open(DialogAddStageComponent, {
    });
  }

  openTaskDetailsDialogBox(project: Project, task: Task): void {
    this.dialog.open(TaskDetailsComponent, {
      width: "50%",
      height: "max-content",
      data: { project, task }
    })
  }

  deleteStage(stageName: any) {
    //console.log(this.projectId + "   " + stageName)
    if (confirm("Are you sure to Delete your Stage")) {
      this.kanbanService.deleteStage(this.project.projectId, stageName).subscribe({
        next: data => {
          console.log(data);

          this.snackBar.open("Stage Deleted Successfully.", "success", {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
          location.reload();
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
