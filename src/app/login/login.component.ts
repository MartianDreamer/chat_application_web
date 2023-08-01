import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginBody } from '../chat-app/model/login-body';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  failedToLogin = false;

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigateByUrl('/app');
    }
  }

  onSubmit(f: NgForm) {
    this.authenticate(f.value);
  }

  private authenticate(loginBody: LoginBody) {
    const obs = this.httpClient
      .post(`${environment.apiUrl}/rest/login`, loginBody)
      .subscribe({
        next: (resp: any) => {
          this.router.navigateByUrl('/app');
          this.authenticationService.saveAccessTokenIntoCookieStorage(
            resp.token,
            resp.issuedAt,
            resp.duration
          );
        },
        error: () => {
          this.failedToLogin = true;
        },
        complete: () => {
          obs.unsubscribe();
        },
      });
  }
}
