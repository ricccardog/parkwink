import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';

import { Rentals } from '../rentals';
import { CUSTOMERS } from '../mock-customers';
import { CARS } from '../mock-cars';
import { RENTALS } from '../mock-rentals';


import { CustomerService } from '../customer.service';
import { CarService } from '../car.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css']
})
export class RentalFormComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  newRental = {} as Rentals;
  rentalForm : FormGroup;
  cars = CARS;
  customers = CUSTOMERS;
  
    constructor(private customerService: CustomerService, private carService: CarService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

 
  addRental(){
    this.newRental.id = RENTALS.length +1;
    this.newRental.price = this.newRental.car.price;
    RENTALS.push(this.newRental)
    this.newRental = {} as Rentals;
    this.close.emit();
    this.modalService.dismissAll();
  }
}
