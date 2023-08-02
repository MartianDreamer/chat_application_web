import { Injectable } from '@angular/core';
import { User, UserEdit } from '../chat-app/model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SelfService {
  private self: User | undefined;
  private image: string | undefined;
  constructor(private httpClient: HttpClient) {}

  set Self(self: User) {
    this.self = self;
  }

  get Self(): User | undefined {
    return this.self;
  }

  set Image(image: string) {
    this.image = image;
  }

  get Image(): string | undefined {
    return this.image;
  }

  updateSelfInformation(user: UserEdit) {
    return this.httpClient.patch(`${environment.apiUrl}/rest/users`, user);
  }
}
