import { Injectable } from '@angular/core';
import { Credentials } from "./models/credentials";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { ServerMessage } from "./models/serverMessage";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  loginServiceUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient) {
    this.loginServiceUrl = environment.loginService;
   }  

  validateUser(credentials: Credentials): Observable<ServerMessage>  {
    console.log("Login Service: " + environment.name);

      return this.http.post<ServerMessage>(this.loginServiceUrl, credentials, this.httpOptions).pipe(
        retry(3),
        catchError(this.handleError)
      );

  }

  private handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
