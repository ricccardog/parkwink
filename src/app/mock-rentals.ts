import { Customer } from './customers';
import { Car } from './cars';
import { Rentals } from './rentals';

export const RENTALS: Rentals[]= [
    {id: 1, car: {} as Car, user: {} as Customer , fromDate: new Date(2016, 5, 2), toDate: new Date(2018, 3, 2), price: 150},
    {id: 2, car: {} as Car, user: {} as Customer, fromDate: new Date(2014, 2, 3), toDate: new Date(2019, 5, 6), price: 200},

];
