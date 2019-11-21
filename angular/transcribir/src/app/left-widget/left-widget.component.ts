import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserDataStoreService } from '../user-data-store.service';

@Component({
  selector: 'app-left-widget',
  templateUrl: './left-widget.component.html',
  styleUrls: ['./left-widget.component.css']
})
export class LeftWidgetComponent implements OnInit {

  loggedInUser: User;
  constructor(private userDataStore: UserDataStoreService) { }

  ngOnInit() {
    let userSubject = this.userDataStore.users;
    userSubject.subscribe((usersData: User[]) =>{
      if (usersData.length > 0){
        this.loggedInUser = usersData[0];
        console.log("Left Component user first name: " +  this.loggedInUser.firstName);
      }
    });
  }

}
