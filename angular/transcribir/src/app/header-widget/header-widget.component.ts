import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { UserDataStoreService} from '../user-data-store.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header-widget',
  templateUrl: './header-widget.component.html',
  styleUrls: ['./header-widget.component.css']
})
export class HeaderWidgetComponent implements OnInit {

  loggedInUsers: User[] = [];
  
  loggedInUser: User;

  
  constructor(private userDataStore: UserDataStoreService) {
    
   }

  ngOnInit() {
    let userSubject = this.userDataStore.users;
    userSubject.subscribe((usersData: User[]) =>{
      console.log("recieved some data size of data: " + usersData.length);
      if (usersData.length > 0){
        this.loggedInUsers = usersData;
        this.loggedInUser = this.loggedInUsers[0];
        console.log("Head Component user first name: " +  this.loggedInUser.firstName);
      }
    });
  }

}
