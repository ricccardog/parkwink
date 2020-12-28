import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RentalsComponent } from './rentals/rentals.component';
import { CustomersComponent } from './customers/customers.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarslistComponent } from './carslist/carslist.component';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';
import { RentalModalComponent } from './rental-modal/rental-modal.component';
import { CarModalComponent } from './car-modal/car-modal.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CarslistComponent,
    RentalsComponent,
    CustomersComponent,
    DashboardComponent,
    CustomerModalComponent,
    RentalModalComponent,
    CarModalComponent,
    CustomerSearchComponent,
    RentalSearchComponent,
    CustomerDetailComponent,
    CarDetailComponent,
    RentalDetailComponent,
  ],
  
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
