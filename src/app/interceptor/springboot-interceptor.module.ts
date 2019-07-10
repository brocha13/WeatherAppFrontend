import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class SpringbootInterceptor implements HttpInterceptor {

  constructor(public auth: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({
      withCredentials: true,
      headers: req.headers.set('Set-Cookie', 'jsessionid=' + this.auth.sessionId)
    });
    // Pass control to the next request
    return next.handle(clonedRequest);
  }
}
