import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class ClientService {
  
    

    constructor(
      private http: HttpClient
    ) { }  
  
    
    registerUser(user: User) {
        return this.http.post<User>('http://localhost:8080/api/user/register', user);
      }
 
    getUsers() {
      return this.http.get<User[]>('http://localhost:8080/api/people');
    }
  
    }