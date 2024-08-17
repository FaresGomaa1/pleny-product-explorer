import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchTerm: string = '';
  @Output() searchEvent = new EventEmitter<string>();

  onSearch(): void {
    this.searchEvent.emit(this.searchTerm);
  }
}
