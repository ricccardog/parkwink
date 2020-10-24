import { Component } from '@angular/core';
import { Car } from '../cars';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css'],
  exportAs: 'carForm'

})
export class CarFormComponent {

  model= new Car(12, 'blah', 'asdsa', new Date(1987,2,3),345);

  submitted= false;

  onSubmit() {this.submitted= true; }

  newCar() {
    this.model = new Car(15, 'bldssdah', 'asdsvcsda', new Date(1987,2,3),345)
  }

}