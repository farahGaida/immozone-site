import { Component } from '@angular/core';
import { WilayaService } from 'src/app/services/wilaya.service';
import { WILAYAS } from 'src/app/shared/wilayaData';

@Component({
  selector: 'app-for-rent',
  templateUrl: './for-rent.component.html',
  styleUrls: ['./for-rent.component.css']
})
export class ForRentComponent {
  wilayas = this.wilayaService.getForRent();
  allWilayas = WILAYAS;
  filteredWilayas = WILAYAS;
  searchQuery = '';
  constructor(private wilayaService: WilayaService) {}
  filterWilayas() {
    this.filteredWilayas = this.allWilayas.filter(wilaya =>
      wilaya.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


}
