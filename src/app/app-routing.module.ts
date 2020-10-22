import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarslistComponent } from './carslist/carslist.component';
import { RentalsComponent } from './rentals/rentals.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = [

  { path: 'cars' , component: CarslistComponent},
  { path: 'rentals' , component: RentalsComponent},
  { path: 'customers', component: CustomersComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


