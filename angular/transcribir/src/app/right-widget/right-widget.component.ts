import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from "@angular/common/http";
import { UserDataStoreService } from '../user-data-store.service';

@Component({
  selector: 'app-right-widget',
  templateUrl: './right-widget.component.html',
  styleUrls: ['./right-widget.component.css']
})
export class RightWidgetComponent implements OnInit {

  loggedInUser: User;

  constructor(private httpClient: HttpClient, private userDataStore: UserDataStoreService) { }

  ngOnInit() {
    let userSubject = this.userDataStore.users;
    userSubject.subscribe((usersData: User[]) =>{
      if (usersData.length > 0){
        this.loggedInUser = usersData[0];
        console.log("Right Component user first name: " +  this.loggedInUser.firstName);
      }
    });
  }

}
