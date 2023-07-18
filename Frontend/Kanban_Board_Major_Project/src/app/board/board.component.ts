import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { User } from '../_models/user';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  constructor(private kanbanService: KanbanService, private snackBar: MatSnackBar,
    private dialog: MatDialog, private activatedRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService, private dataStorage: DataStorageService) {
    this.dataStorage.isUpdate.subscribe(value => {
      this.project = value;
      this.stages = this.project.stages!;
    });
  }

  project: Project = {};
  stages: Stage[] = [];
  stage: Stage | undefined;
  user: User = this.tokenStorage.getUser();
  isAdmin = false;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id') ?? 0;
      this.kanbanService.getProjectById(+id).subscribe(data => {
        this.project = data;
        console.log(this.project);
        if (this.project.stages)
          this.stages = this.project.stages;
        if (this.project.admin?.email == this.user.email)
          this.isAdmin = true;
      });
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log(event.previousContainer.data[event.currentIndex].assignee?.name);
    if (this.tokenStorage.getUser().name === event.previousContainer.data[event.previousIndex].assignee?.name ||
      this.project.admin?.name === this.tokenStorage.getUser().name) {
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
      console.log(event.previousContainer.data);
      console.log(event.container.data);
      console.log(this.project.stages);
      this.kanbanService.updateStages(this.project.projectId!, this.project.stages!).subscribe({
        next: data => {
          console.log(data);
          this.dataStorage.isUpdate.next(data);
          this.snackBar.open("Task moved Successfully", "Saved", {
            duration: 2000,
          });
        },
        error: err => {
          console.log(err);
          this.snackBar.open(err.error.message, "Task does not Move, Try Again!", {
            duration: 5000
          });
        }
      });
    }
  }


  openAddTaskDialog(project: Project, stage: Stage): void {
    this.dialog.open(DialogAddTaskComponent, {
      data: { project, stage }
    });
  }

  openAddStageDialog(): void {
    this.dialog.open(DialogAddStageComponent, {
      data: this.project.projectId
    });
  }

  openTaskDetailsDialogBox(project: Project, task: Task,stageName:string): void {
    this.dialog.open(TaskDetailsComponent, {
      width: "50%",
      height: "max-content",
      data: { project, task,stageName }
    })
  }
  openConfirmDeleteDialog(stageName: any): void {
    this.dialog.open(DialogConfirmDeleteComponent, {
      data: { stage: `${this.project.projectId}/${stageName}` }
    });
  }

}
