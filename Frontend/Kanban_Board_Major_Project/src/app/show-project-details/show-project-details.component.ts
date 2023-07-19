import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataStorageService } from '../_services/data-storage.service';
import { Project } from '../_models/project';

@Component({
  selector: 'app-show-project-details',
  templateUrl: './show-project-details.component.html',
  styleUrls: ['./show-project-details.component.css']
})
export class ShowProjectDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Project, private dataStorage: DataStorageService) { }
  project: Project = this.data;
}
