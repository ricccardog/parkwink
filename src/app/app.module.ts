import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RentalsComponent } from './rentals/rentals.component';
import { CustomersComponent } from './customers/customers.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarformComponent } from './carform/carform.component';
import { CarslistComponent } from './carslist/carslist.component';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';
import { RentalModalComponent } from './rental-modal/rental-modal.component';
import { RentalFormComponent } from './rental-form/rental-form.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CarslistComponent,
    RentalsComponent,
    CustomersComponent,
    DashboardComponent,
    CarformComponent,
    CustomerModalComponent,
    RentalModalComponent,
    RentalFormComponent,
    CustomerFormComponent
    ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
