import { Component, OnInit } from '@angular/core';
import { Customer } from '../customers';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {

  customers: Customer[] = [];
  sortOrder = '';
  stringSortTracker = 0;
  numSortTracker = 0;

  pagination = {
    pageNo : 1,
    size : 4
  }
  collectionSize : number

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getCustomers(this.pagination);
    this.getColl();
  }

  //GET
  getCustomers(pagination): void {
    this.customerService
      .getCustomers(this.pagination)
      .subscribe(data => { this.customers = data})
  }
  //GET COLLECTION LENGTH
  getColl() : void {
    this.customerService
        .getCustomers()
        .subscribe(data => { this.collectionSize = data.length})
  }
  //REFRESH AFTER ADDING
  refreshCustomers() {
    this.getCustomers(this.pagination);
    this.getColl();
  }
  //SEARCH
  searchCustomer(event): void {
    this.customerService
      .searchCustomer(event)
      .subscribe(data => { this.customers = data })
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
  
}