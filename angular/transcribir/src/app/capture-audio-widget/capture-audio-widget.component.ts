import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from '../models/user';
import { Credentials } from '../models/credentials';
import { UserDataStoreService } from '../user-data-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capture-audio-widget',
  templateUrl: './capture-audio-widget.component.html',
  styleUrls: ['./capture-audio-widget.component.css']
})

export class CaptureAudioWidgetComponent implements OnInit, AfterViewInit {

  fileUploadUrl: string;
  uploadForm: FormGroup;
  loggedInUser: User;

  constructor(private formBuilder: FormBuilder, 
              private httpClient: HttpClient, 
              private userDataStore: UserDataStoreService,
              private router: Router,) {
    this.fileUploadUrl = environment.fileUploadService;
  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      notas: '',
      upfile: ''
    });

    let userSubject = this.userDataStore.users;
    userSubject.subscribe((usersData: User[]) =>{
      if (usersData.length > 0){
        this.loggedInUser = usersData[0];
        console.log("File Upload Component user first name: " +  this.loggedInUser.firstName);
      }
    });
  }

  ngAfterViewInit() {
    if (!this.loggedInUser){
      this.router.navigate(['/login']);
    }
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.uploadForm.get('upfile').setValue(file);
  }

  onSubmit() {
    const formData = new FormData();
    if (this.loggedInUser) {
      let creds: Credentials = this.loggedInUser.credentials;    
      formData.append('userId', creds.userId);
    }
    
    formData.append('upfile', this.uploadForm.get('upfile').value);
    formData.append('notas', this.uploadForm.get('notas').value);

    this.httpClient.post<any>(this.fileUploadUrl, formData).subscribe(
      
      (res) => {
        console.log(res);
        if (res['status']){
          let trans: string = res['message'];
          let transJson = JSON.parse(trans);
          window.alert(transJson["results"][0]["alternatives"][0]["transcript"]);
        }
        
      },
      (err) => console.log(err)
    );

    /*
    results should look something like this:
    {
  "results": [
    {
      "final": true,
      "alternatives": [
        {
          "transcript": "y acabamos de conocer el premio de teatro del valle enclava en uno de los más importantes de la escena española nuestro compañero rubén nevado está siguiendo la gana nos vamos hasta el teatro real de madrid rubén buenas noches ",
          "confidence": 0.91
        }
      ]
    }
  ],
  "result_index": 0
}
    */
  }

}
