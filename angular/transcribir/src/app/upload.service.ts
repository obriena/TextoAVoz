import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';

import { environment } from "../environments/environment";
import { ServerMessage } from './models/serverMessage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  fileUploadUrl: string;

  constructor(private httpClient: HttpClient) {
    this.fileUploadUrl = environment.fileUploadService;
  }


}
