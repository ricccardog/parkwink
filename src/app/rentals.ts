import { Car } from './cars';
import { Customer } from './customers';

export interface Rental {
    _id: string;
    car: Car;
    customer: Customer;
    startDate: Date;
    endDate: Date;
    price: number;
}

