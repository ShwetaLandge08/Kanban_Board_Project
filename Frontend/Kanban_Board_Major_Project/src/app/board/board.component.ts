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
      //if (this.project.stages)
      this.stages = this.project.stages!;
      //console.log(this.project);
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
        // this.tokenStorage.saveProject(this.project);
        if (this.project.stages)
          this.stages = this.project.stages;
        if (this.project.admin?.email == this.user.email)
          this.isAdmin = true;
      });
    });
  }

  onSearchTaskChanged(event: string) {
    if (event == '') {
      this.stages = this.project.stages!;
    }
    else
      this.project.stages = this.stages.filter((stage: any) => stage.tasks.filter((task: any) => task.title.includes(event)));
  }

  drop(event: CdkDragDrop<Task[]>) {
    //console.log(event.container.data[event.currentIndex]?.assignee?.email);
    //console.log(this.user.email);
    const assignedUser = event.container.data[event.currentIndex]?.assignee?.email;
    const loggedInUser = this.user?.email;
    console.log(assignedUser == loggedInUser);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      //for getting stagename
      // const index = event.container.id.substring(14);
      // this.stage = this.project.stages?.at(+index);
      // console.log(this.stage);

      // // for updating task status
      // console.log(event.container.data[event.currentIndex].status = this.stage?.name);
      // event.container.data[event.currentIndex].status = this.stage?.name;
      // console.log(event.container.data[event.currentIndex]);
    }

    console.log(this.project.stages!);

    this.kanbanService.updateStages(this.project.projectId!, this.project.stages!).subscribe({
      next: data => {
        console.log(data);
        this.snackBar.open("Task moved Successfully", "Saved", {
          duration: 3000
        });
        //event.container.exited;
        this.dataStorage.isUpdate.next(data);
      },
      error: err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Task does not Move, Try Again!", {
          duration: 3000
        });
      }
    });
  }
  // else {
  //   alert('Only assigned user can move their Task!');
  // }


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

  openTaskDetailsDialogBox(project: Project, task: Task): void {
    this.dialog.open(TaskDetailsComponent, {
      width: "50%",
      height: "max-content",
      data: { project, task }
    })
  }
  openConfirmDeleteDialog(stageName: any): void {
    this.dialog.open(DialogConfirmDeleteComponent, {
      data: { stage: `${this.project.projectId}/${stageName}` }
    });
  }

}
