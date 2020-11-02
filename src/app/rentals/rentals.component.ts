import { Component, OnInit } from '@angular/core';

import { Rentals } from '../rentals';
import { RentalsService } from '../rentals.service'

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {

  rentals: Rentals[];

  constructor(private rentalsService: RentalsService) { }

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals(): void{
    this.rentalsService.getRentals()
        .subscribe(rentals => this.rentals = rentals);
  }

}
