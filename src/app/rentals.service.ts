import { Injectable } from '@angular/core';
import { Rentals } from './rentals';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  constructor() { }

   /*  getRentals(text: string) : Observable<Rentals[]> {
      return of(RENTALS.filter(
        rentals => rentals.car.model.toLowerCase().includes(text)
        ||  rentals.car.maker.toLowerCase().includes(text)
        ||  rentals.user.name.toLowerCase().includes(text)
        ||  rentals.user.surname.toLowerCase().includes(text)))
   } */


  }
