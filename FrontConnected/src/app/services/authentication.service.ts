import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

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
    
    
    authenticate(user, callback) {
      const encodedcredentials: string = btoa(user.email + ':' + user.password);
      console.log(encodedcredentials);
      let basicHeader = "Basic "+encodedcredentials;
      let headers = new HttpHeaders ({
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : basicHeader
  });
    console.log(headers);
      this.http.get('http://localhost:8080/login', {headers: headers})
    .subscribe((response) => {
        let data: any ;
        data = response;
        console.log(data);
        if (response['email']) {
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
        return callback && callback(data);
    });
  
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
        return this.http.post('http://localhost:8080/logout', {})
        .subscribe((response) => {
          console.log(localStorage.getItem('currentUser'));
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        },
        error => {
    
        });
    
      }
      public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    
    isLoggedIn() {
        if (localStorage.getItem('currentUser')) {
          return true;
        }
        return false;
      }

    isLoggedOut(): boolean {
        return !this.isLoggedIn();
    }
}