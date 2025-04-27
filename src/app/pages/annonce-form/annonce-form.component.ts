import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder et Validators
import { WILAYAS } from 'src/app/shared/wilayaData'; // Assurez-vous que le chemin est correct
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-annonce-form',
  templateUrl: './annonce-form.component.html',
  styleUrls: ['./annonce-form.component.css']
})
export class AnnonceFormComponent implements OnInit {
  wilayas = WILAYAS;
  annonce: any = {};
  isEditMode = false;
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  annonceForm: FormGroup; // Déclaration de annonceForm
  
  constructor(private fb: FormBuilder) {
    // Initialisation de annonceForm dans le constructeur
    this.annonceForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      wilaya: ['', Validators.required],
      pieces: ['', [Validators.required, Validators.min(1)]],
      prix: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    // Vous pouvez également faire l'initialisation ici si nécessaire
  }

  // Méthode pour gérer le changement de fichiers (photo)
  onFileChange(event: any) {
    const files: File[] = Array.from(event.target.files);

    if (files.length + this.selectedFiles.length > 5) {
      alert('Vous ne pouvez télécharger que 5 photos maximum.');
      return;
    }

    this.selectedFiles = [...this.selectedFiles, ...files];
    this.previewUrls = [];

    this.selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrls.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  // Méthode pour soumettre l'annonce
  onSubmit() {
    if (this.annonceForm.valid) {
      console.log('Annonce soumise:', this.annonceForm.value);
      console.log('Photos sélectionnées:', this.selectedFiles);
      // Vous pouvez envoyer les données au backend ici
    } else {
      console.log('Formulaire invalide');
    }
  }

  // Méthode pour annuler et réinitialiser le formulaire
  cancel() {
    this.annonceForm.reset();
    this.selectedFiles = [];
    this.previewUrls = [];
  }
}
