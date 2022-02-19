import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { Observable } from 'rxjs';

interface ApiUsersData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

interface ApiUserData {
  data: User;
  support: {
    url: string;
    text: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL: string = 'https://reqres.in/api/users';
  private _allUsers: User[] = [];
  private totalUsersLength: number = 0;
  constructor(private http: HttpClient) {}


  getAllUsers(): Observable<User[]> {
    return this.http.get<ApiUsersData>(this.API_URL).pipe(
      switchMap((data) => {
        let params = new HttpParams().set('per_page', this.totalUsersLength);
        return this.http
          .get<ApiUsersData>(this.API_URL, { params: params })
          .pipe(
            map((responseData) => {
              return responseData['data'];
            })
          );
      })
    );
  }

  getUsersPerPage(page: number): Observable<User[]> {
    let params = new HttpParams().set('page', page);
    return this.http.get<ApiUsersData>(this.API_URL).pipe(
      switchMap((data) => {
        return this.http
          .get<ApiUsersData>(this.API_URL, { params: params })
          .pipe(
            map((responseData) => {
              return responseData['data'];
            })
          );
      })
    );
  }


  getUserById(id: number):Observable< User> {
    return this.http.get<ApiUserData>(this.API_URL+'/'+id)
    .pipe(
      switchMap((data) => {
        return this.http
          .get<ApiUserData>(this.API_URL+'/'+id)
          .pipe(
            map((responseData) => {
              return responseData['data'];
            })
          );
      })
    );
  }


  private getTotalUsers(): Observable<number> {
    return this.http.get<ApiUsersData>(this.API_URL).pipe(
      map((responseData) => {
        return responseData['total'];
      })
    );
  }

  getAllUsersFromAPI():Observable<User[]>{
    return this.getTotalUsers().pipe(
      switchMap((data) => {
        this.totalUsersLength = data;
        let params = new HttpParams().set('per_page', this.totalUsersLength);
        return this.http
          .get<ApiUsersData>(this.API_URL, { params: params })
          .pipe(
            map((responseData) => {

              this._allUsers = responseData['data'];

              return this._allUsers;
            })
          )
      })
    );


  }
}


