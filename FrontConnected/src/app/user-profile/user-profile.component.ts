
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	isLoggedin = false;
	
	loggedinUser: string = '';

	greeting = {};

	constructor(private router: Router, private authenticationService: AuthenticationService) {}

	ngOnInit() {
		this.isLoggedin = this.authenticationService.isUserLoggedin();
		this.loggedinUser = this.authenticationService.getLoggedinUser();

		if(!this.isLoggedin) {
			this.router.navigateByUrl('/api/user/login');
		}
	}

}
