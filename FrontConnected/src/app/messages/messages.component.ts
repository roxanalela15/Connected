import { Component, Input, OnInit } from '@angular/core';
import { Message } from '@app/models/message';
import { User } from '@app/models/user';
import { AuthenticationService } from '@app/services/authentication.service';
import { ChatService } from '@app/services/chat.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  

  messages: any[] = [];
  user: User;
  timestamp: Date;
  email:string;


  // @Input('theme')
  // set setTheme(value: string) {
  //   this.theme = value;
  // }
  // @Input('avatar')
  // set setAvatar(value: string) {
  //   this.avatar = value;
  // }

  constructor(public chatService: ChatService, private authenticationService:AuthenticationService) {}
  ngOnInit(): void {
    this.email = sessionStorage.getItem('auth_user');
    console.log("mesaj,, curent user",this.email);
  }

  // Prepare the chat message then call the chatService method 'sendMessage' to actually send the message
  sendMessage(event: any) {
    let obj: Message = {
      text: event.message,
      user: this.email,
      timestamp: this.timestamp
    };

    this.chatService.sendMessage(obj);
  }
  

}
