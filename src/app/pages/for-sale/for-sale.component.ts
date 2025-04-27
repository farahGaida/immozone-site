import { Component } from '@angular/core';
import { WilayaService } from 'src/app/services/wilaya.service';
import { WILAYAS } from 'src/app/shared/wilayaData';


@Component({
  selector: 'app-for-sale',
  templateUrl: './for-sale.component.html',
  styleUrls: ['./for-sale.component.css']
  
})
export class ForSaleComponent {
  wilayas = this.wilayaService.getForSale();
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
