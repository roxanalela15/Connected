import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-sidebar-one',
  templateUrl: './sidebar-one.component.html',
  styleUrls: ['./sidebar-one.component.css']
})
export class SidebarOneComponent implements OnInit {

  constructor(private router: Router,private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }
  openMessages() {
    this.router.navigate(['home']); 
  }
  openProfile() {
    this.router.navigate(['api/user-profile']); 
  }
  logout() {
		this.authenticationService.logout();
		this.router.navigateByUrl('api/auth/signin');
	}

}
