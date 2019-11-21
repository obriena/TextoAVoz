import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from "@angular/common/http";
import { UserDataStoreService } from '../user-data-store.service';
import { Media } from '../models/media';
import { RetrieveMediaService } from '../retrieve-media.service';
import { ServerMessage } from '../models/serverMessage';
import { MediaDataStoreService } from '../media-data-store.service';

@Component({
  selector: 'app-right-widget',
  templateUrl: './right-widget.component.html',
  styleUrls: ['./right-widget.component.css']
})
export class RightWidgetComponent implements OnInit {

  loggedInUser: User;
  mediaFiles: Media[] = [];
  message: string = "";

  constructor(private httpClient: HttpClient, 
              private userDataStore: UserDataStoreService,
              private retrieveMediaService: RetrieveMediaService,
              private mediaDataService: MediaDataStoreService) {

  }

  ngOnInit() {
    let userSubject = this.userDataStore.users;
    userSubject.subscribe((usersData: User[]) =>{
      if (usersData.length > 0){
        this.loggedInUser = usersData[0];
        console.log("Right Component user first name: " +  this.loggedInUser.firstName);

        this.retrieveMediaService.retrieveMediaForUser(this.loggedInUser.credentials.userId).subscribe((serverMessage: ServerMessage) => {
          if (serverMessage.status) {
            this.message = serverMessage.message;
            this.mediaFiles = serverMessage.payload;
          }
        });
      }
    });


    let mediaSubject = this.mediaDataService.mediaFiles;
    mediaSubject.subscribe((newFiles: Media[]) => {
      if (newFiles.length > 0) {
        let newMedia: Media = newFiles[newFiles.length - 1];
        this.mediaFiles.push(newMedia);
        this.message = "Retrieved " + this.mediaFiles.length + " items";
      }
    });


  }
    onSelect(media: Media): void {
      console.log("Setting Selected Media");
      this.mediaDataService.selectMediaFile(media); 
    }

}
