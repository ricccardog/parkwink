import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../customers';
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    private location : Location) {
   }

  ngOnInit(): void {
    this.getCustomer();   
  }
  //GET
  getCustomer(): void {
    const id : string = this.route.snapshot.paramMap.get('_id');
    this.customerService.readCustomer(id)
        .subscribe(data => this.customer = data) 
  }
  //BACK TO CUSTOMERS
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
