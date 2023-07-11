import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KanbanService } from '../_services/kanban.service';
import { DataStorageService } from '../_services/data-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-add-stage',
  templateUrl: './dialog-add-stage.component.html',
  styleUrls: ['./dialog-add-stage.component.css']
})
export class DialogAddStageComponent {
  constructor(private dialog: MatDialog, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: number, private kanbanService: KanbanService,
    private dataStorage: DataStorageService, private snackBar: MatSnackBar) { }

  stageForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]]
  });

  get name() {
    return this.stageForm.get("name");
  }

  addStage(stageForm: FormGroup) {
    this.kanbanService.addStage(stageForm.value, this.data).subscribe({
      next: data => {
        this.dataStorage.isUpdate.next(data);
        console.log(data);
        this.snackBar.open("Stage added successfully", "Success", {
          duration: 5000
        });
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