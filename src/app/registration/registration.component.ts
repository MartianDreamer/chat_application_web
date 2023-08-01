import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigateByUrl('/app');
    }
  }

  onSubmit(f: NgForm) {
    const obs = this.httpClient
      .put(`${environment.apiUrl}/rest/users`, f.value)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/login');
        },
        complete: () => {
          obs.unsubscribe();
        },
      });
  }
}
