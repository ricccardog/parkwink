import { Component, OnInit, NgModule } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Rentals } from '../rentals';
import { RENTALS } from '../mock-rentals';
import { Car } from '../cars';
import { CARS } from '../mock-cars';
import { Customer } from '../customers';
import { CUSTOMERS } from '../mock-customers';
import { CustomerService } from '../customer.service';
import { CarService } from '../car.service';


@Component({
  selector: 'app-rental-modal',
  templateUrl: './rental-modal.component.html',
  styleUrls: ['./rental-modal.component.css']
})
export class RentalModalComponent implements OnInit {

  rental = {} as Rentals;
  customers = CUSTOMERS;
  cars= CARS;
  
  constructor(private customerService: CustomerService, private carService: CarService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy:'rental-modal-title'})
  }

  addRental(): void {
    
    this.rental.id= RENTALS.length +1;
    RENTALS.push(this.rental);
    console.log(this.rental);
    this.rental= {} as Rentals;
  }
}
