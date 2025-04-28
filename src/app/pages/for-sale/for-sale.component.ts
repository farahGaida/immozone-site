import { Component, OnInit } from '@angular/core';
import { WilayaService } from 'src/app/services/wilaya.service';
import { WILAYAS } from 'src/app/shared/wilayaData';
import { ListingService, Listing } from '../../services/listing.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-for-sale',
  templateUrl: './for-sale.component.html',
  styleUrls: ['./for-sale.component.css']
})
export class ForSaleComponent implements OnInit {
  wilayas = this.wilayaService.getForSale();
  allWilayas = WILAYAS;
  filteredWilayas = WILAYAS;
  searchQuery = '';
  listings: Listing[] = [];
  selectedCity: string = '';
  cityListings: Listing[] = [];

  constructor(
    private wilayaService: WilayaService,
    private listingService: ListingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listingService.getListings().subscribe(listings => {
      this.listings = listings;
      this.route.params.subscribe(params => {
        if (params['city']) {
          this.selectedCity = params['city'];
          this.cityListings = this.listings.filter(listing => 
            listing.location.toLowerCase() === this.selectedCity.toLowerCase() && 
            listing.type === 'sale'
          );
        }
      });
    });
  }

  filterWilayas() {
    this.filteredWilayas = this.allWilayas.filter(wilaya =>
      wilaya.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onViewProperties(city: string) {
    this.router.navigate(['/sale', city.toLowerCase()]);
  }

  viewDetails(listingId: number) {
    this.router.navigate(['/property', listingId]);
  }

  goToContact(listing: Listing) {
    this.router.navigate(['/contact'], {
      state: { listing }
    });
  }
}
