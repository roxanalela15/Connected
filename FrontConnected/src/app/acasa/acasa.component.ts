import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';


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
      this.email = sessionStorage.getItem( 'email' );
      //localStorage.removeItem('receiverc');
      console.log("User logat = ",this.email);
      if ( this.email == null || this.email === '' ) {
          this.router.navigate( ['/'] );
      } else {
        //this.authService.getLoggedinUser();
        //this.authService.authenticate(this.email, this.password);
      }
      console.log("sunt aici inint");
  }
  
  onReceiverChange(event) {
    console.log("sunt aici receiver");
      this.receiver = event;
      console.log(event);
      console.log("this receiver change",this.receiver);
     
      sessionStorage.setItem('receiverc',this.receiver);
      console.log("receiveeeeer", this.receiver);
  }
  


  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    
    this.authService.logout();
		this.router.navigateByUrl('api/auth/signin');
     
  }

  openMessages() {
    this.router.navigate(['home']); 
  }
  openProfile() {
    this.router.navigate(['api/user-profile']); 
  }
  // openlogout() {
	// 	this.authService.logout();
	// 	this.router.navigateByUrl('api/auth/signin');
	// }
 

}
