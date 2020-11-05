import { Customer } from './customers';
import { Car } from './cars';
import { Rentals } from './rentals';

export const RENTALS: Rentals[]= [
    {id: 1,
     car: {id: 9, name:"sla", model: "tesla" , creationDate: new Date (1982,3,2), price: 123} as Car,
     user: {id: 15, name:"ciro", surname:"esposito", email: "cirosposito@ciro.ciro", drivingLicense:3456, birthDate: new Date (1942, 3,4)} as Customer ,
     fromDate: new Date(2016, 5, 2),
     toDate: new Date(2018, 3, 2), price: 150},
    {id: 2,
     car: {id:27, name:"panino", model: "kebab" , creationDate: new Date (2057, 1,3), price: 765} as Car,
     user: {id: 28, name:"gennarino", surname:"esposito", email: "gennarinoesposito@espositomail.mail", drivingLicense: 5432, birthDate: new Date (1998, 3, 2)} as Customer,
     fromDate: new Date(2014, 2, 3),
     toDate: new Date(2019, 5, 6), price: 200},

];
