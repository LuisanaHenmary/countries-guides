import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  @Output() search = new EventEmitter<string>();

  onSearch(value: any) {
    this.search.emit(value);
  }

}
