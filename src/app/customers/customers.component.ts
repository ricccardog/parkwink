import { Component, OnInit } from '@angular/core';
import { Customer } from '../customers';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent  implements OnInit{

  customers : Customer[] = [];
  sortOrder = '';
  stringSortTracker = 0;
  numSortTracker = 0;

  CUSTOMERS: Customer[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = this.CUSTOMERS.length;

  constructor(private customerService: CustomerService) { 
    this.refreshCustomers();
  }

  ngOnInit() : void { 
    this.getCustomers(); 
  }
  
  //GET
  getCustomers(): void {
    this.customerService
      .getCustomers()
      .subscribe(data => { this.customers = data; this.CUSTOMERS = data })
  }
  //SEARCH
  searchCustomer(event): void {
    this.customerService
        .searchCustomer(event)
        .subscribe( data => {this.customers = data})
  }
  //SORT LIST
  sortByString() {
    this.stringSortTracker++;
    if (this.stringSortTracker % 2 == 0) {
      this.customerService
        .getCustomers()
        .subscribe(data => {
          this.customers = data.sort((a, b) => a[this.sortOrder].localeCompare(b[this.sortOrder]))
        })
    } else {
      this.customerService
        .getCustomers()
        .subscribe(data => {
          this.customers = data.sort((a, b) => b[this.sortOrder].localeCompare(a[this.sortOrder]))
        })
    }
  }
  sortByNumber() {
    this.numSortTracker++;
    if (this.numSortTracker % 2 == 0) {
      this.customerService
        .getCustomers()
        .subscribe(data => {
          this.customers = data.sort((a, b) => { return a.drivingLicense - b.drivingLicense })
        })
    } else {
      this.customerService
        .getCustomers()
        .subscribe(data => {
          this.customers = data.sort((a, b) => { return b.drivingLicense - a.drivingLicense })
        })
    }
  }
  //PAGINATION
  refreshCustomers() {
    this.CUSTOMERS = this.customers
    .map((customer, i) => ({id: i+1, ...customer}))
    .slice((this.page-1) * this.pageSize, (this.page -1) * this.pageSize + this.pageSize)
  }
 
}