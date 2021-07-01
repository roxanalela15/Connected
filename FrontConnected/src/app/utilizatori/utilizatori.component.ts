import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@app/models/user';
import { AuthenticationService } from '@app/services/authentication.service';
import { ChatService } from '@app/services/chat.service';
import { ConversationService } from '@app/services/conversation.service';

import * as SockJS from 'sockjs-client';
declare var SockJS;
declare var Stomp;

@Component({
  selector: 'app-utilizatori',
  templateUrl: './utilizatori.component.html',
  styleUrls: ['./utilizatori.component.css']
})
export class UtilizatoriComponent implements OnInit {

    
  NEW_USER_LIFETIME: number = 1000 * 5;
  public stompClient;
    @Input()
    email: string;
    public messages = [];
    @Output()
    receiverUpdated = new EventEmitter<string>();
    

    users: any = [];
    highlightedUsers: Array<string> = [];
    newConnectedUsers: Array<string> = [];
    channel: string;
    receiver: string;

    constructor(private userService: AuthenticationService,
            private channelService: ConversationService, private snackBar: MatSnackBar
           ,private chatService: ChatService) {
            

    }

    ngOnInit() {
        this.userService.findUsers().subscribe(
            res =>  {
                console.log("REs",res);
                this.users = res;
                this.initUserEvents();
            }
        );

        this.channelService.getChannel().subscribe(channel => this.channel = channel);
       
    }


    startChatWithUser(user) {
        this.email= sessionStorage.getItem("email");
        console.log("this EMAIL", this.email);
        const channelId = ConversationService.createChannel(this.email, user.email);
        this.channelService.refreshChannel(channelId);
        this.receiver = user.email;
        this.highlightedUsers = this.highlightedUsers.filter(u => u !== user.email);
        this.receiverUpdated.emit(user.email);
    }

    getOtherUsers(): Array<User> {
        //console.log("Acest email",this.email);
        return this.users;//.filter(user => user.email !== this.email);
    }

    getUserItemClass(user): string {
        let classes: string = 'user-item';
        if (user.email === this.receiver) {
            classes += ' current-chat-user ';
        }

        if (this.highlightedUsers.indexOf(user.email) >= 0) {
            classes += ' new-message';
        }

        if (this.newConnectedUsers.indexOf(user.email) >= 0) {
            classes += ' new-user';
        }

        if (!user.connected) {
            classes += ' disconnected-user';
        }

        return classes;
    }

    addMessage(message: any, username: string) {
        this.messages.push({
          text: message,
          date: new Date(),
          name: username,
           
        });
      }
    initUserEvents() {
        const serverUrl = 'http://localhost:8080/chat-websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
   
    this.stompClient.connect({}, function(frame) {
        that.stompClient.subscribe('/channel/login', res => {
            console.log("REEEEEES",res);
              if (res.email !== this.email) {
                  this.newConnectedUsers.push(res.email);
                  setTimeout((
                          function() {
                              this.removeNewUserBackground(res.email);
                          }
                  ).bind(this), this.NEW_USER_LIFETIME);
                  this.users = this.users.filter(item => item.email !== res.email);
                  this.users.push(res);
                  this.subscribeToOtherUser(res);
              }
          });
        //   that.stompClient.subscribe('/channel/logout', res => {
        //     this.users = this.users.filter(item => item.email !== res.email);
        //     this.users.push(res);
        //     const channelId = ConversationService.createChannel(this.email, res.email);
        //     if (this.channel === channelId) {
        //         this.receiverUpdated.emit('');
        //         this.channelService.removeChannel();
        //     }
        // });

        that.subscribeToOtherUsers(this.users, this.email);
    });
}

    removeNewUserBackground(email) {
        this.newConnectedUsers = this.newConnectedUsers.filter(u => u !== email);
    }

    subscribeToOtherUsers(users, email) {
        console.log(users);
        console.log(this.users);
        const filteredUsers: Array<any> = this.users.filter(user => email !== user.email);
        filteredUsers.forEach(user => this.subscribeToOtherUser(user));
    }

    subscribeToOtherUser(otherUser): string {
        const channelId = ConversationService.createChannel(this.email, otherUser.email);
        this.stompClient.subscribe('/channel/chat/' + channelId, res => {
            this.chatService.addMessage(res);

            
        });

        return channelId;
    }

    
// getSelectedUser(){
    
// }
}
