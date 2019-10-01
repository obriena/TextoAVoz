import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from '../models/credentials';
import { User } from "../models/user";
import { RegistrationService } from "../registration.service";

@Component({
  selector: 'app-registration-widget',
  templateUrl: './registration-widget.component.html',
  styleUrls: ['./registration-widget.component.css']
})
export class RegistrationWidgetComponent implements OnInit {
/*
export class User {
    credentials: Credentials;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}
*/
  registrationForm: FormGroup;

  registrationSuccessful = true;

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private registrationService: RegistrationService) { 
    this.registrationForm = this.formBuilder.group({
      userId: new FormControl(''),
      password: new FormControl(''),
      altPassword: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('')
    });
}

  ngOnInit() {
  }

  registerUser() {
      if ( this.registrationForm.get('password').value !=
           this.registrationForm.get('altPassword').value ) {
            window.alert("Passwords do not match");
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

        this.registrationSuccessful = this.registrationService.registerUser(user);
        if (this.registrationSuccessful) {
          this.router.navigate(['/login']);
        }
      }
  }
}
