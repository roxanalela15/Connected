import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-sidebar-two',
  templateUrl: './sidebar-two.component.html',
  styleUrls: ['./sidebar-two.component.css']
})
export class SidebarTwoComponent implements OnInit {

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }
  openCalendar() {
    this.router.navigate(['api/calendar']); 
  }
  openSettings() {
    this.router.navigate(['api/settings']); 
  }
  logout() {
		this.authenticationService.logout();
		this.router.navigateByUrl('');
	}
}
