import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-header-widget',
  templateUrl: './header-widget.component.html',
  styleUrls: ['./header-widget.component.css']
})
export class HeaderWidgetComponent implements OnInit {

  @Input('loggedInUser') loggedInUser: User;
  
  constructor() { }

  ngOnInit() {
  }

}
