import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-one',
  templateUrl: './sidebar-one.component.html',
  styleUrls: ['./sidebar-one.component.css']
})
export class SidebarOneComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  openMessages() {
    this.router.navigate(['home']); 
  }
  openProfile() {
    this.router.navigate(['api/user-profile']); 
  }
  openPeople() {
    this.router.navigate(['api/people']); 
  }

}
