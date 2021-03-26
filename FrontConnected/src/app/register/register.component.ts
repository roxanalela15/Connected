import { HttpClient } from '@angular/common/http';
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
  imgURL:any;
  private selectedFile;

  saveSubscription : Subscription;

  @Input()
  user: User;

  constructor(private httpClient: HttpClient,private http: ClientService,
     private readonly router: Router,
     private authenticationService: AuthenticationService,
     private formBuilder: FormBuilder,
) { }

  ngOnInit() {
    //this.createForm();
    console.log(this.user);

    this.registerForm = this.formBuilder.group({
      userId: [''],
      photo: [''],
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

  public onFileChanged(event){
    console.log(event);

    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event2)=>{
      this.imgURL = reader.result;
    }
  }

  onSave() {
    console.log(this.user);
    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;
    this.httpClient.post('http://localhost:8080/api/user/upload', uploadData, { observe: 'response' })
      .subscribe((response) => {
      if (response.status === 200) {
        this.submitted = true;
        if (this.registerForm.invalid) {
          return;
        }
        else{
          this.loading = true;
          this.http.registerUser(this.registerForm.value).subscribe(
            (user) => {
            console.log(this.user);
            this.router.navigate(['/api/user/login']);
          });
        }
        console.log('Image uploaded successfully');

      }else {
        console.log('Image not uploaded successfully');
      }

      });
    }
  
    get f() { return this.registerForm.controls; }
    

}