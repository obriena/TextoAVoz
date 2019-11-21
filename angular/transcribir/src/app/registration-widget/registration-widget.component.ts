import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from '../models/credentials';
import { User } from "../models/user";
import { ServerMessage } from "../models/serverMessage";
import { RegistrationService } from "../registration.service";
import { passwordValidator } from '../password-validator.directive';

@Component({
  selector: 'app-registration-widget',
  templateUrl: './registration-widget.component.html',
  styleUrls: ['./registration-widget.component.css']
})
export class RegistrationWidgetComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private registrationService: RegistrationService) { 

  }

  ngOnInit() {
      this.registrationForm = this.formBuilder.group({
        userId: new FormControl('', [Validators.required, Validators.minLength(6)]),
        password: new FormControl('', Validators.required),
        altPassword: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email])
      }, {validators: passwordValidator});
    }

  registerUser() {
       if ( this.registrationForm.get('userId').errors != null || 
           this.registrationForm.get('password').errors != null ||
           this.registrationForm.get('altPassword').errors != null ||
           this.registrationForm.get('firstName').errors != null ||
           this.registrationForm.get('lastName').errors != null ||
          this.registrationForm.get('email').errors != null  || 
           this.registrationForm.errors!=null ){
        console.log('Registration has errors');
      } else {
      
        let credentials: Credentials;
        credentials = new Credentials();
        credentials.userId = this.registrationForm.get('userId').value;
        credentials.password = this.registrationForm.get('password').value;

        let user: User;
        user = new User();
        user.credentials = credentials;
        user.firstName = this.registrationForm.get('firstName').value;
        user.lastName = this.registrationForm.get('lastName').value;
        user.email = this.registrationForm.get('email').value;

        this.registrationService.registerUser(user).subscribe((serverMessage: ServerMessage) => {
          if (serverMessage.status) {
            this.router.navigate(['/registrationcomplete']);
          }
        });
      
 
      }
  }

  get userId() { 
    return this.registrationForm.get('userId'); 
  }
  get password() { 
    return this.registrationForm.get('password'); 
  }
  get altPassword() { 
    return this.registrationForm.get('altPassword'); 
  }
  get email() { 
    return this.registrationForm.get('email'); 
  }
  get firstName() { 
    return this.registrationForm.get('firstName'); 
  }
  get lastName() { 
    return this.registrationForm.get('lastName'); 
  }

}
