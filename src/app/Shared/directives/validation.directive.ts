import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';


@Directive({
  selector: '[cksEmailvalidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: EmailvalidatorDirective,
      multi: true
    }
  ]
})
export class EmailvalidatorDirective implements Validator {

  validator: ValidatorFn;
  constructor() {
    this.validator = this.emailValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  emailValidator(): ValidatorFn {
    return (control: any) => {
      if (control.value != null && control.value !== '') {
        let isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(control.value);
        if (isValid) {
          return null;
        }
         else {
          return {
            emailvalidator: { valid: false }
          };
        }
      }
       else {
        return null;
      }
    };
  }
}

