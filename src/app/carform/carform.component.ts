import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Car } from '../cars';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from '../car.service';
import { CarslistComponent } from '../carslist/carslist.component';
import { DomElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-carform',
  templateUrl: './carform.component.html',
  styleUrls: ['./carform.component.css']
})
export class CarformComponent implements OnInit {

  @Output() close = new EventEmitter<void>(); //permette al child di richiamare un metodo del parent

  newCar = {} as Car;
  carForm : FormGroup;
  selectCar: Car;
  
  constructor(private modalService: NgbModal, private carService: CarService) { }
  
  ngOnInit(): void {
  }
  
  addCar(): void {
    this.carService.addCar(this.newCar)
        .subscribe(data => {
          this.close.emit(); //segnala al parent chiusura per fare nuovo get cars
          this.modalService.dismissAll(); //chiude il modale 
        })
  }
  
  
  

}

