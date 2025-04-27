import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Ajout du Router pour la navigation

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Formulaire pour la connexion
  submitted = false; // Indicateur si le formulaire est soumis

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Initialiser le formulaire avec validation
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Validation de l'email
      password: ['', [Validators.required, Validators.minLength(6)]], // Validation du mot de passe
      rememberMe: [false] // Option de mémorisation de la session
    });
  }

  // Méthode pour accéder facilement aux contrôles du formulaire
  getControl(name: string) {
    return this.loginForm.get(name);
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    this.submitted = true; // Marquer le formulaire comme soumis

    // Si le formulaire est invalide, sortir de la fonction
    if (this.loginForm.invalid) {
      return;
    }

    console.log('Formulaire valide', this.loginForm.value);

    // Simuler une connexion réussie (ici on sauvegarde l'état dans localStorage)
    localStorage.setItem('isLoggedIn', 'true'); // Sauvegarder l'état de la connexion

    // Rediriger l'utilisateur vers le tableau de bord (dashboard)
    this.router.navigate(['/dashboard/admin/view']); // Redirection vers le dashboard
  }
}
