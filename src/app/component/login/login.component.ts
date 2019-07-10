import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean;
  user: UserModel = new UserModel();
  registerMessage: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  login() {
    this.authenticationService.authenticate(this.user.login, this.user.password, () => {
      this.router.navigateByUrl('/');
    });
    return false;
  }

  register() {
    this.http.put('http://localhost:9000/register', this.user).subscribe(
      (value) => {

      },
      (error: HttpErrorResponse) => {
        console.log(error);
        switch (error.status) {
          case 400: {
            window.alert(error.error);
            break;
          }
          case 201: {
            window.alert(error.error.text);
            break;
          }
          default: {
            console.log(error);
            break;
          }
        }
      });
  }
}
