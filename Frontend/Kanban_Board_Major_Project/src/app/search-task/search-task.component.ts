import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent {
  searchTask: any;
  @Output()
  searchTaskChanged: EventEmitter<string> = new EventEmitter();
  searchTaskFromTasks() {
    this.searchTaskChanged.emit(this.searchTask);
  }
}
