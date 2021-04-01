import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MessagesComponent } from './messages/messages.component';
import { PeopleComponent } from './people/people.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { CalendarComponent } from './calendar/calendar.component';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientService } from './services/client-service';
import { AuthenticationService } from './services/authentication.service';
import { AuthInterceptorService } from './services/authinterceptor';
import { SidebarOneComponent } from './sidebar-one/sidebar-one.component';
import { SidebarTwoComponent } from './sidebar-two/sidebar-two.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    MessagesComponent,
    PeopleComponent,
    HomeComponent,
    SettingsComponent,
    CalendarComponent,
    SidebarOneComponent,
    SidebarTwoComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
