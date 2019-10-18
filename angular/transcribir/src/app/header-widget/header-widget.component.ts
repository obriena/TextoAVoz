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

  loggedInUser: User;
  

  
  constructor(private userDataStore: UserDataStoreService) {
    let userSubject = userDataStore.users;
   }

  ngOnInit() {
  }

}
