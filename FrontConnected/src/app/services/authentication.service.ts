import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    redirectUrl: string;
    public errorMessage = '';
    authenticated = false;
    constructor(private http: HttpClient, private router: Router) {
    }
   
  login(email: string, password: string) {
    let postData = {email : email,password :password};
    console.log(email);
    return this.http.post('http://localhost:8080/api/user/login', postData)
    .pipe(map(user => {
        if (user) {
          console.log(email);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }
      }),
      
    );
    }

    // login(user: User) {
    //     console.log(user.email);
    //     const encodedcredentials: string = btoa(user.email + ':' + user.password);
    //     console.log(encodedcredentials);
    //     let basicHeader = "Basic "+encodedcredentials;
    //     let headers = new HttpHeaders ({
    //     'Content-Type' : 'application/x-www-form-urlencoded',
    //     'Authorization' : basicHeader
    // });
    //     return this.http.get('http://localhost:8080/login', {headers: headers});
    //   }

    logout() {
        return this.http.post('http://localhost:8080/api/user/logout', {})
        .subscribe((response) => {
          console.log(localStorage.getItem('currentUser'));
          localStorage.removeItem('currentUser');
          this.router.navigate(['/api/user/login']);
        },
        error => {
    
        });
    
      }
      public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    
    isLoggedIn() {
      console.log("AM AJUNS AICI" + localStorage.getItem('currentUser'));
        if (localStorage.getItem('currentUser')) {
          return true;
        }
        return false;
      }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }
}