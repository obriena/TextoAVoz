import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginWidgetComponent } from "./login-widget/login-widget.component";

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginWidgetComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
