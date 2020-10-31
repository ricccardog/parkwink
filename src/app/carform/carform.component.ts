import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  closeResult = '';
    
  car = {} as Car;
  
  constructor(private modalService: NgbModal) { }
  
  ngOnInit(): void {
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'car-modal-title'})
    
  }
  
  addCar(): void {
    this.car.id = CARS.length +1;
    CARS.push(this.car);
    this.car = {} as Car; 
    this.modalService.dismissAll(); //chiude il modale
    this.close.emit(); //con emit si crea l'evento che poi viene usato per richiamare il metodo del parent
  }
  

}

