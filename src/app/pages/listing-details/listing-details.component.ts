import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';  // Pour naviguer vers la page précédente
import { Router } from '@angular/router'; // Pour rediriger après update ou delete

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {
  listing: any;
  currentImage: string = ''; // Pour afficher l'image grande

  constructor(private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    // Vérification si l'ID est valide avant de tenter de récupérer les détails
    if (id) {
      this.fetchListingDetails(id); // Fonction pour récupérer les détails de l'annonce
    } else {
      console.error('ID de l\'annonce introuvable');
    }

    // Si listing est défini, on met à jour l'image principale
    if (this.listing) {
      this.currentImage = this.listing.photos[0]; // Par défaut, on affiche la première image
    }
  }

  // Exemple de méthode pour récupérer les détails, tu peux remplacer ça par un appel à une API
  fetchListingDetails(id: string): void {
    // Simuler un appel API ou récupérer directement à partir de tes données
    // Utilise l'ID pour récupérer l'annonce correspondante
    this.listing = {
      id: id,
      title: 'Property 1',
      description: 'Spacious property in the city center.',
      type: 'rent',
      wilaya: 'Tunis',
      numberOfRooms: 3,
      price: 1500,
      photos: ['assets/rent1.jpg', 'assets/rent2.webp','assets/rent3.jpg', 'assets/beja.jpg', 'assets/mahdia.jpg'] // Exemple de liste d'images
    };
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
    // Rediriger vers la page de mise à jour de l'annonce
    this.router.navigate(['/admin/update-listing', this.listing.id]);  // Assure-toi que la route existe
  }

  // Logique pour la suppression
  onDeleteListing(): void {
    const confirmDelete = confirm('Are you sure you want to delete this listing?');
    if (confirmDelete) {
      // Ajouter ici la logique pour supprimer l'annonce, par exemple un appel à une API
      console.log('Deleting listing: ', this.listing.id);
      // Après suppression, rediriger ou revenir à la page de listings
      this.router.navigate(['/admin/view']);  // Redirection vers la page des annonces
    }
  }
}
