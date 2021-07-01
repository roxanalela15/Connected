import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';



@Component({
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.css']
})
export class RemoteComponent implements OnInit {
//signaling:WebSocket;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
