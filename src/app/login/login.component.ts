import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }
  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigateByUrl('/app');
    }
  }

  onSubmit(f: NgForm) {
    this.authenticationService.authenticate(f.value)
  }
}
