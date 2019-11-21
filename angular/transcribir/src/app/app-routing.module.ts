import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginWidgetComponent } from "./login-widget/login-widget.component";
import { RegistrationWidgetComponent } from "./registration-widget/registration-widget.component";
import { RegistrationConfirmationWidgetComponent } from "./registration-confirmation-widget/registration-confirmation-widget.component";
import { CaptureAudioWidgetComponent } from './capture-audio-widget/capture-audio-widget.component';
import { ViewMediaWidgetComponent } from './view-media-widget/view-media-widget.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginWidgetComponent},
  { path: 'registration', component: RegistrationWidgetComponent},
  { path: 'registrationcomplete', component: RegistrationConfirmationWidgetComponent},
  { path: 'captureaudio', component: CaptureAudioWidgetComponent},
  { path: 'viewMedia', component: ViewMediaWidgetComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
