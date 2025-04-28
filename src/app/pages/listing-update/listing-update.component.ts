import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService, Listing } from '../../services/listing.service';
import { TUNISIAN_CITIES } from '../../constants/tunisian-cities';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listing-update',
  templateUrl: './listing-update.component.html',
  styleUrls: ['./listing-update.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ListingUpdateComponent implements OnInit {
  listingForm: FormGroup;
  listingId: number = 0;
  previewUrls: string[] = [];
  cities = TUNISIAN_CITIES;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingService
  ) {
    this.listingForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      price: [0, [Validators.required, Validators.min(0)]],
      type: ['sale', Validators.required],
      location: ['', Validators.required],
      bedrooms: [0, [Validators.required, Validators.min(0)]],
      bathrooms: [0, [Validators.required, Validators.min(0)]],
      area: [0, [Validators.required, Validators.min(0)]],
      images: [[]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.listingId = parseInt(idParam, 10);
      if (!isNaN(this.listingId)) {
        const listing = this.listingService.getListingById(this.listingId);
        if (listing) {
          this.previewUrls = [...listing.images];
          this.listingForm.patchValue({
            title: listing.title,
            description: listing.description,
            price: listing.price,
            type: listing.type,
            location: listing.location,
            bedrooms: listing.bedrooms,
            bathrooms: listing.bathrooms,
            area: listing.area,
            images: []
          });
        } else {
          this.router.navigate(['/dashboard/admin/view']);
        }
      } else {
        this.router.navigate(['/dashboard/admin/view']);
      }
    }
  }

  get f() {
    return this.listingForm.controls;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      
      if (!this.previewUrls.length) {
        this.previewUrls = [];
      }
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            this.previewUrls.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });

      this.listingForm.patchValue({
        images: files
      });
    }
  }

  onSubmit(): void {
    if (this.listingForm.valid) {
      const formData = new FormData();
      const formValue = this.listingForm.value;
      
      Object.keys(formValue).forEach(key => {
        if (key !== 'images') {
          const value = formValue[key];
          if (value !== null && value !== undefined) {
            formData.append(key, value.toString());
          }
        }
      });

      const imageFiles = this.listingForm.get('images')?.value;
      if (imageFiles && imageFiles.length > 0) {
        (Array.from(imageFiles) as File[]).forEach((file: File) => {
          formData.append('images', file);
        });
      }

      const updatedListing = this.listingService.updateListing(this.listingId, {
        ...formValue,
        images: this.previewUrls
      });

      if (updatedListing) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Listing updated successfully',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/dashboard/admin/view']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to update listing. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard/admin/view']);
  }
} 