import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { concatMap } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SelfService } from 'src/app/service/self.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  get newConversationNotification() {
    return true;
  }
  get newFriendNotification() {
    return true;
  }

  get Self() {
    return this.selfService.Self;
  }

  image: String | undefined;
  userMenuStyle: any = {
    display: 'none',
  };
  myAccountStyle = {
    display: 'none',
    position: 'absolute',
    left: `${window.innerWidth / 2 - 100}px`,
    top: `${window.innerHeight / 2 - 100}px`,
  };
  justOpen = false;

  constructor(
    private httpClient: HttpClient,
    private renderer: Renderer2,
    private authService: AuthenticationService,
    private selfService: SelfService
  ) {}

  ngOnInit(): void {
    const obs = this.httpClient
      .get(`${environment.apiUrl}/rest/users?self=true`)
      .pipe(
        concatMap((val: any) => {
          this.selfService.Self = val;
          return this.httpClient.get(
            `${environment.apiUrl}/rest/users/avatar/${val.id}`
          );
        })
      )
      .subscribe({
        next: (res: any) => {
          this.image = res.content;
        },
        complete: () => {
          obs.unsubscribe();
        },
      });
    this.renderer.listen('window', 'click', (e: any) => {
      if (this.userMenuStyle.display !== 'none' && !this.justOpen) {
        this.userMenuStyle = {
          display: 'none',
        };
      }
      if (this.justOpen) {
        this.justOpen = false;
      }
    });
  }

  onClickOnAvatar(e: MouseEvent) {
    this.userMenuStyle = {
      display: 'block',
      position: 'absolute',
      left: `${e.clientX}px`,
      top: `${e.clientY}px`,
    };
    this.justOpen = true;
  }

  onLogoutClick() {
    this.authService.deleteToken();
    location.reload();
  }

  onMyAccountClick() {
    this.myAccountStyle = { ...this.myAccountStyle, display: 'flex' };
  }

  closeMyAccount(e: Event) {
    e.preventDefault();
    this.myAccountStyle = { ...this.myAccountStyle, display: 'none' };
  }

  onDragMyAccount(e: MouseEvent) {
    e.preventDefault();
    this.myAccountStyle = {
      ...this.myAccountStyle,
      left: `${e.clientX}px`,
      top: `${e.clientY}px`,
    };
  }
}
