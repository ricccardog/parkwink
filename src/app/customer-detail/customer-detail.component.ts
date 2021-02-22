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
    this.customer = this.route.snapshot.data.customerResolve as Customer;
    this.editCustomer._id = this.customer._id;
  }

  //NAVIGATE BACK
  goBack(): void {
    this.location.back();
  }

  //DELETE
  deleteCustomer(): void {
    if (confirm(`Are you sure you want to delete user ${this.customer.name} ${this.customer.surname} ?`)) {
      this.customerService
        .deleteCustomer(this.customer._id)
        .subscribe(data => { alert('Customer successfully deleted') })
    }
  }
  //UPDATE
  updateCustomer(): void {
    if (confirm('Are you sure you want to update this customer?')) {
      this.customerService
        .updateCustomer(this.editCustomer)
        .subscribe(customer => { alert('Customer successfully edited') })
    }
    this.customerService
      .readCustomer(this.editCustomer._id)
      .subscribe(data => this.customer = data);
    this.startEditing();
  }
  startEditing(){
    this.editMode = !this.editMode;
  }

}
