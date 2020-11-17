import { Component, OnInit} from '@angular/core';

import { Customer } from '../customers';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})


export class CustomersComponent  implements OnInit{


  customers: Customer[] = [];
  nameSearch = '';
  surnameSearch = '';
  //customerId = '';
  //selectCustomer : Customer;
 /*  surnameSearch = '';
  nameSearch= '';
 */
  constructor(private customerService: CustomerService) { 

  }

  ngOnInit() : void { 
    this.getCustomers(); 
  }

  getCustomers(): void {
    this.customerService
      .getCustomers()
      .subscribe(customers => { this.customers = customers })
  }

  searchCustomer($event) {
    const options = $event;
    this.nameSearch=options.name;
    this.surnameSearch=options.surname;
    this.customerService 
        .searchCustomer(this.nameSearch, this.surnameSearch)
        .subscribe(data => {this.customers = data}) 
  }

  resetSearch() {
    this.nameSearch='';
    this.surnameSearch='';
    this.getCustomers()
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