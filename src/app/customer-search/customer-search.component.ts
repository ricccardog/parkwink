import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {

  @Output() forName = new EventEmitter <any> ()
  nameSearch = '';
  surnameSearch = '';

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content)
  }

  searchCustomers(nameSearch: string){
    this.forName.emit({'name': this.nameSearch, 'surname': this.surnameSearch})
    this.nameSearch = '';
    this.surnameSearch = '';
    this.modalService.dismissAll();
  }


}
