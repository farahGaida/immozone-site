import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WilayaCardComponent } from './components/wilaya-card/wilaya-card.component';
import { ForSaleComponent } from './pages/for-sale/for-sale.component';
import { ForRentComponent } from './pages/for-rent/for-rent.component';
import { NavbarStyleDirective } from './directives/navbar-style.directive';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AnnonceFormComponent } from './pages/annonce-form/annonce-form.component';
import { ContactComponent } from './pages/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    WilayaCardComponent,
    ForSaleComponent,
    ForRentComponent,
    NavbarStyleDirective,
    DashboardComponent,
    AnnonceFormComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
