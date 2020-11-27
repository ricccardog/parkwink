import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ResolverService } from '../resolver.service';

import { Customer } from '../customers';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer : Customer;
  fields = ['name', 'surname' , 'email']

  constructor(
    private customerService : CustomerService,
    private route : ActivatedRoute,
    private location : Location) {}

  ngOnInit(): void {
    this.customer = this.route.snapshot.data.customerResolve as Customer;   
  }
  
  //NAVIGATE BACK
  goBack(): void {
    this.location.back();
  }
  
  //DELETE
  deleteCustomer(): void {
    if(confirm(`Are you sure you want to delete user ${this.customer.name} ${this.customer.surname} ?`)){
    this.customerService
        .deleteCustomer(this.customer._id)
        .subscribe(data => {alert('Customer successfully deleted')})
    }
  }
    
  
}
