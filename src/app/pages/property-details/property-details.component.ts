import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService, Listing } from '../../services/listing.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  listing: Listing | null = null;
  currentImageIndex = 0;
  isLoading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.listingService.getListings().subscribe({
        next: (listings: Listing[]) => {
          const foundListing = listings.find(listing => listing.id === id);
          if (foundListing) {
            this.listing = foundListing;
          } else {
            this.error = true;
          }
          this.isLoading = false;
        },
        error: () => {
          this.error = true;
          this.isLoading = false;
        }
      });
    } else {
      this.error = true;
      this.isLoading = false;
    }
  }

  nextImage(): void {
    if (this.listing && this.currentImageIndex < this.listing.images.length - 1) {
      this.currentImageIndex++;
    }
  }

  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  goBack(): void {
    this.router.navigate(['/sale']);
  }

  goToContact(listing: Listing): void {
    this.router.navigate(['/contact'], {
      state: { listing }
    });
  }
} 