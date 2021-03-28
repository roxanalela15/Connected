import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	SESSION_KEY = 'auth_user'

	email: String;
	password: String;

	constructor(private http: HttpClient) {}

	authenticate(email: String, password: String) {
		return this.http.get('http://localhost:8080/api/user/login', { 
			headers: { authorization: this.createBasicAuthToken(email, password) }}).pipe(map((res) => {
				this.email = email;
				this.password = password;				
				this.registerInSession(email, password);
		}));
	}

	createBasicAuthToken(email: String, password: String) {
		return 'Basic ' + window.btoa(email + ":" + password)
	}
	
	registerInSession(email, password) {
		sessionStorage.setItem(this.SESSION_KEY, email)
	}

	logout() {
		sessionStorage.removeItem(this.SESSION_KEY);
		this.email = null;
		this.password = null;
	}

	isUserLoggedin() {
		let user = sessionStorage.getItem(this.SESSION_KEY)
		if (user === null) return false
		return true
	}

	getLoggedinUser() {
		let user = sessionStorage.getItem(this.SESSION_KEY)
		if (user === null) return ''
		return user
	}
}