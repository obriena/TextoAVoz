import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginWidgetComponent } from "./login-widget/login-widget.component";
import { RegistrationWidgetComponent } from "./registration-widget/registration-widget.component";
import { CaptureAudioWidgetComponent } from './capture-audio-widget/capture-audio-widget.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginWidgetComponent},
  { path: 'registration', component: RegistrationWidgetComponent},
  { path: 'captureaudio', component: CaptureAudioWidgetComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
