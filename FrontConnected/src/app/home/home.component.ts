import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/models/user';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  action: string; 
  currentUser: User;
  constructor(
    private router: Router,private activedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
) {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

  ngOnInit(): void {
    console.log('currentUser', this.currentUser);
    this.activedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
      }
    ); 
  }

  openMessages() {
    this.router.navigate(['api/home'], { queryParams: { action: 'messages' } }); 
  }
  openProfile() {
    this.router.navigate(['api/home'], { queryParams: { action: 'user-profile' } }); 
  }
  openPeople() {
    this.router.navigate(['api/home'], { queryParams: { action: 'people' } }); 
  }

  openCalendar() {
    this.router.navigate(['api/home'], { queryParams: { action: 'calendar' } }); 
  }
  openNotes() {
    this.router.navigate(['api/home'], { queryParams: { action: 'notes' } }); 
  }
  openSettings() {
    this.router.navigate(['api/home'], { queryParams: { action: 'settings' } }); 
  }
  signOut(){
    this.authenticationService.logout();
  }
}
