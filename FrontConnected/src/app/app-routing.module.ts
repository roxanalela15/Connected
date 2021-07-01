import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AcasaComponent } from './acasa/acasa.component';
import { UtilizatoriComponent } from './utilizatori/utilizatori.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { RemoteComponent } from './remote/remote.component';
//import { SigninComponent } from './signin/signin.component';
const routes: Routes = [
  {path:'api/auth/signup',component:RegisterComponent},
  {path:'',component:LoginComponent},
  {path:'api/user-profile',component:UserProfileComponent},
  {path: 'api/auth/signin', component: LoginComponent },
  {path: 'home',component:AcasaComponent},
  {path: 'video-call/:id', component: VideoCallComponent},
  {path: 'view', component: RemoteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
