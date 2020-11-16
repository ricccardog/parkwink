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
  customerId = '';
  selectCustomer : Customer;
  text = '';

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

  addCustomer(): void {
    this.customerService
      .addCustomer(this.selectCustomer)
      .subscribe(customer => { this.getCustomers() })
  }

  searchCustomer(): void{
    this.customerService
        .searchCustomer(this.text)
        .subscribe(data => { this.customers = data})
    this.text = '';
  }
}
