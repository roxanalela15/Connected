import { Component, OnInit, OnDestroy,EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ConfirmedValidator } from '../confirmed.validator';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { ClientService } from '../services/client-service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit { //, OnDestroy

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  saveSubscription : Subscription;

  @Input()
  user: User;

  constructor(private http: ClientService,
     private readonly router: Router,
     private authenticationService: AuthenticationService,
     private formBuilder: FormBuilder,
) { }

  ngOnInit() {
    //this.createForm();
    console.log(this.user);

    this.registerForm = this.formBuilder.group({
      userId: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordconfirm: ['', [Validators.required]],
      email: ['', Validators.required],
      role:['']
  },
  {
    validator: ConfirmedValidator('password', 'passwordconfirm')
 });
 console.log(this.user);

  }


  onSave() {
    console.log(this.user);
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }
  else{
    this.loading = true;
    this.http.registerUser(this.registerForm.value).subscribe(
      (user) => {
        console.log(this.user);
        this.router.navigate(['/login']);
      });
  }
    }
    get f() { return this.registerForm.controls; }

}