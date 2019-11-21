import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-footer-widget',
  templateUrl: './footer-widget.component.html',
  styleUrls: ['./footer-widget.component.css']
})
export class FooterWidgetComponent implements OnInit {

  env = environment;

  constructor() { }

  ngOnInit() {
  }

}
