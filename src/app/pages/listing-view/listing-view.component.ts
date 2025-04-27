import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-view',
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.css']
})
export class ListingViewComponent implements OnInit {
  
  listings = [
    { id: '1', title: 'Property 1', location: 'City 1', imageUrl: 'assets/rent1.jpg', type: 'rent' },
    { id: '2', title: 'Property 2', location: 'City 2', imageUrl: 'assets/rent2.webp', type: 'sale' },
    { id: '3', title: 'Property 3', location: 'City 3', imageUrl: 'assets/rent3.jpg', type: 'rent' },
    { id: '4', title: 'Property 4', location: 'City 4', imageUrl: 'assets/rent1.jpg', type: 'sale' },
    { id: '2', title: 'Property 2', location: 'City 2', imageUrl: 'assets/rent2.webp', type: 'sale' },
    { id: '3', title: 'Property 3', location: 'City 3', imageUrl: 'assets/rent3.jpg', type: 'rent' },
    { id: '4', title: 'Property 4', location: 'City 4', imageUrl: 'assets/rent1.jpg', type: 'sale' },
    // Add other listings...
  ];
  selectedFilter: string = 'all';  // Default filter to show all listings
  searchTerm: string = '';  // Variable to store the search term

  constructor() {}

  ngOnInit(): void {}

  // Filter listings based on selected filter and search term
  filteredListings() {
    return this.listings.filter(listing => {
      const matchesFilter = this.selectedFilter === 'all' || listing.type === this.selectedFilter;
      const matchesSearch = listing.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }

  // Action for viewing details of a listing
  onViewDetails(id: string) {
    console.log('View details for: ', id);
    // Logic for viewing details (e.g., navigate to details page)
  }

  // Action for updating a listing
  onUpdateListing(id: string) {
    console.log('Update listing for: ', id);
    // Logic for updating a listing (e.g., navigate to update page)
  }

  // Action for deleting a listing
  onDeleteListing(id: string) {
    console.log('Delete listing for: ', id);
    // Logic for deleting a listing (e.g., make an API call to delete)
  }
}
