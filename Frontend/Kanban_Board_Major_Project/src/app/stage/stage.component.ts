import { Component, Input } from '@angular/core';
import { Stage } from '../_models/stage';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent {
  constructor(private dialog: MatDialog, private tokenStorage: TokenStorageService) { }

  @Input() stage: Stage = {};
  Role: string = this.tokenStorage.getUser().role;

  drop(event: CdkDragDrop<any[]>) {
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
  }

  openAddTaskDialog(): void {
    this.dialog.open(DialogAddTaskComponent, {
      // data: vehicle
    });
  }
}
