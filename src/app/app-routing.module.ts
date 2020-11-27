import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarslistComponent } from './carslist/carslist.component';
import { RentalsComponent } from './rentals/rentals.component';
import { CustomersComponent } from './customers/customers.component';

import { FormsModule} from '@angular/forms';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { ResolverService } from './resolver.service';

const routes: Routes = [

  { path: 'cars', component: CarslistComponent},
  { path: 'rentals', component: RentalsComponent},
  { path: 'customers', component: CustomersComponent},
  { path: 'customers/:_id', component: CustomerDetailComponent, resolve: { customerResolve : ResolverService}},
  { path: 'cars/:_id', component: CarDetailComponent, resolve: {carResolve : ResolverService}},
  { path: 'rentals/:_id', component: RentalDetailComponent, resolve: {rentalResolve : ResolverService}},
  { path: 'dashboard', redirectTo:'', pathMatch: 'full'},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  FormsModule],
  exports: [RouterModule],
  providers: [ResolverService]
})
export class AppRoutingModule { }


