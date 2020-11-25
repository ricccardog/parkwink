import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Rental } from '../rentals';
import { RentalsService } from '../rentals.service';
import { Customer } from '../customers';
import { CustomerService } from '../customer.service'
import { Car } from '../cars';
import { CarService } from '../car.service';

@Component({
  selector: 'app-rental-modal',
  templateUrl: './rental-modal.component.html',
  styleUrls: ['./rental-modal.component.css']
})
export class RentalModalComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  rentalForm: FormGroup;
  newRental = {} as Rental;
  customers: Customer[] = [];
  cars: Car[] = [];

  constructor(private modalService: NgbModal,
              private rentalsService: RentalsService,
              private customerService: CustomerService,
              private carService: CarService) { }

  ngOnInit(): void {
    this.getData()
  }
  // OPEN MODAL
  open(content) {
    this.modalService.open(content)
  }
  //GET
  getData() {
    this.customerService
        .getCustomers()
        .subscribe(customers => {this.customers = customers});
    this.carService
        .getCars()
        .subscribe(cars => {this.cars = cars})
  }
  //POST
  addRental(): void {
    this.rentalsService
        .addRental(this.newRental)
        .subscribe(data => {this.rentalsService.getRentals()});
    this.close.emit();
    this.modalService.dismissAll();
  }

}
