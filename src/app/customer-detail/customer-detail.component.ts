import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Customer } from '../customers';
import { CustomerService } from '../customer.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['../detailStyle.css']
})
export class CustomerDetailComponent implements OnInit {

  customer: Customer;
  editCustomer = {} as Customer;
  customerForm: FormGroup;
  editMode = false;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getData();
  }

  //GET DATA
  getData(): void {
    this.customer = this.route.snapshot.data.customerResolve[0] as Customer;

    this.editCustomer.id = this.customer.id;
  }

  //NAVIGATE BACK
  goBack(): void {
    this.location.back();
  }

  //DELETE
  deleteCustomer(): void {

    if (confirm(`Are you sure you want to delete user ${this.customer.name} ${this.customer.surname} ?`)) {
      this.customerService
        .deleteCustomer(this.customer.id)
        .subscribe(data => { 
          alert('Customer successfully deleted');
          this.goBack();
        });
    }

  }

  //UPDATE
  updateCustomer(): void {

    if (confirm('Are you sure you want to update this customer?')) {
     
      this.customerService
        .updateCustomer(this.editCustomer)
        .subscribe(customer => {
           alert('Customer successfully edited');
          
           for(let key in this.editCustomer){
             if(this.customer[key] != this.editCustomer[key]) this.customer[key] = this.editCustomer[key];
           }

           this.startEditing();

          });
    }
    
  }

  //TOGGLE EDIT MODE
  startEditing(){
    this.editMode = !this.editMode;
  }

}
