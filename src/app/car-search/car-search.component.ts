import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CarFilter } from '../carFilter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.css']
})
export class CarSearchComponent implements OnInit {

@Output() searchOutput = new EventEmitter <CarFilter> ();

  searchOptions = {} as CarFilter;
  searchFields = ['maker' , 'model'];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.resetOptions()
  }
  //OPEN MODAL
  open(content) {
    this.modalService.open(content)
  }
  //SEARCH
  searchCars(){
    this.searchOutput.emit(this.searchOptions);
    this.resetOptions();
    this.modalService.dismissAll();
  }
  //RESET
  resetOptions(){
    for(let k in this.searchOptions) this.searchOptions[k]='';
  }

}
