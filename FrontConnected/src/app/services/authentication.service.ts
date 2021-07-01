import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData;
  userUrl: string;
  todoUrl: string;
  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/api/auth';
  }
  private token: string = sessionStorage.getItem('token');
  error: string = 'false';
  isAuthenticated() {
    return sessionStorage.getItem('token') === 'loggedin';
  }

  logout() {
    this.toggleToken();
    sessionStorage.clear();
    sessionStorage.setItem('token', this.getToken());
  }

  login(form): Observable<User> {
    return this.http.post<User>(this.userUrl + '/signin', form).pipe(
      catchError(this.handleLoginError)
    );
  }

  register(form): Observable<User> {
    return this.http.post<User>(this.userUrl + '/signup', form).pipe(
      catchError(this.handleRegisterError)
    );
  }

  sendUserData() {
    console.log(this.userData);
    return this.userData;
  }

  recieveUserData(userData) {
    this.userData = userData;
  }
  findUsers() {
    return this.http.get('http://localhost:8080/api/users');
  }


  toggleToken() {
    this.token = (this.token === 'loggedin') ? 'loggedout' : 'loggedin';
  }
  getToken() {
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
  public getError() {
    return this.error;
  }
  delete(id) {
    return this.http.delete<User>('http://localhost:8080/api/deleteAccount/' + id);
  }
}