import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';


const MESSAGE_TYPE = {
  SDP: 'SDP',
  CANDIDATE: 'CANDIDATE',
};
/**
Step 1: caller creates offer

Step 2: caller sets localDescription

Step 3: caller sends the description to the callee

//------------------------------------------------------//

Step 4: callee receives the offer sets remote description

Step 5: callee creates answer

Step 6: callee sets local description

Step 7: callee send the description to caller

//------------------------------------------------------//

Step 8: caller receives the answer and sets remote description
 */

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {

  @ViewChild('video1', { static: true }) video1: ElementRef<HTMLVideoElement>;
  @ViewChild('video2', { static: true }) video2: ElementRef<HTMLVideoElement>;
  code: any;
  peerConnection: any;
  cameraActivated: boolean = true;
  screenActivated: boolean = false;
  signaling: any;
  senders: any = [];
  userMediaStream: any;
  captureStream:any;
  displayMediaStream: any;
  disabled: boolean = true;
  codeInput: string;
  connected: boolean = false;
  startButton = document.getElementById('startButton');
  
  constructor(private route: ActivatedRoute, private modealService: NgbModal) { }
  ngOnInit() {
    console.log("sunt aci");
    if (this.route.snapshot.params.id !== ''){
      console.log("sunt aci2");
      this.code = this.route.snapshot.params.id;
      this.codeInput = this.code;
    }
    document.getElementById('start-button').addEventListener('click', async event => {
      if (this.code) {
        this.startChat();
        
        this.connected = true;
      }
    });
  }

  // async sharecamera(){
  //   console.log("sunt aci3");
  //   const mediaDevices = navigator.mediaDevices as any;
  //   try {
  //     this.userMediaStream = await mediaDevices.getUserMedia({ audio: true, video: true });
  //     // if(this.screenActivated){
  //     //   this.cameraActivated = false;
  //     //   this.captureStream = await mediaDevices.getDisplayMedia({ video: true })
  //     // }
      
  //     this.showChatRoom();
      
  //     this.signaling = new WebSocket('ws://127.0.0.1:1337');
      
  //     this.peerConnection = this.createPeerConnection();
      
  //     this.addMessageHandler();

  //     this.userMediaStream.getTracks().forEach(track => this.senders.push(this.peerConnection.addTrack(track, this.userMediaStream)));
  //    // this.captureStream.getTracks().forEach(track2 => this.senders.push(this.peerConnection.addTrack(track2, this.captureStream)));
      
  //     //if (this.cameraActivated){
  //       this.video1.nativeElement.srcObject = this.userMediaStream;
  //       //this.videoscreen.nativeElement.srcObject = this.captureStream;
  //     //}
      
  //   }
  //   catch (err) {
  //     console.error(err);
  //   }

  // }

  // async sharescreen(){
  //   console.log("sunt aci3");
  //   const mediaDevices = navigator.mediaDevices as any;
  //   try {
  //     this.userMediaStream = await mediaDevices.getDisplayMedia({ video: true })
  //     // if(this.screenActivated){
  //     //   this.cameraActivated = false;
  //     //   this.captureStream = await mediaDevices.getDisplayMedia({ video: true })
  //     // }
      
  //     this.showChatRoom();
      
  //     this.signaling = new WebSocket('ws://127.0.0.1:1337');
      
  //     this.peerConnection = this.createPeerConnection();
      
  //     this.addMessageHandler();

  //     this.userMediaStream.getTracks().forEach(track => this.senders.push(this.peerConnection.addTrack(track, this.userMediaStream)));
  //    // this.captureStream.getTracks().forEach(track2 => this.senders.push(this.peerConnection.addTrack(track2, this.captureStream)));
      
  //     //if (this.cameraActivated){
  //       this.video1.nativeElement.srcObject = this.userMediaStream;
  //       //this.videoscreen.nativeElement.srcObject = this.captureStream;
  //     //}
      
  //   }
  //   catch (err) {
  //     console.error(err);
  //   }

  // }

  async startChat() {
    console.log("sunt aci3");
    const mediaDevices = navigator.mediaDevices as any;
    try {
      this.userMediaStream = await mediaDevices.getUserMedia({ audio: true, video: true });
      // if(this.screenActivated){
      //   this.cameraActivated = false;
      //   this.captureStream = await mediaDevices.getDisplayMedia({ video: true })
      // }
      
      this.showChatRoom();
      
      this.signaling = new WebSocket('ws://127.0.0.1:1337');
      
      this.peerConnection = this.createPeerConnection();
      
      this.addMessageHandler();

      this.userMediaStream.getTracks().forEach(track => this.senders.push(this.peerConnection.addTrack(track, this.userMediaStream)));
     // this.captureStream.getTracks().forEach(track2 => this.senders.push(this.peerConnection.addTrack(track2, this.captureStream)));
      
      //if (this.cameraActivated){
        this.video1.nativeElement.srcObject = this.userMediaStream;
        //this.videoscreen.nativeElement.srcObject = this.captureStream;
      //}
      
    }
    catch (err) {
      console.error(err);
    }
   
  }

  

  createPeerConnection() {
    console.log("peer connection created");
    var pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    pc.onnegotiationneeded = async () => {
      
      await this.createAndSendOffer();
    };

    pc.onicecandidate = (iceEvent) => {
      if (iceEvent && iceEvent.candidate) {
        console.log("sunt in peerconection");
        this.sendMessage({
         
          message_type: MESSAGE_TYPE.CANDIDATE,
          content: iceEvent.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      console.log("video");
      // tslint:disable-next-line:variable-name
      const _video2 = this.video2.nativeElement;
      console.log(_video2);
      _video2.srcObject = event.streams[0];
    };

    return pc;
  }
  

  addMessageHandler() {
    this.signaling.onmessage = async message => {
      const data = JSON.parse(message.data);
      if (!data) {
        return;
      }

      const { message_type, content } = data;

      try {
        if (message_type === MESSAGE_TYPE.CANDIDATE && content) {
          await this.peerConnection.addIceCandidate(content);
        }
        else if (message_type === MESSAGE_TYPE.SDP) {
          if (content.type === 'offer') {
            await this.peerConnection.setRemoteDescription(content);
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);
            this.sendMessage({
              message_type: MESSAGE_TYPE.SDP,
              content: answer,
            });
          }
          else if (content.type === 'answer') {
            await this.peerConnection.setRemoteDescription(content);
          }
          else {
            console.log('unsupported SDP type.');
          }
        }
      }
      catch (err) {
        console.error(err);
      }
    };
  }

  async createAndSendOffer() {
    
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    console.log("sunt aci4");
    this.sendMessage({
      
      message_type: MESSAGE_TYPE.SDP,
      content: offer,
    });
    console.log("sunt aci5");
  }

  sendMessage(message) {
    //const that = this;
    
    if (this.code) {
      
      const c = this.code;
      console.log(c);
      //aici e problema
      console.log(message);
      this.signaling.send(JSON.stringify({
        ...message,
        c,
      }));
      console.log("sunt aci6");
    }
  }

  showChatRoom() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('chat-room').style.display = 'flex';
  }

  async endCall(){
    this.userMediaStream.getTracks().forEach( (track) => {
      track.stop();
    });
    // this.captureStream.getTracks().forEach( (track2) => {
    //   track2.stop();
    // });
    this.video1.nativeElement.srcObject = null;
    this.video2.nativeElement.srcObject = null;
    //this.videoscreen.nativeElement.srcObject = null;
  }

  open(content){
    this.modealService.open(content);
  }

  

  // screenShare(): void {
  //   this.screenActivated = true;
  //   console.log(this.screenActivated);
  //   const mediaDevices = navigator.mediaDevices as any;
  //   this.captureStream = mediaDevices.getDisplayMedia({ video: true });
    
  //   //this.userMediaStream.getTracks().forEach(track => this.senders.push(this.peerConnection.addTrack(track, this.userMediaStream)));
   
  //   setTimeout(() => {
  //     console.log("nstive");
  //     this.videoscreen.nativeElement.srcObject = this.captureStream;
  //   }, 5000);
    
    
  //   //this.shareScreen();
  // }
  screenShare() {
    const mediaDevices = navigator.mediaDevices as any;
    
    
    mediaDevices.getDisplayMedia({video: true})
      .then(this.handleSuccess, this.handleError);
    }

    handleSuccess(stream) {
      const video = document.querySelector('video');
      video.setAttribute('height', '640');
      video.setAttribute('width', '480');
      video.srcObject = stream;
      
      // stop share
      stream.getVideoTracks()[0].addEventListener('ended', (error) => {
        this.errorMsg('The user has ended sharing the screen', error);
        
      });
     // this.video1.nativeElement.srcObject = stream;
    }
    
    handleError(error) {
      this.errorMsg(`getDisplayMedia error: ${error.name}`, error);
    }
    
    errorMsg(msg, error) {
      const errorElement = document.querySelector('#errorMsg');
      errorElement.innerHTML += `<p>${msg}</p>`;
      if (typeof error !== 'undefined') {
        console.error(error);
      }
    }
 
  
}
