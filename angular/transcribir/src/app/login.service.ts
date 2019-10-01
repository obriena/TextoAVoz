import { Injectable } from '@angular/core';
import { Credentials } from "./models/credentials";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  validateUser(credentials: Credentials): boolean {
    let isValid: boolean;
    isValid = false;

    if (credentials.userId == 'aobrie01' && credentials.password == 'rh1ann0n'){
      isValid = true;
    } 
    return isValid;
  }

  constructor() { }
}
