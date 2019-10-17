import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';
import { LoginWidgetComponent } from './login-widget/login-widget.component';
import { HeaderWidgetComponent } from './header-widget/header-widget.component';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements AfterViewInit{
  title = 'transcribir';
  cols: {[key: string]: string} = {
    firstCol: 'row',
    firstColXs: 'column',
    firstColMd: 'column',
    firstColLg: 'invalid',
    firstColGtLg: 'column',
    secondCol: 'column'
  };
  isVisible = true;

  private activeMQC: MediaChange[];
  private subscription: Subscription;

  @ViewChild(LoginWidgetComponent) loginWidgetReference: LoginWidgetComponent;
  @ViewChild(HeaderWidgetComponent) headerWidgetReference: HeaderWidgetComponent;
  
  loggedInUser: User;

  constructor(mediaService: MediaObserver) {
    
    this.loggedInUser = new User();
    this.subscription = mediaService.asObservable()
      .subscribe((events: MediaChange[]) => {
        this.activeMQC = events;
      });
  }

  ngAfterViewInit() {      
    console.log("AppComp ngAfterViewInt");

      // this.loggedInUser = this.loginWidgetReference.loggedInUser;
      //console.log(this.loggedInUser.credentials.userId);
      this.headerWidgetReference.loggedInUser = this.loggedInUser;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleLayoutFor(col: number) {
    this.activeMQC.forEach((change: MediaChange) => {
      switch (col) {
        case 1:
            const set1 = `firstCol${change ? change.suffix : ''}`;
            this.cols[set1] = (this.cols[set1] === 'column') ? 'row' : 'column';
          break;

        case 2:
          const set2 = 'secondCol';
          this.cols[set2] = (this.cols[set2] === 'row') ? 'column' : 'row';
          break;
      }
    });
  }

}
