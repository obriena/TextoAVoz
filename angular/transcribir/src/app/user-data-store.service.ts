import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})

/*
 * https://coryrylan.com/blog/angular-observable-data-services
 */
export class UserDataStoreService {

  private _users = new BehaviorSubject<User[]>([]);
  private dataStore: { users: User[] } = {users: [] };

  //readonly users = this._users.asObservable();

  constructor() { }

  get users () {
    return this._users.asObservable();
  }

  addUser(aUser: User) {
    console.log("publishing user")
    this.dataStore.users.push( aUser );
    this._users.next(Object.assign({}, this.dataStore).users);
  }

}
