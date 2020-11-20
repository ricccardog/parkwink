import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerFilter } from '../customerFilter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {
  
  @Output() searchOutput = new EventEmitter <CustomerFilter> ()

  searchOptions = {} as CustomerFilter;
  searchFields = ['name' , 'surname' , 'email'];
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.resetOptions()
  }

  open(content) {
    this.modalService.open(content)
  }

  searchCustomers(){ 
    this.searchOutput.emit(this.searchOptions);
    this.resetOptions();
    this.modalService.dismissAll();
  }
  
  resetOptions(){
    for(let k in this.searchOptions) this.searchOptions[k]='';
  }

   
}
