import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KanbanService } from '../_services/kanban.service';
import { Task } from '../_models/task';
import { Stage } from '../_models/stage';
import { DataStorageService } from '../_services/data-storage.service';

@Component({
  selector: 'app-dialog-confirm-stage',
  templateUrl: './dialog-confirm-stage.component.html',
  styleUrls: ['./dialog-confirm-stage.component.css']
})
export class DialogConfirmStageComponent {
  constructor(private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) private data: Stage, 
  private dataSharingService: DataStorageService,
    private kanbanService: KanbanService) { }

    stage: Stage = this.data;

  onClickYes(): void {
    console.log(this.stage);
    // if (this.stage) {
    this.kanbanService.addStage(this.stage).subscribe({
      next: data => {
        console.log(data);
        this.snackBar.open("Stage added successfully", "Success", {
          duration: 5000
        });
        // this.dataSharingService.isVehicleChanged.next(true);
      },
      error: err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed");
      }
    });
  }
}