import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { TUNISIAN_CITIES } from '../../constants/tunisian-cities';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-annonce-form',
  templateUrl: './annonce-form.component.html',
  styleUrls: ['./annonce-form.component.css']
})
export class AnnonceFormComponent implements OnInit {
  cities = TUNISIAN_CITIES;
  annonce: any = {};
  isEditMode = false;
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  annonceForm: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private router: Router
  ) {
    this.annonceForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      price: ['', [Validators.required, Validators.min(0)]],
      type: ['sale', Validators.required],
      location: ['', Validators.required],
      bedrooms: ['', [Validators.required, Validators.min(0)]],
      bathrooms: ['', [Validators.required, Validators.min(0)]],
      area: ['', [Validators.required, Validators.min(0)]],
      images: [[]]
    });
  }

  ngOnInit(): void {
    // No initialization needed
  }

  get f() {
    return this.annonceForm.controls;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) {
      this.previewUrls = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            this.previewUrls.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(files[i]);
      }
      this.annonceForm.patchValue({
        images: files
      });
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.annonceForm.invalid) {
      return;
    }

    const formData = this.annonceForm.value;
    const newListing = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      type: formData.type,
      location: formData.location,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area: Number(formData.area),
      images: this.previewUrls
    };

    this.listingService.addListing(newListing);
    
    Swal.fire({
      icon: 'success',
      title: 'Succès!',
      text: 'Annonce ajoutée avec succès!',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      this.router.navigate(['/dashboard/admin/view']);
    });
  }

  // Méthode pour annuler et réinitialiser le formulaire
  cancel() {
    this.annonceForm.reset();
    this.selectedFiles = [];
    this.previewUrls = [];
    this.router.navigate(['/dashboard/admin/view']);
  }
}
