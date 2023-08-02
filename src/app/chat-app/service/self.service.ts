import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserEdit } from '../model/user';

@Injectable()
export class SelfService {
  private self: User | undefined;
  private image: string | undefined;
  constructor(private httpClient: HttpClient) {
    this.httpClient
      .get(`${environment.apiUrl}/rest/users?self=true`)
      .pipe(
        concatMap((val: any) => {
          this.self = val;
          return this.httpClient.get(
            `${environment.apiUrl}/rest/users/avatar/${val.id}`
          );
        })
      )
      .subscribe((res: any) => {
        this.image = res.content;
      });
  }

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
