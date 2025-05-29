import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  @Output() search = new EventEmitter<string>();
  @Input() isDisable = false

  onSearch(value: any) {
    this.search.emit(value);
  }

}
