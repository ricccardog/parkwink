import { Component, OnInit } from '@angular/core';
import { Customer } from '../customers';
import { CustomerService } from '../customer.service';
import { Pagination } from '../pagination';
import { CustomerFilter } from '../customerFilter';

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
    toSort : '_id',
    order : 1
  }
  //SEARCH PROPERTIES
  searchOptions = {} as CustomerFilter;
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
    this.getColl();
    this.getCustomers();
    this.resetOptions();
  }

  //GET
  getCustomers(): void {
    this.sliceParams();

    for (let i = this.skip; i < this.limit; i++) {

      if (this.customers[i]) {

        continue

      } else {

        this.customerService
          .getCustomers(this.pag)
          .subscribe(data => {
            this.customers[i] = data[i - this.skip]
          })
      }
    }
    
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

  //GET COLLECTION LENGTH
  getColl() : void {
    this.customerService
        .getCustomers()
        .subscribe(data => { this.collectionSize = data.length})
  }
  //REFRESH COLLECTION AFTER ADDING
  refreshCustomers() {
    this.getCustomers();
    this.getColl();
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
  }

  //RESET SEARCH OPTIONS
  resetOptions(){
    for(let k in this.searchOptions) this.searchOptions[k]='';
  }
  
}