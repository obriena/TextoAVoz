import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MediaDataStoreService } from '../media-data-store.service';
import { Media } from '../models/media';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-media-widget',
  templateUrl: './view-media-widget.component.html',
  styleUrls: ['./view-media-widget.component.css']
})
export class ViewMediaWidgetComponent implements OnInit, AfterViewInit{
  selectedMedia: Media;
  formattedTranscript: [] = [];

  constructor(private httpClient: HttpClient,
              private mediaDataService: MediaDataStoreService,
              private router: Router) {

              }

  ngOnInit() {
    let selectedMediaSubject = this.mediaDataService.selectedMediaFiles;
    selectedMediaSubject.subscribe((files: Media[])=>{

      if (files.length > 0) {
        this.formattedTranscript = [];
        this.selectedMedia = files[files.length -1];
        
        let transcription = JSON.parse(this.selectedMedia.transcription);
        let results:[] = transcription['results'];

        for (let index = 0; index < results.length; index++) {
          let alts:[] = results[index]['alternatives'];
          for (let a = 0; a <alts.length; a++ ){
            console.log(alts[a]['confidence'] + ": " + alts[a]['transcript']);
            this.formattedTranscript.push(alts[a]);
          }
        }

      }
    });
  }

  ngAfterViewInit() {
    if (!this.selectedMedia){
      this.router.navigate(['/login']);
    }
  }
}
