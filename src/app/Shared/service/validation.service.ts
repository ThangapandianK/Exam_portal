import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  mobilePattern: string = "^((\\+91-?)|0)?[0-9]{10}$"
  constructor() { }

  
  
}
