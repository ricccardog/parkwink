import { Component, OnInit } from '@angular/core';
import { Customer } from '../customers';
import { CustomerService } from '../customer.service';
import { Pagination } from '../pagination';
import { searchFilter } from '../searchFilter';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['../detailStyle.css']
})

export class CustomersComponent implements OnInit {

  customers: Customer[] = [];
 
  pag: Pagination = {
    pageNo : 1,
    size : 4,
    sort : 'id',
    order : 1
  }

  //SEARCH PROPERTIES
  searchOptions = {} as searchFilter;
  fields = ["name", "surname", "email", "drivingLicense"]
  searched = false;
  showFilters = false;
  //GET PROPERTIES
  collectionSize : number;
  skip: number;
  limit: number;
  //SORT PROPERTIES
  sortParameter: string;
  arrow: string;
  sortOrder = true;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customers.length = 0;
    this.getCollectionSize();
    this.getCustomers();
  }

  //GET
  getCustomers() {

    this.sliceParams();
    this.resetOptions();
    
    this.searched = false;
    
    if(this.collectionSize && this.customers.length != this.collectionSize) {
      this.arrow = '';
    }

    if(this.collectionSize != this.customers.length || this.collectionSize == undefined || this.customers.includes(undefined)) {
      this.customerService  
        .getCustomers(this.pag)
        .subscribe(data => {

            for(let i = 0; i < this.pag.size; i++) {

              if(data[i]) {
                this.customers[this.skip + i] = data[i];
              }

            }
        })
    }
    return this.customers 
  }

  //LOCAL SORTING
  sortByString(){
    
    if(this.sortOrder==true){

      this.arrow = '↑';
      this.customers.sort((a,b)  => b[this.sortParameter].localeCompare(a[this.sortParameter]));
      this.sortOrder = false;

    }else{

      this.arrow = '↓';
      this.customers.sort((a,b)  => a[this.sortParameter].localeCompare(b[this.sortParameter]));
      this.sortOrder = true;
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

    this.customerService
        .getCollectionSize()
        .subscribe(data => {
           this.collectionSize = data
          })
    return this.collectionSize
  }

  //REFRESH COLLECTION AFTER ADDING
  refreshCustomers() {
    this.collectionSize++;
    this.getCustomers();
  }

  //SHOW SEARCH MENU
  showSearch(){
    this.showFilters = !this.showFilters;
  }

  //SEARCH CUSTOMERS
  searchCustomer(): void {
    this.searched = true;
    this.customerService
      .searchCustomer(this.searchOptions)
      .subscribe(data => { this.customers = data })
  this.resetOptions();
  }

  //RESET SEARCH OPTIONS
  resetOptions(){
    for(let k in this.searchOptions) this.searchOptions[k]='';
  }
  
}