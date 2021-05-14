import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  len: number;
  constructor(public auth: AuthenticationService, private searchService: SearchService) { }
  users$: Observable<User[]>;
  private searchText$ = new Subject<string>();
  ngOnInit(): void {
    this.users$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(name =>
        this.searchService.search(name))
    );
  }

 

  search(name: string){
    if (name === '') {
      this.len = 0;
    }
    else {this.len = 1; }
    this.searchText$.next(name);
  }

  clicked(u){
    this.searchService.searchedUser.next(u);
  }

}
