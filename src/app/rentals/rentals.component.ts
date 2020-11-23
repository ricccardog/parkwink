import { Component, OnInit } from '@angular/core';
import { RentalFilter } from '../rentalFilter';

import { Rental } from '../rentals';
import { RentalsService } from '../rentals.service'



@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})

export class RentalsComponent implements OnInit {

  rentals: Rental[] = [];

  constructor(private rentalsService: RentalsService) { }

  ngOnInit(): void {
   this.getRentals();
  }

  getRentals(): void {
  this.rentalsService
      .getRentals()
      .subscribe(rentals => { this.rentals = rentals})
  }
  //SEARCH
  searchRental(event: RentalFilter){
    this.rentalsService
        .searchRental(event)
        .subscribe(data => { this.rentals = data})
  //INSERIRE ALERT SE LA RICERCA VA A VUOTO
  }
}
