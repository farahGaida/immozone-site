import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Wilaya } from 'src/app/shared/wilaya';

@Component({
  selector: 'app-wilaya-card',
  templateUrl: './wilaya-card.component.html',
  styleUrls: ['./wilaya-card.component.css']
})
export class WilayaCardComponent {
  @Input() wilaya!: Wilaya;
  @Input() mode!: 'sale' | 'rent';
  @Output() viewProperties = new EventEmitter<string>();

  onViewProperties() {
    this.viewProperties.emit(this.wilaya.name);
  }
}