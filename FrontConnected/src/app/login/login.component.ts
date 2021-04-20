
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
//import { UtilizatorService } from '@app/services/utilizator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	email: string = '';
	password : string = '';

	isLoggedin = false;
	message: string;
	error: string;

	constructor(private router: Router, private authenticationService: AuthenticationService) {}

	ngOnInit() {
		this.isLoggedin = this.authenticationService.isUserLoggedin();

		if(this.isLoggedin) {
			this.router.navigateByUrl('/home');
		}
	}

	login() {
		if(this.email !== '' && this.email !== null && this.password !== '' && this.password !== null) {
			// this.authenticationService.authenticate(this.email, this.password).subscribe((result)=> {
			// 	console.log(result);
			// 	sessionStorage.setItem('user', this.email);
			// 	this.router.navigate(['/acasa']);
			// }, () => {		  
			// 	this.error = 'Error';
			// });
			this.authenticationService.authenticate(this.email, this.password)
        .subscribe(
            res => {
                sessionStorage.setItem('auth_user', this.email);
                this.router.navigate(['/home']);
            },
            error => {
                this.message = error._body;
            });
		} else {
			this.error = 'Invalid Credentials';
		}
	}
}