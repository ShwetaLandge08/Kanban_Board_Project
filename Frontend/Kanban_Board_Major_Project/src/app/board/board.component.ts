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
    private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
  }

  project: Project = {};
  stages: Stage[] = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id') ?? 0;
      this.kanbanService.getProjectById(+id).subscribe(data => {
        console.log(data);
        this.project = data;
        //this.tokenStorage.saveProject(this.project);
        if (this.project.stages)
          this.stages = this.project.stages;
        console.log(this.stages)
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
    console.log(...this.project.stages!);
    this.kanbanService.updateStages(this.project.projectId!, this.project.stages!).subscribe({
      next: data => {
        console.log(data);
        this.snackBar.open("Chages saved", "Saved", {
          duration: 3000
        });
      },
      error: err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Not Saved", {
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

  openTaskDetailsDialogBox(task: Task): void {
    this.dialog.open(TaskDetailsComponent, {
      width: "50%",
      height: "max-content",
      data: task
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
