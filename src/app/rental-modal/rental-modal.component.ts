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
  styleUrls: ['../detailStyle.css']
})

export class RentalModalComponent implements OnInit {

  @Output() addedRental = new EventEmitter<void>();

  rentalForm = new FormGroup({
    car_id: new FormControl(''),
    customer_id: new FormControl(''),
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
      .subscribe(data => { 
        console.log('Rental successfully added');
        this.addedRental.emit();
        this.rentalForm.reset();
        this.modalService.dismissAll();
      });

  }

  //DATE RANGE VALIDATION
  dateRange(control: FormGroup): ValidationErrors | null {
    const endDate = control.get('endDate');
    const startDate = control.get('startDate');

    return endDate && startDate && endDate.value < startDate.value ? { wrongRange: true } : null;
  }

  //MISSING FIELDS VALIDATION
  missingFields(control: FormGroup): ValidationErrors | null {
    const car_id = control.get('car_id');
    const customer_id = control.get('customer_id');
    const startDate = control.get('startDate');
    const endDate = control.get('endDate');
    const price = control.get('price');

    if (car_id.value && customer_id.value && startDate.value && endDate.value && price.value) return null
    else return { missingFields: true }
  }

}

