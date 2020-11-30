import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Rental } from '../rentals';
import { RentalsService } from '../rentals.service';
import { Customer } from '../customers';
import { CustomerService } from '../customer.service'
import { Car } from '../cars';
import { CarService } from '../car.service';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {

  rental: Rental;
  editRental = {} as Rental;
  customers: Customer [] = [];
  cars: Car[] = [];
  rentalForm : FormGroup;
  
  constructor(
    private rentalService : RentalsService,
    private carService : CarService,
    private customerService : CustomerService,
    private route : ActivatedRoute,
    private location : Location,
    private modal : NgbModal) { }

  ngOnInit(): void {
    this.getData();
  }

  //STARTING SERVICE
  getData() {
  this.rental = this.route.snapshot.data.rentalResolve as Rental;
  this.editRental._id = this.rental._id;
  this.customerService
      .getCustomers()
      .subscribe(customers => {this.customers = customers});
  this.carService
      .getCars()
      .subscribe(cars => {this.cars = cars})
    
  }

  //OPEN UPDATE MODAL
  open(content){
    this.modal.open(content)
  }
  //NAVIGATE BACK
  goBack(): void {
    this.location.back();
  }

  //DELETE
  deleteRental(): void {
    if(confirm("Are you sure you want to delete this rental?")){
      this.rentalService
          .deleteRental(this.rental._id)
          .subscribe(data => {alert("Rental successfully deleted!")})
    }
  }
  
  //UPDATE
  updateRental(): void {
    if(confirm('Are you sure you want to edit this rental?')){
    this.rentalService
        .updateRental(this.editRental)
        .subscribe(rental => {})
      }
    this.rentalService
        .readRental(this.editRental._id)
        .subscribe(data => this.rental = data)
    this.modal.dismissAll();

  }
   
  
  

}
