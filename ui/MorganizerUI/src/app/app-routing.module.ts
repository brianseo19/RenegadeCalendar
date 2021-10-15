import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './core/home-screen/home-screen.component';
import { LandingComponent } from './core/landing/landing.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { ResetPasswordComponent } from './core/reset-password/reset-password.component';
import { AuthGuardService } from './services/auth-guard.service';

import {TaskViewComponent} from './core/home-screen/task-view/task-view.component'

const routes: Routes = [
  { path: 'landing', component: LandingComponent, pathMatch: 'full' },
  { path: '', component: LoginComponent, pathMatch: 'full' },

  {
    path: 'home',
    component: HomeScreenComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: '**', component: LoginComponent },
  { path: 'task', component: TaskViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
