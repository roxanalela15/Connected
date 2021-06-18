import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Message } from "@app/models/message";
import { Observable, Subject } from "rxjs";
import * as SockJS from 'sockjs-client';
declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // Store the chat messages
  public msgs = new Subject<Array<Message>>();
  public messages: Array<Message> = [];
  public stompClient;

  constructor(private http: HttpClient) {
    this.initializeWebSocketConnection();
  }
  initializeWebSocketConnection() {
    
     // Create a SockJS server with created back-end endpoint called /chat-websocket and added it over Stomp.
     
    const serverUrl = 'http://192.168.100.37:8080/chat-websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    
     // Connect stomp client and subscribe asynchronously to the chat message-handling Controller endpoint and push any message body into the messages array
     
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/chat/messages', message => {
        if (message.body) {
          let obj = JSON.parse(message.body);
          that.addMessage(obj);
        }
      });
    });
    
  }

  // Prepare and push the chat messages into the messages array
  addMessage(message: any) {
    this.messages.push(message);
    this.msgs.next(this.messages);
  }

  // Send a chat message using stomp client
  sendMessage(msg: Message) {
    
    
    this.stompClient.send('/app/messages', {}, JSON.stringify(msg));
  }

  filterMessages(channel: string): Array<Message> {
    return this.messages.filter(message => channel === message.channel)
        .sort((m1, m2) => {
            if (m1.timestamp > m2.timestamp) {
                return 1;
            }
  
            return -1;
        });
  }
  
  getMessages(): Observable<any> {
    console.log("Mesajeeele=",this.msgs);
    return this.msgs.asObservable();
  }

  sendReadReceipt(channelId: string, email) {
    this.http.post('http://192.168.100.37:8080/messages/', {
        channel: channelId,
        email: email
    });
  }
}