import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Message } from '@app/models/message';
import { ChatService } from '@app/services/chat.service';
import { ConversationService } from '@app/services/conversation.service';
import { FileService } from '@app/services/file.service';
import { MessageService } from '@app/services/message.service';
import { StompService } from 'ng2-stomp-service';

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

    constructor(private fb: FormBuilder, private fileService: FileService,private chatService: ChatService
            , private channelService: ConversationService) { }

    ngOnInit() {
      this.email = sessionStorage.getItem('email');
      console.log("mesaj,, curent user",this.email);
      this.channelService.getChannel().subscribe(channel => {
          this.channel = channel;
          console.log("filtrez mesaje");
          this.filterMessages();
          console.log(this.filterMessages());
      });

      this.chatService.getMessages().subscribe(messages => {
          this.filterMessages();
      });
    }

    // sendMessage() {
    //   if (this.newMessage) {
    //       this.stompService.send('/app/messages', {'channel': this.channel
    //           , 'sender': this.email, 'content': this.newMessage});
    //       this.newMessage = '';
    //       this.scrollToBottom();
    //   }
    // }
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

    public onFileChange(event) {
      const reader = new FileReader();
   
      if (event.target.files && event.target.files.length) {
        this.fileName = event.target.files[0].name;
        const [file] = event.target.files;
        reader.readAsDataURL(file);
       
        reader.onload = () => {
          this.formGroup.patchValue({
            file: reader.result
          });
        };
      }
    }
   
    public onSubmit(): void {
      this.fileService.upload(this.fileName, this.formGroup.get('file').value);
    }

}
