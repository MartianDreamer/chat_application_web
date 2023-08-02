import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FriendRelationship } from '../model/friend';

@Injectable()
export class FriendService {
  private friendList: Array<FriendRelationship> = [];
  private readonly size = 30;
  private page = 0;

  get FriendList() {
    return this.friendList;
  }

  constructor(private httpClient: HttpClient) {
    this.loadMoreFriend();
  }

  loadAvatar(id: string) {
    return this.httpClient.get(`${environment.apiUrl}/rest/users/avatar/${id}`);
  }

  loadMoreFriend() {
    const params = new HttpParams()
      .set('size', this.size)
      .set('page', this.page);
    this.httpClient
      .get(`${environment.apiUrl}/rest/relationships/friends`, { params })
      .subscribe((res: any) => this.friendList.push(...res.content));
    this.page++;
  }
}
