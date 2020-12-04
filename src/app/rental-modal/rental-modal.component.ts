import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    car: new FormControl(''),
    customer: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    price: new FormControl('', Validators.min(1))
  }, {
    validators: [this.dateRange, this.missingFields]
  });

  customers: Customer[] = [];
  cars: Car[] = [];

  constructor(
    private modalService: NgbModal,
    private rentalsService: RentalsService,
    private customerService: CustomerService,
    private carService: CarService) {
  }

  ngOnInit(): void {
  }

  // OPEN MODAL
  open(content) {
    this.getData();
    this.modalService.open(content)
  }

  //GET
  getData() {
    this.customerService
      .getCustomers()
      .subscribe(customers => { this.customers = customers });
    this.carService
      .getCars()
      .subscribe(cars => { this.cars = cars })
  }

  //POST
  addRental(): void {
    this.rentalsService
      .addRental(this.rentalForm.value)
      .subscribe(data => { this.rentalsService.getRentals() });
    this.close.emit();
    this.modalService.dismissAll();
  }

  //DATE RANGE VALIDATION
  dateRange(control: FormGroup): ValidationErrors | null {
    const endDate = control.get('endDate');
    const startDate = control.get('startDate');

    return endDate && startDate && endDate.value < startDate.value ? { wrongRange: true } : null;
  }

  //MISSING FIELDS VALIDATION
  missingFields(control: FormGroup): ValidationErrors | null {
    const car = control.get('car');
    const customer = control.get('customer');
    const startDate = control.get('startDate');
    const endDate = control.get('endDate');
    const price = control.get('price');

    if (car.value && customer.value && startDate.value && endDate.value && price.value) return null
    else return { missingFields: true }
  }

}

