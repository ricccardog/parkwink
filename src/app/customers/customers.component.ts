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
    size : 4,
    toSort : '_id',
    order : -1
  }

  collectionSize : number
  searched = false;
  byName = false;
  bySurname = false;
  arrow : string;

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
  //SORT
  sortByName() {
    this.byName = true;
    this.bySurname = false;
    this.pagination.order = -this.pagination.order;
    this.pagination.toSort = "name";
    this.setArrow();
    this.getCustomers(this.pagination);
    this.getColl();
  }
  sortBySurname() {
    this.byName = false;
    this.bySurname = true;
    this.pagination.order = -this.pagination.order;
    this.pagination.toSort = "surname";
    this.setArrow();
    this.getCustomers(this.pagination);
    this.getColl();
  }
  setArrow(){
    if(this.pagination.order===1) this.arrow = "↑";
    else this.arrow = "↓";
  }
  
}