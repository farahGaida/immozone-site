import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { Listing } from '../../services/listing.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listing-view',
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.css']
})
export class ListingViewComponent implements OnInit {
  listings: Listing[] = [];
  selectedFilter: string = 'all';
  searchTerm: string = '';

  constructor(
    private listingService: ListingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listingService.getListings().subscribe(listings => {
      this.listings = listings;
    });
  }

  filteredListings() {
    return this.listings.filter(listing => {
      const matchesFilter = this.selectedFilter === 'all' || listing.type === this.selectedFilter;
      const matchesSearch = listing.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }

  onViewDetails(id: number) {
    this.router.navigate(['/dashboard/admin/view', id]);
  }

  onUpdateListing(id: number) {
    this.router.navigate(['/dashboard/admin/update', id]);
  }

  onDeleteListing(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      this.listingService.deleteListing(id);
      Swal.fire({
        icon: 'success',
        title: 'Succès!',
        text: 'Annonce supprimée avec succès!',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }
}
