import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { searchFilter } from '../searchFilter';
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
  cars : Car[] = [];
  customers : Customer[] = [];

  pag: Pagination = {
    pageNo : 1,
    size : 4,
    sort : 'id',
    order : 1
  }  
  
  //SEARCH PROPERTIES
  searchOptions = {} as searchFilter;
  searched = false;
  showFilters = false;
  searchByCar = false;
  searchByCustomer = false;
  nullValue = null;
  //GET PROPERTIES
  collectionSize : number;
  skip: number;
  limit: number;
  //SORT PROPERTIES
  arrow: string;
  sortParameter : string;
  sortOrder = true;

  constructor(
    private rentalsService: RentalsService,
    private customerService: CustomerService,
    private carService: CarService) {}

  ngOnInit(): void {
    this.rentals.length = 0;
    this.cars.length = 0;
    this.customers.length = 0;
    this.getCollectionSize();
    this.getRentals();
  }

  //GET
  getRentals() {

    this.sliceParams();
    this.resetOptions();

    this.searched = false;
    
    if(this.collectionSize && this.rentals.length != this.collectionSize) {
      this.arrow = '';
    }

    if(this.collectionSize != this.rentals.length || this.collectionSize == undefined || this.rentals.includes(undefined)) {
      this.rentalsService
        .getRentals(this.pag)
        .subscribe(data => {
          for(let i =0; i < this.pag.size; i++) {

            if(data[i]) {
              this.rentals[this.skip +i] = data[i];
            }
          
          }
        });
    }
  return this.rentals
  }
  
  
  //LOCAL SORTING
  sortByDate(){

    this.sortParameter = 'startDate';

    if (this.sortOrder === true) {

      this.sortOrder = false;
      this.arrow = '↑';
      this.rentals.sort(function (a, b) {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      })

    } else {

      this.sortOrder = true;
      this.arrow = '↓';
      this.rentals.sort(function (a, b) {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      })
    }
 
  }

  sortByEnd() {

    this.sortParameter = 'endDate';

    if (this.sortOrder === true) {

      this.sortOrder = false;
      this.arrow = '↑';
      this.rentals.sort(function (a, b) {
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      })

    } else {

      this.sortOrder = true;
      this.arrow = '↓';
      this.rentals.sort(function (a, b) {
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      })
    }
  }

  //SLICE PAGINATION PARAMETERS
  sliceParams() {
    
    this.skip = (this.pag.pageNo - 1) * this.pag.size;
    this.limit = this.pag.size * this.pag.pageNo;
    if (this.limit > this.collectionSize && this.collectionSize) this.limit = this.collectionSize;

  }

  //GET COLLECTION SIZE FROM DATABASE
  getCollectionSize() {

    this.rentalsService
      .getCollectionSize()
      .subscribe(data => {
        this.collectionSize = data;
      });

    return this.collectionSize
  }

  //REFRESH COLLECTION AFTER ADDING
  refreshRentals() {

    this.collectionSize++;
    this.getRentals();

  }

  //SHOW SEARCH MENU 
  showSearch(){
    this.showFilters = !this.showFilters;
  }
  //FETCH DATA FOR SEARCH
  fetchData() {
    
    if(this.searchOptions.searchKey == "car_id") {

      this.searchByCar = true;
      this.searchByCustomer = false;

      this.carService
        .getCars()
        .subscribe(data => this.cars = data);

    } else if(this.searchOptions.searchKey == "customer_id") {

      this.searchByCustomer = true;
      this.searchByCar = false;

      this.customerService
        .getCustomers()
        .subscribe(data => this.customers = data);

    }
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


