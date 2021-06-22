import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Injectable({
    providedIn: 'root'
  })
  export class ClientService {
  

    constructor(
      private http: HttpClient
    ) { }  
  
 
    getUsers() {
      return this.http.get<User[]>('http://192.168.100.37:8080/api/people');
      //return this.http.get<User[]>('http://localhost:8080/listUsers');
    }

    sendMessage(message:Message){
      return this.http.post<Message>('http://192.168.100.37:8080/api/messages', message);
    }

    seeMessage(){
      return this.http.get<Message[]>('http://192.168.100.37:8080/api/messages');
    }
    getDetails(email) :Observable<User>{
      console.log("am ajuns aici");
      return this.http.get<User>('http://192.168.100.37:8080/api/settings/'+email);
    }
  
    }