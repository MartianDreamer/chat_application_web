import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { concatMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

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
  self: User | undefined;
  image: String | undefined;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    const obs = this.httpClient
      .get(`${environment.apiUrl}/rest/users?self=true`)
      .pipe(
        concatMap((val: any) => {
          this.self = val;
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
  }
}
