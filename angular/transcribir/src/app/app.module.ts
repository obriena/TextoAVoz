import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input"
import { MatGridListModule } from "@angular/material/grid-list";
import { ReactiveFormsModule } from "@angular/forms";

import { LoginWidgetComponent } from './login-widget/login-widget.component';
import { HeaderWidgetComponent } from './header-widget/header-widget.component';
import { LeftWidgetComponent } from './left-widget/left-widget.component';
import { RightWidgetComponent } from './right-widget/right-widget.component';
import { FooterWidgetComponent } from './footer-widget/footer-widget.component';
import { RegistrationWidgetComponent } from './registration-widget/registration-widget.component';
import { CaptureAudioWidgetComponent } from './capture-audio-widget/capture-audio-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginWidgetComponent,
    HeaderWidgetComponent,
    LeftWidgetComponent,
    RightWidgetComponent,
    FooterWidgetComponent,
    RegistrationWidgetComponent,
    CaptureAudioWidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
