import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from "../login.service";
import { Credentials } from '../models/credentials';
import { ServerMessage } from "../models/serverMessage";

@Component({
  selector: 'app-login-widget',
  templateUrl: './login-widget.component.html',
  styleUrls: ['./login-widget.component.css']
})
export class LoginWidgetComponent implements OnInit {
  userForm: FormGroup; 

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
    
    this.loginService.validateUser(credentials).subscribe((serverMessage: ServerMessage) => {
      if (serverMessage.status) {
        this.router.navigate(['/captureaudio']);
      } else {
        window.alert(serverMessage.message);
      }
    });
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }
}
