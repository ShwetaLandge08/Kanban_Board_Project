import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-project',
  templateUrl: './search-project.component.html',
  styleUrls: ['./search-project.component.css']
})
export class SearchProjectComponent {
  searchText: string = "";
  @Output()
  searchTextChanged = new EventEmitter<string>();
  search() {
    this.searchTextChanged.emit(this.searchText);
  }
}
