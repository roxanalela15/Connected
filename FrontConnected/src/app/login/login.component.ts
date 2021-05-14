
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/models/user';
import { AuthenticationService } from '@app/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
//import { UtilizatorService } from '@app/services/utilizator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	
	// email: string = '';
	// password : string = '';

	// isLoggedin = false;
	// message: string;
	// error: string;

	// constructor(private router: Router, private authenticationService: AuthenticationService) {}

	// ngOnInit() {
	// 	this.isLoggedin = this.authenticationService.isUserLoggedin();

	// 	if(this.isLoggedin) {
	// 		this.router.navigateByUrl('/api/user-profile');
	// 	}
	// }

	// login() {
	// 	if(this.email !== '' && this.email !== null && this.password !== '' && this.password !== null) {
	// 		// this.authenticationService.authenticate(this.email, this.password).subscribe((result)=> {
	// 		// 	console.log(result);
	// 		// 	sessionStorage.setItem('user', this.email);
	// 		// 	this.router.navigate(['/acasa']);
	// 		// }, () => {		  
	// 		// 	this.error = 'Error';
	// 		// });
	// 		this.authenticationService.authenticate(this.email, this.password)
    //     .subscribe(
    //         res => {
    //             //sessionStorage.setItem('auth_user', this.email);
	// 			sessionStorage.setItem('name', this.user.name);
	// 			sessionStorage.setItem('email', this.user.email);
	// 			sessionStorage.setItem('id', this.user.id);
    //             this.router.navigate(['/api/user-profile']);
    //         },
    //         error => {
    //             this.message = error._body;
    //         });
	// 	} else {
	// 		this.error = 'Invalid Credentials';
	// 	}
	// }
	user: User;
  submitted = false;
  userChanged = new Subject<User>();
  formgroup: FormGroup;
  retrievedImage: any;
  retrieveRes: any;
  constructor(public authService: AuthenticationService,
              private modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('inside init');
    this.initForm();
  }
  initForm() {
    this.formgroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  login() {
    this.submitted = true;
    console.log('inside submit');
    if (this.formgroup.valid) {
      this.authService.login(this.formgroup.value).subscribe(result => {
        if (this.authService.getError() !== 'no user'){
          this.user = result;
          this.userChanged.subscribe(u => this.user = u);
          console.log(this.user);
          sessionStorage.setItem('name', this.user.name);
          sessionStorage.setItem('email', this.user.email);
          sessionStorage.setItem('id', this.user.userId.toString());
         
          // this.retrieveRes = result;
          // //console.log(this.retrieveRes.picByte);
          // this.retrievedImage = `data:image/(png|jpg|jpeg);base64,${this.retrieveRes.picByte}`;
          // //console.log(this.retrievedImage);
          // localStorage.setItem('pic', this.retrievedImage);
          this.authService.toggleToken();
          sessionStorage.setItem('token', this.authService.getToken());
          console.log(sessionStorage.getItem('token'));
          this.resetForm();
          this.router.navigate(['/home'], { relativeTo: this.route });
        }
        //this.authService.recieveUserData(this.user);
      });
    }
    else {
      return;
     // alert('Fill required detail!');
    }
  }

  resetForm() {
    this.formgroup.reset();
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, size: 'lg', });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formgroup.controls; }

}