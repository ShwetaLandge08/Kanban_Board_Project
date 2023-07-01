import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmStageComponent } from '../dialog-confirm-stage/dialog-confirm-stage.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-stage',
  templateUrl: './dialog-add-stage.component.html',
  styleUrls: ['./dialog-add-stage.component.css']
})
export class DialogAddStageComponent {
  constructor(private dialog: MatDialog, private fb: FormBuilder) { }

  stageForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    wipLimit: [''],
  });

  get name() {
    return this.stageForm.get("name");
  }
  get wipLimit() {
    return this.stageForm.get("wipLimit");
  }

  addStage() {
    this.dialog.open(DialogConfirmStageComponent, {
      data: this.stageForm.value
    });
  }
}