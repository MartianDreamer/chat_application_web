import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { concatMap } from 'rxjs';
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

  get Image() {
    return this.selfService.Image;
  }

  openAvatarClickMenu: boolean | undefined;
  clickLocation: any;
  openMyAccount: boolean | undefined;

  constructor(
    private httpClient: HttpClient,
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
          this.selfService.Image = res.content;
        },
        complete: () => {
          obs.unsubscribe();
        },
      });
  }

  onAvatarClick(e: MouseEvent) {
    this.openAvatarClickMenu = true;
    this.clickLocation = {
      left: `${e.clientX}px`,
      top: `${e.clientY}px`,
    };
  }

  closeOnAvatarClickMenu(e: boolean) {
    this.openAvatarClickMenu = e;
  }

  closeMyAccount(e: boolean) {
    this.openMyAccount = e;
  }

  renderMyAccount(e: boolean) {
    this.openMyAccount = e;
  }
}
