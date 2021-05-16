import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmedValidator } from '../confirmed.validator';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { ClientService } from '../services/client-service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

user: User;


registerForm: FormGroup;
submitted = false;
constructor(private authService: AuthenticationService,
            private router: Router, private route: ActivatedRoute,private formBuilder: FormBuilder,) { }

ngOnInit(): void {
  console.log('inside init');
  this.initForm();
  
}
initForm() {

     this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordconfirm: new FormControl('', [Validators.required]),
        },
        {
          validator: ConfirmedValidator('password', 'passwordconfirm')
       });
  
}

onSave() {
  this.submitted = true;
  console.log('inside submit');
  if (this.registerForm.valid) {
    this.authService.register(this.registerForm.value).subscribe(
                            (result) => {
                  console.log(this.user);
                  
      
      this.user = result;
      alert('Thank you ' + this.user.name + ' for registering. Now you can Login');
      this.router.navigateByUrl('/');
                });
    
    //this.resetForm();
    //alert('Thank You for registering');
  }
  else {
    return;
  }
}



get f() { return this.registerForm.controls; }

}