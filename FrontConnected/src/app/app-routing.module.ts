import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'api/user/register',component:RegisterComponent},
  {path:'api/user/login',component:LoginComponent},
  {path:'api/home',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
