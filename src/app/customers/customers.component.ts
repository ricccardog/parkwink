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
    const opt = {};

    for(let k in options) {
      if(options[k]!='') {
        opt[k]=options[k].toLowerCase();
      }
    }

    this.customerService 
        .searchCustomer(opt)
        .subscribe(data => {this.customers = data}) 
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