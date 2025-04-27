import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isMenuOpen = false;

  isDashboardPage = false;

  constructor(private router: Router) {
    // Met à jour la valeur en fonction de la route active
    this.router.events.subscribe(() => {
      this.isDashboardPage = this.router.url === '/dashboard';
      
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}