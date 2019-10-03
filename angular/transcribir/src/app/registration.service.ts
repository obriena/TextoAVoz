import { Injectable } from '@angular/core';
import { User } from "./models/user";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  registerUser(user: User): boolean {
    
    if (user.credentials.userId == 'aobrie01'){
      return false;
    }
    return true;
  }

  constructor() { }
}