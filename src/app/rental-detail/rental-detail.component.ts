import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ResolverService } from '../resolver.service';

import { Rental } from '../rentals';
import { RentalsService } from '../rentals.service';


@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {

  rental: Rental;
  
  constructor(
    private rentalService: RentalsService,
    private route : ActivatedRoute,
    private location : Location) { }

  ngOnInit(): void {
    this.rental = this.route.snapshot.data.rentalResolve as Rental;
  }

  //DELETE
  deleteRental(): void {
    if(confirm("Are you sure you want to delete this rental?")){
      this.rentalService
          .deleteRental(this.rental._id)
          .subscribe(data => {alert("Rental successfully deleted!")})
    }
  }
  
  //NAVIGATE BACK
  goBack(): void {
    this.location.back();
  }

}
