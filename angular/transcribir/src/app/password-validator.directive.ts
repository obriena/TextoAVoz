//import { Directive } from '@angular/core';
import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

// @Directive({
//   selector: '[appPasswordValidator]'
// })

export const passwordValidator: ValidatorFn = (control:FormGroup):
  ValidationErrors | null => {
    const password1 = control.get('password').value;
    const password2 = control.get('altPassword').value;
    console.log("Pasword validation started");
    console.log(control)
    console.log(password1);
    console.log(password2);
    let errors: ValidationErrors;

    if (password1 != null && password2 != null) {
      if (password1 != password2) {
        console.log("Passwords do not match");
        errors = { 'passwordMismatch': true };
      } else {
        console.log("Passwords do match");
      }
    }
    console.log(errors);
    return errors;
    //return password1.value == password2.value ? { 'passwordMismatch': true } : { 'passwordMismatch': false };
  }; 
