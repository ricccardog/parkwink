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

  constructor(private customerService: CustomerService) { 
  }

  ngOnInit() : void { 
    this.getCustomers(); 
  }
  
  //GET
  getCustomers(): void {
    this.customerService
      .getCustomers()
      .subscribe(customers => { this.customers = customers })
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
 
/* 
  deleteCustomer(): void {
    this.customerService
      .deleteCustomer(this.customerId)
      .subscribe(customer => { this.getCustomers() })
  }

  updateCustomer(): void {
    this.customerService
      .updateCustomer(this.selectCustomer)
      .subscribe(customer => { this.getCustomers })
  }
 */
 /*  addCustomer(): void {
    this.customerService
      .addCustomer(this.selectCustomer)
      .subscribe(customer => { this.getCustomers() })
  } */

  /* searchCustomer(): void{
    this.customerService
        .searchCustomer(this.surnameSearch, this.nameSearch)
        .subscribe(data => {this.customers = data})
  } */

}