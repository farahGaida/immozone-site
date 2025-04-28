import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  type: 'rent' | 'sale';
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private listings = new BehaviorSubject<Listing[]>([]);
  private nextId = 1;

  constructor() {
    // Initialize with some sample data
    const initialListings: Listing[] = [
      {
        id: this.nextId++,
        title: 'Modern Apartment in Downtown',
        description: 'Beautiful modern apartment with great views',
        price: 250000,
        type: 'sale',
        location: 'Downtown',
        bedrooms: 2,
        bathrooms: 2,
        area: 120,
        images: ['/assets/images/apartment1.jpg'],
        createdAt: new Date().toISOString()
      },
      {
        id: this.nextId++,
        title: 'Cozy Studio for Rent',
        description: 'Perfect for students or young professionals',
        price: 800,
        type: 'rent',
        location: 'University District',
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        images: ['/assets/images/studio1.jpg'],
        createdAt: new Date().toISOString()
      }
    ];
    this.listings.next(initialListings);
  }

  getListings() {
    return this.listings.asObservable();
  }

  addListing(listing: Omit<Listing, 'id' | 'createdAt'>) {
    const currentListings = this.listings.value;
    const newListing: Listing = {
      ...listing,
      id: this.nextId++,
      createdAt: new Date().toISOString()
    };
    this.listings.next([...currentListings, newListing]);
    return newListing;
  }

  updateListing(id: number, listing: Partial<Listing>) {
    const currentListings = this.listings.value;
    const index = currentListings.findIndex(l => l.id === id);
    if (index !== -1) {
      const updatedListing = {
        ...currentListings[index],
        ...listing,
        id: id, // Preserve the original ID
        createdAt: currentListings[index].createdAt // Preserve the original creation date
      };
      currentListings[index] = updatedListing;
      this.listings.next([...currentListings]);
      return updatedListing;
    }
    return null;
  }

  deleteListing(id: number) {
    const currentListings = this.listings.value;
    const updatedListings = currentListings.filter(l => l.id !== id);
    this.listings.next(updatedListings);
  }

  getListingById(id: number) {
    return this.listings.value.find(l => l.id === id);
  }
} 