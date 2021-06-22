import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Message } from '@app/models/message';
import { ChatService } from '@app/services/chat.service';
import { ConversationService } from '@app/services/conversation.service';

@Component({
  selector: 'app-mesaje',
  templateUrl: './mesaje.component.html',
  styleUrls: ['./mesaje.component.css']
})
export class MesajeComponent implements OnInit {

  filteredMessages: Array<Message> = [];
  newMessage: string;
  channel: string;
  timestamp: Date;
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set = 'twitter';

  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });
 
  private fileName;

  @Input()
  email: string;

  //@Input()
  selectedemail: string;

    constructor(private fb: FormBuilder, private chatService: ChatService
            , private channelService: ConversationService) { }

    ngOnInit() {
      this.email = sessionStorage.getItem('email');
      
      this.channelService.getChannel().subscribe(channel => {
          this.channel = channel;
          this.selectedemail = sessionStorage.getItem('receiverc');
      console.log("receiver from message",this.selectedemail);
      console.log("sender from message",this.email);
          console.log("filtrez mesaje");
          this.filterMessages();
          console.log(this.filterMessages());
      });

      this.chatService.getMessages().subscribe(messages => {
          this.filterMessages();
      });
    }

    addEmoji(event) {
      const { newMessage } = this;
      const text = `${newMessage}${event.emoji.native}`;

      this.newMessage = text;
      this.showEmojiPicker = false;
    }
    sendMessage(newmsg:string) {
      
      console.log(newmsg);
      let obj: Message = {
        channel: this.channel,
        content:newmsg,
        sender: this.email,
        receiver: this.selectedemail,
        timestamp: this.timestamp
      };
  
      this.chatService.sendMessage(obj);
      this.newMessage = '';
      this.scrollToBottom();
    }

    filterMessages() {
      this.filteredMessages = this.chatService.filterMessages(this.channel);
      this.scrollToBottom();
    }

    scrollToBottom() {
        const msgContainer = document.getElementById('msg-container');
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    }

}
