import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
// import { BrowserWindow } from 'electron';

// import {ElectronService} from "ngx-electron";

const MESSAGE_TYPE = {
  SDP: 'SDP',
  CANDIDATE: 'CANDIDATE',
};

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
robot:any;
  cameraActivated: boolean = true;

  
  screenActivated: boolean = false;

  signaling: any;
  senders: any = [];
  userMediaStream: any;
  userconnected:Boolean=false;
  captureStream:any;
  
  displayMediaStream: any;
  disabled: boolean = true;
  codeInput: string;
  connected: boolean = false;
  startButton = document.getElementById('startButton');

  selfuser: string;
  remoteuser:string;
  sharing:Boolean = false;
  
  constructor(private route: ActivatedRoute,private router: Router/*, private _electronService:ElectronService*/) {
    //this._electronService = _electronService;
    // console.log(this._electronService.remote);
    // this.robot = this._electronService.remote.require("robotjs");
 
   }

  ngOnInit() {
    this.selfuser = sessionStorage.getItem('name');
    console.log(this.selfuser);
    this.remoteuser = localStorage.getItem('notifUser');
    console.log(this.remoteuser);
    console.log("sunt aci");
    if (this.route.snapshot.params.id !== ''){
      console.log("sunt aci2");
      this.code = this.route.snapshot.params.id;
      this.codeInput = this.code;
      localStorage.setItem("codeInput",this.codeInput);
    }
    document.getElementById('start-button').addEventListener('click', async event => {
      if (this.code) {
        this.startChat();
        this.connected = true;
      }
    });

   
  }


  async startChat() {
    console.log("sunt aci3");
    const mediaDevices = navigator.mediaDevices as any;
    try {
      this.userMediaStream = await mediaDevices.getUserMedia({ audio: true, video: true });
      this.userconnected = true;
     
      this.showChatRoom();
      
      this.signaling = new WebSocket('ws://localhost:1337');
      
      this.peerConnection = this.createPeerConnection();
      
      this.addMessageHandler();

      this.userMediaStream.getTracks().forEach(track => this.senders.push(this.peerConnection.addTrack(track, this.userMediaStream)));
      
        this.video1.nativeElement.srcObject = this.userMediaStream;
      
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
      localStorage.removeItem("notifUser");
      //this.router.navigate(['/api/user-profile']);
    });
    
    this.video1.nativeElement.srcObject = null;
    this.video2.nativeElement.srcObject = null;

  
    window.close();
    //this.videoscreen.nativeElement.srcObject = null;
  }

  // open(content){
  //   this.modealService.open(content);
  // }

    screenShare(): void {
      this.shareScreen();
    }
  
    private shareScreen(): void {
      this.sharing = true;
      // @ts-ignore
      navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true
        }
      }).then(stream => {
        const videoTrack = stream.getVideoTracks()[0];
        videoTrack.onended = () => {
          this.stopScreenShare();
        };
  
        const sender = this.peerConnection.getSenders().find(s => s.track.kind === videoTrack.kind);
        sender.replaceTrack(videoTrack);
      }).catch(err => {
        console.log('Unable to get display media ' + err);
      });
   
    //   var socket = this.signaling;
    //   const win = new BrowserWindow({
    //     width: 500,
    //     height: 150,
    //     webPreferences: {
    //         nodeIntegration: true
    //     }
    // })
    //   socket.on("mouse-move", function(data){
    //     var obj = JSON.parse(data);
    //     var x = obj.x;
    //     var y = obj.y;

    //     this.robot.moveMouse(x, y);
    // })

    // socket.on("mouse-click", function(data){
    //     this.robot.mouseClick();
    // })

    // socket.on("type", function(data){
    //     var obj = JSON.parse(data);
    //     var key = obj.key;

    //     this.robot.keyTap(key);
    // })
      
    }
 
    private stopScreenShare(): void {
      this.sharing = false;
      const videoTrack = this.userMediaStream.getVideoTracks()[0];
      const sender = this.peerConnection.getSenders().find(s => s.track.kind === videoTrack.kind);
      sender.replaceTrack(videoTrack);
    }
  
    requestControl(){

      //window.open("localhost:4200/view", "_blank");
      var socket = this.signaling;
      var room = localStorage.getItem("codeInput");
      // const remoteview = document.getElementById('remote-view');
      //       remoteview.addEventListener('mouse-move', (e:MouseEvent) =>{

      //           var posX = $(this).offset().left;
      //           var posY = $(this).offset().top;

      //           var x = e.pageX - posX;
      //           var y = e.pageY - posY;

      //           var obj = {"x" : x, "y": y, "room": room}
      //           socket.emit("mouse-move", JSON.stringify(obj));

      //       })

      //       remoteview.addEventListener('mouse-click', e=>{
      //           var obj = {"room" : room};
      //           socket.emit("mouse-click", JSON.stringify(obj));
      //       })


    }
    

   
  }
