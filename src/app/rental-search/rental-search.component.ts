import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RentalsService } from '../rentals.service';
import { Rental } from '../rentals';
import { RentalFilter } from '../rentalFilter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from '../cars';
import { CarService } from '../car.service';
import { Customer } from '../customers';
import { CustomerService } from '../customer.service'

@Component({
  selector: 'app-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.css']
})
export class RentalSearchComponent implements OnInit {

  @Output() searchOutput = new EventEmitter <RentalFilter> ();
  
  searchOptions = {} as RentalFilter;
  rentals : Rental[] = [];
  cars : Car[] = [];
  customers : Customer[] = [];
  searchFields = ['Car' , 'Customer'];

  constructor(private modalService: NgbModal, private rentalsService: RentalsService, 
              private customerService: CustomerService, private carService: CarService) { }

  ngOnInit(): void {
    this.rentalsService
        .getRentals()
        .subscribe(data => { this.rentals = data});
    this.carService
        .getCars()
        .subscribe(data => {this.cars = data});
    this.customerService
        .getCustomers()
        .subscribe(data => {this.customers = data})
  }
  //OPEN MODAL
  open(content) {
    this.modalService.open(content)
  }
  //SEARCH
  searchRentals() {
    this.searchOutput.emit(this.searchOptions);
    this.resetOptions();
    this.modalService.dismissAll();
  }
  //RESET
  resetOptions(){
    for(let k in this.searchOptions) this.searchOptions[k]=undefined;
  }
}
