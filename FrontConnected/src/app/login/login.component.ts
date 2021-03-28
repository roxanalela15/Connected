
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	email: string = '';
	password : string = '';

	isLoggedin = false;

	error: string;

	constructor(private router: Router, private authenticationService: AuthenticationService) {}

	ngOnInit() {
		this.isLoggedin = this.authenticationService.isUserLoggedin();

		if(this.isLoggedin) {
			this.router.navigateByUrl('/api/home');
		}
	}

	login() {
		if(this.email !== '' && this.email !== null && this.password !== '' && this.password !== null) {
			this.authenticationService.authenticate(this.email, this.password).subscribe((result)=> {
				console.log(result);
				this.router.navigate(['/api/home']);
			}, () => {		  
				this.error = 'Error';
			});
		} else {
			this.error = 'Invalid Credentials';
		}
	}
}