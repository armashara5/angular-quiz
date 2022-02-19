import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User;
  isLoading = false;
  _userId: number = 0;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = new User(0, '', '', '', '');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this._userId = this.route.snapshot.params.id;
    this.userService.getUserById(this._userId).subscribe((resolvedData) => {
      this.user = resolvedData;
      this.isLoading = false;
    });
  }

  onBackClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
