import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {
  
  @Output() searchOutput = new EventEmitter <{}> ()

  options = {
    'name': '',
    'surname': '',
    'email': ''
  }

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content)
  }

  searchCustomers(){ 
  this.searchOutput.emit(this.options)  
  this.resetOptions();
  this.modalService.dismissAll();
  }

  resetOptions(){
    for(let k in this.options)this.options[k]='';
  }

}
