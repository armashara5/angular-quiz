import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserDetailsComponent } from '../users/user-details/user-details.component';
import { UsersListComponent } from '../users/users-list/users-list.component';
// import { UsersComponent } from '../users/users.component';

const appRouts: Routes = [
  {path: '', component: UsersListComponent },
  {path: 'users', component: UsersListComponent },
  {path: 'users/:id', component: UserDetailsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRouts)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
