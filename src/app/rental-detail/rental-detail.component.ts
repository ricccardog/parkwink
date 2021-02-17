import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Rental } from '../rentals';
import { RentalsService } from '../rentals.service';
import { Customer } from '../customers';
import { CustomerService } from '../customer.service'
import { Car } from '../cars';
import { CarService } from '../car.service';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['../detailStyle.css']
})
export class RentalDetailComponent implements OnInit {

  rental: Rental;
  editRental = {} as Rental;
  customers: Customer[] = [];
  cars: Car[] = [];
  editMode = false;
  validDates = false;

  constructor(
    private rentalService: RentalsService,
    private carService: CarService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getData();
  }

  //STARTING SERVICE
  getData() {

    this.rental = this.route.snapshot.data.rentalResolve as Rental;
    this.editRental.id = this.rental.id;
   
    this.customerService
      .getCustomers()
      .subscribe(customers => { this.customers = customers });
   
      this.carService
      .getCars()
      .subscribe(cars => { this.cars = cars })

  }

  //NAVIGATE BACK
  goBack(): void {
    this.location.back();
  }

  //DELETE
  deleteRental(): void {

    if (confirm("Are you sure you want to delete this rental?")) {
      this.rentalService
        .deleteRental(this.rental.id)
        .subscribe(data => { 
          alert("Rental successfully deleted!");
        this.goBack();
      });
    }
  }

  // DATE VALIDATION
  dateCheck() {

    if (this.editRental.startDate && this.editRental.endDate) {

      if (this.editRental.startDate <= this.editRental.endDate) this.validDates = true;

    } else if (this.editRental.startDate && !this.editRental.endDate) {

      if (this.editRental.startDate <= this.rental.endDate) this.validDates = true;

    } else if (!this.editRental.startDate && this.editRental.endDate) {

      if (this.rental.startDate <= this.editRental.endDate) this.validDates = true;

    } else {

      this.validDates = true;
    }
  }

  //UPDATE
  updateRental(): void {

    this.dateCheck();
    if (this.validDates === true) {
      if (confirm('Are you sure you want to edit this rental?')) {
        this.rentalService
          .updateRental(this.editRental)
          .subscribe(rental => {
            alert('Rental successfully edited');

            for(let key in this.editRental){
              if(this.rental[key] != this.editRental[key]){
                this.rental[key] = this.editRental[key];
              }
            }
          })
      }
    } else {
      confirm('Please insert a valid date range')
    }
    this.startEditing();
  }

  //TOGGLE EDIT MODE
  startEditing() {
    this.editMode = !this.editMode
  }

}
