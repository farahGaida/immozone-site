import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ForRentComponent } from './pages/for-rent/for-rent.component';
import { ForSaleComponent } from './pages/for-sale/for-sale.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AnnonceFormComponent } from './pages/annonce-form/annonce-form.component';
import { ListingViewComponent } from './pages/listing-view/listing-view.component';
import { ListingDetailsComponent } from './pages/listing-details/listing-details.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [{ path: '', component: HomeComponent },
  { path: 'rent', component: ForRentComponent },
  { path: 'sale', component: ForSaleComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] ,  children: [
    { path: 'admin/view', component: ListingViewComponent },
    { path: 'admin/view/:id', component: ListingDetailsComponent } ,
    { path: 'admin/add', component: AnnonceFormComponent },
    { path: '', redirectTo: 'annonces', pathMatch: 'full' }
  ]},

  { path: '**', component: NotFoundComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
