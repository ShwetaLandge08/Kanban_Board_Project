import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { KanbanService } from '../_services/kanban.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { DataStorageService } from '../_services/data-storage.service';

@Component({
  selector: 'app-dialog-add-project',
  templateUrl: './dialog-add-project.component.html',
  styleUrls: ['./dialog-add-project.component.css']
})
export class DialogAddProjectComponent {

  currentDate: Date;
  selectedUsers: User[] = [];
  users: User[] = [];

  constructor(private fb: FormBuilder, private kanbanService: KanbanService,
    private snackBar: MatSnackBar, private authService: AuthService,
    private dataStorage: DataStorageService) {
    this.currentDate = new Date();
    this.currentDate.setHours(0, 0, 0, 0);
    this.addDefaultStages();
  }

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
      next: data => {
        this.users = data;
        console.log(this.users);
      },
      error: err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed");
      }
    });
  }

  projectForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    dueDate: ['', [Validators.required, this.pastDateValidator()]],
    priority: ['', Validators.required],
    stages: this.fb.array([], { validators: [this.minimumStageValidator(2)] }),
    members: [this.selectedUsers, [Validators.required, this.minimumMembersValidator(2)]],

  });

  get title() {
    return this.projectForm.get("title");
  }
  get description() {
    return this.projectForm.get("description");
  }
  get dueDate() {
    return this.projectForm.get("dueDate");
  }

  get priority() {
    return this.projectForm.get("priority");
  }

  get stages() {
    return this.projectForm.get('stages') as FormArray;
  }
  get members() {
    return this.projectForm.get("members");
  }

  addDefaultStages() {
    const defaultStages = [
      { name: 'To-Do' },
      { name: 'In-Progress', wipLimit: 5 },
      { name: 'Done' }
    ];
    defaultStages.forEach(stage => {
      this.stages.push(this.createStageFormGroup(stage));
    });
  }

  addStage() {
    this.stages.push(this.createStageFormGroup(''));
  }

  removeStage(index: number) {
    this.stages.removeAt(index);
  }

  createStageFormGroup(stage: any): FormGroup {
    console.log(stage);
    return this.fb.group({
      name: [stage.name, [Validators.required, Validators.minLength(3)]],
      wipLimit: [stage.wipLimit]
    });
  }

  addProject(projectForm: FormGroup) {
    console.log(projectForm.value);
    this.kanbanService.addProject(projectForm.value).subscribe({
      next: data => {
        console.log(data);
        this.snackBar.open("Project added successfully", "Added", {
          duration: 5000
        });
      },
      error: err => {
        console.log(err);
        this.snackBar.open(err.error.message, "Failed");
      }
    });
  }

  pastDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date: Date = control.value;
      if (date && date < this.currentDate) {
        return { pastDate: true };
      }
      return null;
    };
  }

  minimumStageValidator(limit: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const stages: FormArray = control.value;
      if (stages.length < limit) {
        return { minimumStage: true };
      }
      return null;
    };
  }
  minimumMembersValidator(minimumMembers: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const members: User[] = control.value;
      if (members && members.length < minimumMembers) {
        return { minimumMembers: true };
      }
      return null;
    };
  }
}
// project.dueDate?.setUTCDate(project.dueDate.getDate());
