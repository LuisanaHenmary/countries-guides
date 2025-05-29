import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css'
})
export class FilterPanelComponent {

  regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  @Output() regionSelected = new EventEmitter<string>();
  @Input() isDisable = false

  onSelect(value: any) {
    this.regionSelected.emit(value);
  }

}
