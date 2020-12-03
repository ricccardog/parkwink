import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
 
  rentalForm = new FormGroup({
    car : new FormControl('', Validators.required),
    customer : new FormControl('', Validators.required),
    startDate : new FormControl('', Validators.required),
    endDate : new FormControl('', Validators.required),
    price : new FormControl('', Validators.required)
  })

  fieldCheck = {
    car : this.rentalForm.get('car'),
    customer : this.rentalForm.get('customer'),
    startDate : this.rentalForm.get('startDate'),
    endDate : this.rentalForm.get('endDate'),
    price : this.rentalForm.get('price')
  }

  customers: Customer[] = [];
  cars: Car[] = [];

  constructor(
    private modalService: NgbModal,
    private rentalsService: RentalsService,
    private customerService: CustomerService,
    private carService: CarService) { 

    }

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
        .addRental(this.rentalForm.value)
        .subscribe(data => {this.rentalsService.getRentals()});
    this.close.emit();
    this.modalService.dismissAll();
  }

}
