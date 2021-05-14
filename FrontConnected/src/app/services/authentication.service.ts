import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	// SESSION_KEY = 'auth_user'

	// email: String;
	// password: String;

	// constructor(private http: HttpClient) {}

	// authenticate(email: String, password: String) {
	// 	return this.http.post('http://localhost:8080/login', { 
	// 		headers: { authorization: this.createBasicAuthToken(email, password) }}).pipe(map((res) => {
	// 			this.email = email;
	// 			this.password = password;				
	// 			this.registerInSession(email, password);
	// 	}));
	// }

	// createBasicAuthToken(email: String, password: String) {
	// 	return 'Basic ' + window.btoa(email + ":" + password)
	// }
	
	// registerInSession(email, password) {
	// 	sessionStorage.setItem(this.SESSION_KEY, email)
	// }

	// logout() {
	// 	sessionStorage.removeItem(this.SESSION_KEY);
	// 	this.email = null;
	// 	this.password = null;
	// }

	// isUserLoggedin() {
	// 	let user = sessionStorage.getItem(this.SESSION_KEY)
		
	// 	if (user === null) return false
	// 	return true
	// }

	// getLoggedinUser() {
	// 	let user = sessionStorage.getItem(this.SESSION_KEY)
	// 	console.log("currentuser from service ",user);
	// 	if (user === null) return ''
	// 	return user
	// }

	// findUsers() {
    //     return this.http.get('http://localhost:8080/listUsers');
    // }
	userData;
  userUrl: string;
  todoUrl: string;
  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080';
    this.todoUrl = 'http://localhost:8080/todo';
  }
  private token: string = sessionStorage.getItem('token');
  error :string = 'false';
  isAuthenticated(){
    return sessionStorage.getItem('token') === 'loggedin';
  }

  logout(){
    this.toggleToken();
    sessionStorage.clear();
    sessionStorage.setItem('token', this.getToken());
  }

  login(form): Observable<User>{
    return this.http.post<User>(this.userUrl + '/login', form).pipe(
      catchError(this.handleLoginError)
    );
  }

  register(form): Observable<User>{
    return this.http.post<User>(this.userUrl + '/register', form).pipe(
      catchError(this.handleRegisterError)
    );
  }

  sendUserData(){
    console.log(this.userData);
    return this.userData;
  }

  recieveUserData(userData){
    this.userData = userData;
  }
findUsers() {
        return this.http.get('http://localhost:8080/listUsers');
    }
 

  toggleToken(){
    this.token = (this.token === 'loggedin') ? 'loggedout' : 'loggedin';
  }
  getToken(){
    return this.token;
  }

  

  handleRegisterError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      this.error = 'email error';
      errorMessage = `Email already exist`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  handleLoginError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      this.error = 'no user';
      errorMessage = `You have not registered yet`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  public getError(){
    return this.error;
  }
}