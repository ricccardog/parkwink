import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Car } from '../cars';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: Car;
  fields = ['model', 'maker'
]
  constructor(
    private carService : CarService,
    private route : ActivatedRoute,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.getCar();
  }
  //GET
  getCar(): void {
    const id : string = this.route.snapshot.paramMap.get('_id');
    this.carService.readCar(id)
        .subscribe( data => this.car = data)
  }
  //DELETE
  deleteCar(): void {
    if(confirm(`Are you sure you want to delete car ${this.car.model} ${this.car.maker} ?`)){
      this.carService
          .deleteCar(this.car._id)
          .subscribe(data => { alert('Car successfully deleted')})
    }
  }
  //NAVIGATE BACK
  goBack(): void{
    this.location.back();
  }
}
