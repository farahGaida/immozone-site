import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';  // Pour naviguer vers la page précédente
import { Router } from '@angular/router'; // Pour rediriger après update ou delete
import { ListingService, Listing } from '../../services/listing.service';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {
  listing: Listing | null = null;
  currentImage: string = ''; // Pour afficher l'image grande

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private listingService: ListingService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      if (!isNaN(id)) {
        const listing = this.listingService.getListingById(id);
        if (listing) {
          this.listing = listing;
          this.currentImage = listing.images[0] || '';
        } else {
          this.router.navigate(['/dashboard/admin/view']);
        }
      } else {
        this.router.navigate(['/dashboard/admin/view']);
      }
    }
  }

  // Fonction pour changer l'image principale lorsque l'on clique sur une petite image
  changeMainImage(imageUrl: string): void {
    this.currentImage = imageUrl;
  }

  // Retourner à la page précédente
  goBack(): void {
    this.location.back();
  }

  // Logique pour la mise à jour
  onUpdateListing(): void {
    if (this.listing) {
      this.router.navigate(['/dashboard/admin/update', this.listing.id]);
    }
  }

  // Logique pour la suppression
  onDeleteListing(): void {
    if (this.listing) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
        this.listingService.deleteListing(this.listing.id);
        this.router.navigate(['/dashboard/admin/view']);
      }
    }
  }
}
