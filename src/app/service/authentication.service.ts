import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../model/login-response.model';
import { finalize } from 'rxjs/operators';


export class User {
  constructor(
    public status: string,
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticated = false;
  sessionId = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router) {
  }

  authenticate(username, password, callback) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    this.httpClient.get<LoginResponse>('http://localhost:9000/user', { headers }).subscribe(
      (data) => {
        this.authenticated = data.authenticated;
        this.sessionId = data.details.sessionId;
        console.log(this.sessionId);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          window.alert('wrong login or password');
        } else {
          console.log(error);
        }
        this.authenticated = false;
      });
    return callback && callback();
  }

  logOut() {
    this.httpClient.post('http://localhost:9000/logout', null).pipe(
      finalize(() => {
        this.authenticated = false;
        this.sessionId = '';
        this.router.navigateByUrl('/login');
      })).subscribe();
  }

}
