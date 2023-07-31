import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    const authed = this.authenticationService.isAuthenticated();
    if (!authed) {
      this.router.navigateByUrl('/login');
    }
    return authed;
  }
}
