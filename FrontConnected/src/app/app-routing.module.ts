import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UrlPermission } from './services/permission';

const routes: Routes = [
  {path:'api/user/register',component:RegisterComponent},
  {path:'api/user/login',component:LoginComponent},
  {path:'api/home',component:HomeComponent, canActivate: [UrlPermission]},
  {path:'api/user/logout',redirectTo:'api/user/login'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
