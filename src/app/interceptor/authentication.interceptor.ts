import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authenticationService.AccessToken) {
      const cloneRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.AccessToken}`,
        },
      });
      return next.handle(cloneRequest);
    }
    return next.handle(request);
  }
}
