import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models/user';
import { AuthenticationService } from '@app/services/authentication.service';
import { ClientService } from '@app/services/client-service';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  users: Array<User>;
  usersRecieved: Array<User>;
  action: string;
  selecteduser: User; 
  loggedinUser: string = '';


  constructor(private http: ClientService, private authenticationService: AuthenticationService
    ) { }

  ngOnInit(): void {
    console.log(this.users);
    this.http.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    this.loggedinUser = this.authenticationService.getLoggedinUser();
    console.log("User logat:",this.loggedinUser);
    this.users = new Array<User>();
    this.usersRecieved = response;
    console.log(response);
    for (const user of this.usersRecieved) {
      // if (response.username == this.loggedinUser){
      //   break;
      // }
      // else{
      const userwithRetrievedImageField = new User();
      userwithRetrievedImageField.userId = user.userId;
      userwithRetrievedImageField.firstName = user.firstName;
      userwithRetrievedImageField.lastName = user.lastName;
      userwithRetrievedImageField.retrievedImage = "data:image/jpg;base64," + user.picByte;
      userwithRetrievedImageField.email = user.email;
      userwithRetrievedImageField.picByte = user.picByte;
      console.log(userwithRetrievedImageField.email);
      console.log("NU",userwithRetrievedImageField.email)
      this.users.push(userwithRetrievedImageField);
     // }
      
      
      
    }
    console.log(this.users);
  }
  
  
  
  startMessage(id: number){

  }


}
