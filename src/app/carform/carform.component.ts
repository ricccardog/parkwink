import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Car } from '../cars';
import { CARS } from '../mock-cars';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carform',
  templateUrl: './carform.component.html',
  styleUrls: ['./carform.component.css']
})
export class CarformComponent implements OnInit {

  @Output() close = new EventEmitter<void>(); //permette al child di richiamare un metodo del parent

  newCar = {} as Car;
  carForm : FormGroup;
  
  constructor(private modalService: NgbModal) { }
  
  ngOnInit(): void {
  }
  
  addCar(): void {
    this.newCar.id = CARS.length +1;
    CARS.push(this.newCar);
    this.newCar = {} as Car; 
    this.close.emit(); //con emit si crea l'evento che poi viene usato per richiamare il metodo del parent
    this.modalService.dismissAll(); //chiude il modale
  }
  

}

