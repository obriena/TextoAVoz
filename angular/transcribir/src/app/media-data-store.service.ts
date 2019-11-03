import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Media } from './models/media';

@Injectable({
  providedIn: 'root'
})
export class MediaDataStoreService {

  private _mediaFiles = new BehaviorSubject<Media[]>([]);
  private dataStore : { mediaFiles: Media[] } = {mediaFiles: []};

  private _selectedMediaFiles = new BehaviorSubject<Media[]>([]);
  private selectedDataStore : { mediaFiles: Media[] } = {mediaFiles: []};

  constructor() { }

  get mediaFiles () {
    return this._mediaFiles.asObservable();
  }

  get selectedMediaFiles() {
    return this._selectedMediaFiles.asObservable();
  }

  addMediaFile(aMediaFile: Media) {
    console.log("publishing media file");
    this.dataStore.mediaFiles.push(aMediaFile);
    this._mediaFiles.next(Object.assign({}, this.dataStore).mediaFiles);
  }

  selectMediaFile(selectedMediaFile: Media){
    console.log("media file selected: "+ selectedMediaFile.fileName);
    this.selectedDataStore.mediaFiles.push(selectedMediaFile);
    this._selectedMediaFiles.next(Object.assign({}, this.selectedDataStore).mediaFiles);
  }
}
