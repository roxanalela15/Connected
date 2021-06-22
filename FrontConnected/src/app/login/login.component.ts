
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/models/user';
import { AuthenticationService } from '@app/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
         
          
          this.authService.toggleToken();
          sessionStorage.setItem('token', this.authService.getToken());
          console.log(sessionStorage.getItem('token'));
          this.resetForm();
          this.router.navigate(['/api/user-profile'], { relativeTo: this.route });
        }
        
      });
    }
    else {
      return;
    }
  }

  resetForm() {
    this.formgroup.reset();
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, size: 'lg', });
  }
  
  get f() { return this.formgroup.controls; }

}