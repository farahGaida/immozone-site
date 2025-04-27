import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-view-listing',
  templateUrl: './card-view-listing.component.html',
  styleUrls: ['./card-view-listing.component.css']
})
export class CardViewListingComponent {
  @Input() title: string = '';
  @Input() location: string = '';
  @Input() imageUrl: string = '';
  @Input() id: string = '';
  @Input() type: string = ''; 

  // Event emitters for handling button clicks
  @Output() viewDetails = new EventEmitter<string>();
  @Output() updateListing = new EventEmitter<string>();
  @Output() deleteListing = new EventEmitter<string>();

  

  onViewDetails() {
    this.viewDetails.emit(this.id);
  }

  onUpdateListing() {
    this.updateListing.emit(this.id);
  }

  onDeleteListing() {
    this.deleteListing.emit(this.id);
  }
}
