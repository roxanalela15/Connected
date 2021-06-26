import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientService } from './services/client-service';
import { AuthenticationService } from './services/authentication.service';
import { SidebarOneComponent } from './sidebar-one/sidebar-one.component';
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
import { PickerModule, SearchComponent } from '@ctrl/ngx-emoji-mart';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './services/auth-guard.service';
import { HomePageService } from './services/home-page.service';
import { SearchService } from './services/search.service';
import { HeaderComponent } from './header/header.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { VideoCallService } from './services/video-call.service';
import { RemoteComponent } from './remote/remote.component';
import { FlexLayoutModule } from "@angular/flex-layout";
// import * as $ from 'jquery';
// import { ElectronService } from 'ngx-electron';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    HomeComponent,
    SidebarOneComponent,
    AcasaComponent,
    UtilizatoriComponent,
    MesajeComponent,
    HeaderComponent,
    VideoCallComponent,
    RemoteComponent,
    

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
    FlexLayoutModule,
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
    NgbModule,
  ],

  providers: [AuthGuard,AuthenticationService, ClientService, ConversationService, ChatService,HomePageService,SearchService,VideoCallService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
