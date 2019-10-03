import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from "../login.service";
import { Credentials } from '../models/credentials';

@Component({
  selector: 'app-login-widget',
  templateUrl: './login-widget.component.html',
  styleUrls: ['./login-widget.component.css']
})
export class LoginWidgetComponent implements OnInit {
  userForm: FormGroup; 

  userLoggedIn = false;

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private loginService: LoginService) { 

    this.userForm = this.formBuilder.group({
      userId: new FormControl(''),
      password: new FormControl(''),
    });

  }

  ngOnInit() {
  }

  login() {
    let credentials: Credentials;
    credentials = new Credentials();
    credentials.userId = this.userForm.get('userId').value;
    credentials.password = this.userForm.get('password').value;
    this.userLoggedIn = this.loginService.validateUser(credentials);
    if (this.userLoggedIn) {
      this.router.navigate(['/captureaudio']);
    } else {
      window.alert("Invalid Credential");
    }
    
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }
}