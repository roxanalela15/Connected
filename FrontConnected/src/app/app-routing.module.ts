import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PeopleComponent } from './people/people.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MessagesComponent } from './messages/messages.component';
import { SettingsComponent } from './settings/settings.component';
import { CalendarComponent } from './calendar/calendar.component';
const routes: Routes = [
  {path:'api/user/register',component:RegisterComponent},
  {path:'api/user/login',component:LoginComponent},
  {path:'api/home',component:HomeComponent},
  {path:'api/people',component:PeopleComponent},
  {path:'api/user-profile',component:UserProfileComponent},
  {path:'api/messages',component:MessagesComponent},
  {path:'api/settings',component:SettingsComponent},
  {path:'api/calendar',component:CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
