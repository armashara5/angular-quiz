import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  allUsers: User[] = [];
  users: User[] = [];
  searchTerm: string = '';
  PageSize = 5;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsersFromAPI().subscribe((t) => {
      this.allUsers = t;
      this.users = this.allUsers.slice(0, this.PageSize);
    });
  }

  search(eventData: any): void {
    var value = (eventData.target as HTMLInputElement).value as string;
    if (value.trim() == '') this.users = this.allUsers.slice(0, this.PageSize);
    else {
      this.users = this.allUsers.filter((val) => val.id == parseInt(value));
    }
  }
  OnPageChange(event: PageEvent) {
    this.PageSize = event.pageSize;
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.allUsers.length) {
      endIndex = this.allUsers.length;
    }
    this.users = this.allUsers.slice(startIndex, endIndex);
  }
}
