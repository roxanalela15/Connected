import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
//import { UtilizatorService } from '@app/services/utilizator.service';
import { AuthService } from 'angular4-social-login';
import { StompService } from 'ng2-stomp-service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-acasa',
  templateUrl: './acasa.component.html',
  styleUrls: ['./acasa.component.css']
})
export class AcasaComponent implements OnInit {

  

  @Input()
  email: string;
  password: string;


  receiver: string;



  constructor( private router: Router,
           private authService: AuthenticationService) {
      
  }

  ngOnInit() {
      this.email = sessionStorage.getItem( 'auth_user' );
      console.log("User logat = ",this.email);
      if ( this.email == null || this.email === '' ) {
          this.router.navigate( ['/'] );
      } else {
        //this.authService.getLoggedinUser();
        this.authService.authenticate(this.email, this.password);
      }
      console.log("sunt aici inint");
      //this.onReceiverChange(event);
  }
  
  // @HostListener('window:unload', ['$event'])
  // onUnload() {
  //     this.logout();
  // }

  onReceiverChange(event) {
    console.log("sunt aici receiver");
      this.receiver = event;
      console.log("receiveeeeer", this.receiver);
  }
  


  logout() {
    this.authService.logout();
		this.router.navigateByUrl('');
      //this.userService.logout({'id': null, 'email': this.email});
      // .subscribe(
      //     res => {
      //         this.logoutSocial();
      //     },
      //     error => {
      //         console.log(error._body);
      //     });
  }

  // logoutSocial() {
  //     this.authService.logout();
  // }

  /*clearSession() {
      sessionStorage.removeItem( 'auth_user' );
      this.stompService.disconnect();
      this.email = null;
      this.router.navigate( ['/'] );
  }*/

}
