
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/models/user';
import { AuthenticationService } from '@app/services/authentication.service';
import { HomePageService } from '@app/services/home-page.service';
import { SearchService } from '@app/services/search.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Notification } from '../models/notification.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	
	formgroup: FormGroup;
	constructor(public authService: AuthenticationService, private searchService: SearchService,
				private http: HttpClient, private homeService: HomePageService,
				public domSan: DomSanitizer, private modalService: NgbModal,
				private router: Router, private route: ActivatedRoute) {
	}
	public imageUploaded = false;
	public aboutYouUploaded = false;
	selectedFile: File;
	message: string;
	public pic: any;
	picChanged = new Subject<string>();
	retrieveResonse: any;
	base64Data: any;
	retrieveImage: any;
	userChanged = new Subject<User>();
  
	user = new User(parseInt(sessionStorage.getItem('id')),
	sessionStorage.getItem('name'),
	sessionStorage.getItem('email'));
	seachedUser: User = new User(parseInt(''), '', '');
	deleteSearchedUser: boolean = true;
	notifications: Notification[];
	notif$ = new Subject<Notification[]>();
	ngOnInit(): void {
	  if (this.authService.isAuthenticated()) {
		this.searchService.searchedUser.subscribe(u => {
		  this.seachedUser = u;
		  this.deleteSearchedUser = false;
		});
  
		this.homeService.getUserNotifications(this.user.userId).subscribe(notiList => {
		  this.notifications = notiList;
		  this.notif$.next(this.notifications);
		  this.notif$.subscribe(nl => this.notifications = nl);
		});
  
		// this.getImage();
		this.getImage();
		setTimeout(() => {
		  console.log(this.user);
		  console.log(sessionStorage.getItem('name'));
		  console.log(sessionStorage.getItem('email'));
		  console.log(sessionStorage.getItem('id'));
		  //console.log(this.user.profilePic);
		  this.user.name = sessionStorage.getItem('name');
		  this.user.email = sessionStorage.getItem('email');
		  this.user.userId = parseInt(sessionStorage.getItem('id'));
		  
		  //console.log(localStorage.getItem('pic'));
		  if (sessionStorage.getItem('pic') === 'data:image/(png|jpg|jpeg);base64,null' || sessionStorage.getItem('pic') === null) {
			
			this.imageUploaded = false;
		  }
		  else {
			this.imageUploaded = true;
		  }
		  
		}, 200);
  
	  }
	  console.log(this.imageUploaded);
	}
  
	public onFileChanged(event) {
	  //Select File
	  this.user.retrievedImage = event.target.files[0];
	}
  
	onImageUpload() {
	  console.log(this.user.retrievedImage);
	  const uploadImageData = new FormData();
	  uploadImageData.append('pic', this.user.retrievedImage, this.user.userId.toString());
	  uploadImageData.append('id', this.user.userId.toString());
	  console.log(typeof(uploadImageData));
	  this.homeService.imageUpload(uploadImageData).subscribe((response) => {
		this.imageUploaded = true;
		this.userChanged.subscribe(u => this.user = u);
	  });
	  setTimeout(() => this.getImage(), 500);
	}
  
	onAboutYouUpload(){
	  if (this.formgroup.valid){
		console.log(this.formgroup.value);
		const newUserData = new FormGroup({
		  id: new FormControl(this.user.userId, [Validators.required]),
		  name: new FormControl(this.user.name, [Validators.required]),
		  email: new FormControl(this.user.email, [Validators.required]),
		  password: new FormControl(this.user.password, [Validators.required]),
		 
		});
		console.log(newUserData.value);
		this.homeService.aboutYouUpload(newUserData.value).subscribe(() => {
		  
		  this.userChanged.subscribe(u => this.user = u);
		  
		});
	  }
	}
	getImage(){
	  this.http.get('http://localhost:8080/get/' + this.user.userId)
	  .subscribe(
		res => {
		  this.retrieveResonse = res;
		  this.base64Data = this.retrieveResonse.picByte;
		  this.retrieveImage = `data:image/(png|jpg|jpeg);base64,${this.base64Data}`;
		  this.pic = this.retrieveImage;
		  //console.log(this.pic);
		  //console.log(this.retrieveImage);
		  this.picChanged.next(this.pic);
		  this.picChanged.subscribe(p => this.pic = p);
		  //console.log(this.pic);
		  sessionStorage.setItem('pic', this.pic);
		}
	  );
	}
  
	onVideoCall(id){
	  console.log(id);
	  const code = Math.floor(100000000 + Math.random() * 900000000);
	  console.log(code);
	  console.log(id);
	  this.homeService.videoCallRequest(parseInt(id), code, this.user.name).subscribe();
	  this.router.navigateByUrl('/video-call/' + code);
	}
  
	onDeleteNotification(id, i){
	  this.notifications.splice(i, 1);
	  this.notif$.next(this.notifications);
	  this.notif$.subscribe(nl => this.notifications = nl);
	  this.homeService.deleteNotification(id).subscribe();
	}
  
	openWindowCustomClass(content) {
	  this.modalService.open(content, { windowClass: 'dark-modal' });
	}
	open(content) {
	  this.modalService.open(content);
	}
  
	onDeleteSearchedUser(){
	  this.deleteSearchedUser = true;
	}
}
