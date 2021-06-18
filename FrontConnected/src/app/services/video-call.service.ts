import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {

  constructor(private http: HttpClient) {
    
   }

   setControl(){
     console.log("pressed");
    return this.http.get<String>('http://192.168.100.37:8080/videocall/setremote');
  }
}