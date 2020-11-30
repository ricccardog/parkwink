import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResolverService } from '../resolver.service';

import { Customer } from '../customers';
import { CustomerService } from '../customer.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer : Customer;
  fields = ['name', 'surname' , 'email'];
  editCustomer = {} as Customer;
  customerForm : FormGroup;

  constructor(
    private customerService: CustomerService,
    private resolver : ResolverService,
    private route : ActivatedRoute,
    private location : Location,
    private modal : NgbModal) {}

  ngOnInit(): void {
    this.customer = this.route.snapshot.data.customerResolve as Customer;   
    this.editCustomer._id = this.customer._id
  }

  //OPEN UPDATE MODAL
  open(content){
    this.modal.open(content)
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
  //UPDATE
  updateCustomer(): void {
    if(confirm('Are you sure you want to update this customer?')){
    this.customerService
        .updateCustomer(this.editCustomer)
        .subscribe(customer => {alert('Customer successfully edited')})
    }
    this.modal.dismissAll();
  }
  
}
