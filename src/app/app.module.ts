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
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardViewListingComponent } from './components/card-view-listing/card-view-listing.component';
import { ListingViewComponent } from './pages/listing-view/listing-view.component';
import { ListingDetailsComponent } from './pages/listing-details/listing-details.component';
import { LoginService } from './services/login.service';
import { ListingService } from './services/listing.service';
import { ContactService } from './services/contact.service';

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
    ContactComponent,
    SidebarComponent,
    CardViewListingComponent,
    ListingViewComponent,
    ListingDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    FormsModule
  ],
  providers: [LoginService, ListingService, ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
