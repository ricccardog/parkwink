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
 
  pagination = {
    pageNo : 1,
    size : 4
  }
  collectionSize : number
  searched = false;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getCustomers(this.pagination);
    this.getColl();
  }

  //GET
  getCustomers(pagination): void {
    this.searched = false;
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
    this.searched = true;
    this.customerService
      .searchCustomer(event)
      .subscribe(data => { this.customers = data })
  }
  
}