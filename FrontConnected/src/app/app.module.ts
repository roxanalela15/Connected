import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
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
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsModule } from './icons/icons.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ConversationService } from './services/conversation.service';
import { AcasaComponent } from './acasa/acasa.component';
import { UtilizatoriComponent } from './utilizatori/utilizatori.component';
import { MesajeComponent } from './mesaje/mesaje.component';
import { ChatService } from './services/chat.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    PeopleComponent,
    HomeComponent,
    SettingsComponent,
    CalendarComponent,
    SidebarOneComponent,
    SidebarTwoComponent,
    AcasaComponent,
    UtilizatoriComponent,
    MesajeComponent,
    

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IconsModule,
    PickerModule,
    /** Material Modules */
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatTooltipModule,
    //MatRippleModule,
     //MatRadioModule,
     //MatGridListModule,
     //MatDatepickerModule,
     //MatNativeDateModule,
     //MatSliderModule
     //SocialLoginModule
  ],

  providers: [AuthenticationService, ClientService, ConversationService, ChatService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
