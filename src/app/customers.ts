import { EmailValidator } from '@angular/forms';

export interface Customer {
    id: number;
    name: string;
    surname: string;
    email: string;
    drivingLicense: number;
    birthDate: Date
}