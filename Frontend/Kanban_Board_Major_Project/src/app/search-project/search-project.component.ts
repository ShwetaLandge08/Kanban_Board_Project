import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-project',
  templateUrl: './search-project.component.html',
  styleUrls: ['./search-project.component.css']
})
export class SearchProjectComponent {
  searchproject: any;
  @Output()
  searchProjectChanged: EventEmitter<string> = new EventEmitter();
  searchProject() {
    this.searchProjectChanged.emit(this.searchproject);
    console.log(this.searchproject);
  }
}
