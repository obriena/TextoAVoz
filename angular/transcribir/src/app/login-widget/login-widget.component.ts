import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from "../login.service";
import { Credentials } from '../models/credentials';
import { ServerMessage } from "../models/serverMessage";
import { User } from '../models/user';
import { UserDataStoreService } from "../user-data-store.service";

@Component({
  selector: 'app-login-widget',
  templateUrl: './login-widget.component.html',
  styleUrls: ['./login-widget.component.css']
})


export class LoginWidgetComponent implements OnInit {
  userForm: FormGroup; 

  loggedInUser: User;

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private loginService: LoginService,
              private userDataStore: UserDataStoreService) { 

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
        console.log("Server Response: " + serverMessage.message);
        let resp = JSON.parse(serverMessage.message);
        console.log(resp);
        console.log(resp['email']);
        this.loggedInUser = new User();
        this.loggedInUser.email = resp['email'];
        this.loggedInUser.firstName = resp['firstName'];
        this.loggedInUser.lastName = resp['lastName'];
        this.loggedInUser.role = resp['role'];
        
        let creds: Credentials = new Credentials();
        creds.userId = resp['credentials']['userId'];
        this.loggedInUser.credentials = creds;

        console.log("Sending user: " + this.loggedInUser.firstName + " to the observable");
        this.userDataStore.addUser(this.loggedInUser);

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
