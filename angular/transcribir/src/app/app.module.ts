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
import { MatSelectModule } from "@angular/material/select";
import { MatGridListModule } from "@angular/material/grid-list";
import { ReactiveFormsModule } from "@angular/forms";

import { LoginWidgetComponent } from './login-widget/login-widget.component';
import { HeaderWidgetComponent } from './header-widget/header-widget.component';
import { LeftWidgetComponent } from './left-widget/left-widget.component';
import { RightWidgetComponent } from './right-widget/right-widget.component';
import { FooterWidgetComponent } from './footer-widget/footer-widget.component';
import { RegistrationWidgetComponent } from './registration-widget/registration-widget.component';
import { CaptureAudioWidgetComponent } from './capture-audio-widget/capture-audio-widget.component';
import { RegistrationConfirmationWidgetComponent } from './registration-confirmation-widget/registration-confirmation-widget.component';
import { ViewMediaWidgetComponent } from './view-media-widget/view-media-widget.component';

import { VgCoreModule } from "videogular2/compiled/core";
import { VgControlsModule } from "videogular2/compiled/controls";

@NgModule({
  declarations: [
    AppComponent,
    LoginWidgetComponent,
    HeaderWidgetComponent,
    LeftWidgetComponent,
    RightWidgetComponent,
    FooterWidgetComponent,
    RegistrationWidgetComponent,
    CaptureAudioWidgetComponent,
    RegistrationConfirmationWidgetComponent,
    ViewMediaWidgetComponent
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
    MatSelectModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    VgCoreModule,
    VgControlsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
