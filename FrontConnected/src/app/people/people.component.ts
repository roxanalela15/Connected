
import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  startButton = document.getElementById('startButton');
  @ViewChild('video')

  public video: ElementRef;
  captureStream:any;
  constructor(
    ) { }

  ngOnInit(): void {
    
  }
  
  
  screenShare() {
    const mediaDevices = navigator.mediaDevices as any;
    
    
    mediaDevices.getDisplayMedia({video: true})
      .then(this.handleSuccess, this.handleError);
    }

    handleSuccess(stream) {
      const video = document.querySelector('video');
      video.srcObject = stream;
    
      // demonstrates how to detect that the user has stopped
      // sharing the screen via the browser UI.
      stream.getVideoTracks()[0].addEventListener('ended', (error) => {
        this.errorMsg('The user has ended sharing the screen', error);
        
      });
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
