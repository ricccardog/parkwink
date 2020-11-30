import { Component, OnInit } from '@angular/core';
import { Car } from '../cars';
import { CarService } from '../car.service';

@Component({
  selector: 'app-carslist',
  templateUrl: './carslist.component.html',
  styleUrls: ['./carslist.component.css']
})
export class CarslistComponent implements OnInit {

  cars: Car[] = []; 
  sortOrder = '';
  stringSortTracker = 0;
  numSortTracker = 0;

  constructor(private carService : CarService) {
    
  }

  ngOnInit() : void {
    this.getCars();
  }
  
  //GET
  getCars(): void {
    this.carService
      .getCars()
      .subscribe(data => { this.cars = data })
  }
  //SEARCH
  searchCar(event): void {
    this.carService
        .searchCar(event)
        .subscribe(data => {this.cars = data});
  }
  //SORT LIST
  sortByString() {
    this.stringSortTracker++;
    if (this.stringSortTracker % 2 == 0) {
      this.carService
        .getCars()
        .subscribe(data => {
          this.cars = data.sort((a, b) => a[this.sortOrder].localeCompare(b[this.sortOrder]))
        })
    } else {
      this.carService
        .getCars()
        .subscribe(data => {
          this.cars = data.sort((a, b) => b[this.sortOrder].localeCompare(a[this.sortOrder]))
        })
    }
  }
  sortByNumber() {
    this.numSortTracker++;
    if (this.numSortTracker % 2 == 0) {
      this.carService
        .getCars()
        .subscribe(data => {
          this.cars = data.sort((a, b) => { return a.price - b.price })
        })
    } else {
      this.carService
        .getCars()
        .subscribe(data => {
          this.cars = data.sort((a, b) => { return b.price - a.price })
        })
    }
  }

}

