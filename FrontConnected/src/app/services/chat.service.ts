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
  public msgs = new Subject<Array<Message>>();
  public messages: Array<Message> = [];
  public stompClient;

  constructor(private http: HttpClient) {
    this.initializeWebSocketConnection();
  }
  initializeWebSocketConnection() {
    
     
    const serverUrl = 'http://localhost:8080/chat-websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    
     
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/chat/messages', message => {
        if (message.body) {
          let obj = JSON.parse(message.body);
          console.log("MESAJE",obj);
          that.addMessage(obj);

        }
      });
    });
    
  }

  
  addMessage(message: any) {
    this.messages.push(message);
    this.msgs.next(this.messages);
    console.log("mesajul a fost adaugat",this.messages);
  }

  sendMessage(msg: Message) {
    this.stompClient.send('/app/messages', {}, JSON.stringify(msg));
    console.log("mesajul a fost trimis",JSON.stringify(msg));
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

// getMessages2(channelId:string){
//   return this.http.get<Message[]>('/api/messages/'+channelId);
// }
}