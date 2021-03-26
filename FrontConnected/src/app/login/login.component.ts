import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/models/user';
import { AuthenticationService } from '@app/services/authentication.service';
import { ClientService } from '@app/services/client-service';
import { BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: User = new User();
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  loginSuccess = false;
  email: string;
  password : string;
  constructor(private formBuilder: FormBuilder,private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
            email: ['',Validators.required],
            password: ['', Validators.required]
        });
  }
  login() {
    console.log(this.user.email);
    this.authService.authenticate(this.user, (e) => {
      this.router.navigateByUrl('/home');
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      console.log(e);
      let resp: any;
      resp = e.principal;
      if (resp) {
        localStorage.setItem('currentUser', JSON.stringify(resp));
      }
    });
  }

}
