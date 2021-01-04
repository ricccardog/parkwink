import { Component, OnInit } from '@angular/core';
import { RentalFilter } from '../rentalFilter';
import { Rental } from '../rentals';
import { RentalsService } from '../rentals.service'
import { Pagination } from '../pagination';
import { Car } from '../cars';
import { Customer } from '../customers';
import { CarService } from '../car.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['../detailStyle.css']
})

export class RentalsComponent implements OnInit {

  rentals: Rental[] = [];

  pag: Pagination = {
    pageNo : 1,
    size : 4,
    toSort : '_id',
    order : 1
  }
  //SEARCH PROPERTIES
  searchOptions = {} as RentalFilter;
  searched = false;
  showFilters = false;
  searchByCar = false;
  searchByCustomer = false;
  cars : Car[];
  customers : Customer[];
  //GET PROPERTIES
  collectionSize : number;
  skip: number;
  limit: number;
  //SORT PROPERTIES
  sortParameter: string;
  arrow: string;
  sortOrder = true;

  constructor(
    private rentalsService: RentalsService,
    private customerService: CustomerService,
    private carService: CarService) {}

  ngOnInit(): void {
    this.getColl();
    this.getRentals();
    this.resetOptions();
  }

  //GET
  getRentals(): void {
    this.sliceParams();

    for (let i = this.skip; i < this.limit; i++) {

      if (this.rentals[i]) {

        continue

      } else {

        this.rentalsService
          .getRentals(this.pag)
          .subscribe(data => {
            this.rentals[i] = data[i - this.skip]
          })
      }
    }

  }
  
  //LOCAL SORTING


  //SLICE PAGINATION PARAMETERS
  sliceParams() {
    
    this.skip = (this.pag.pageNo - 1) * this.pag.size;
    this.limit = this.pag.size * this.pag.pageNo;
    if (this.limit > this.collectionSize && this.collectionSize) this.limit = this.collectionSize;

  }
  // GET COLLECTION LENGTH
  getColl() : void {
    this.rentalsService
        .getRentals()
        .subscribe(data => { this.collectionSize = data.length})
  }
  //REFRESH AFTER ADDING
  refreshRentals() {
    this.getRentals();
    this.getColl();
  }

  //SHOW SEARCH MENU
  showSearch(){
    this.showFilters = !this.showFilters;
    this.carService.getCars().subscribe(data => this.cars = data);
    this.customerService.getCustomers().subscribe(data => this.customers = data);
  }

  //SEARCH RENTALS
  searchRental(){
    this.searched = true;
    console.log(this.searchOptions)
    this.rentalsService
        .searchRental(this.searchOptions)
        .subscribe(data => { this.rentals = data});
    this.resetOptions();
  }
  
  //RESET SEARCH OPTIONS
  resetOptions(){
    for(let k in this.searchOptions) this.searchOptions[k]='';
  }
  
}


