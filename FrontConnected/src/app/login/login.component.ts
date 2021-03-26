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
  errorMessage = "";
  successMessage: string;
  loginSuccess = false;
  constructor(private formBuilder: FormBuilder,private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
            email: ['',Validators.required],
            password: ['', Validators.required]
        });
  }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login() {
    this.loginSuccess = true;
    this.authService.login( this.email.value, this.password.value).subscribe((data) => {
       if (this.authService.isLoggedIn) {
        this.successMessage = "Connected!";
        console.log(this.successMessage);
         console.log("aici");
            const redirect = '/api/home';
                this.router.navigate([redirect]);
      } else {
            this.errorMessage = 'email or password is incorrect.';
      }
      }
    );
  }
}
