import { Injectable } from '@angular/core';
import { Credentials } from "./models/credentials";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  validateUser(credentials: Credentials): boolean {
    console.log("Login Service: " + environment.name);
    let isValid: boolean;
    isValid = false;

    if (credentials.userId == 'aobrie01' && credentials.password == 'rh1ann0n'){
      isValid = true;
    } 
    return isValid;
  }

  constructor(private http: HttpClient) { }
}
