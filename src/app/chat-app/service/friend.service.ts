import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FriendRelationship } from '../model/friend';
import { AppNotification, ONLINE_STATUS_CHANGE } from '../model/notification';
import { User } from '../model/user';
import { NotificationService } from './notification.service';

@Injectable()
export class FriendService {
  private friendList: Array<FriendRelationship> = [];
  private friendRequestFromMe: Array<FriendRelationship> = [];
  private friendRequestToMe: Array<FriendRelationship> = [];
  private readonly size = 30;
  private friendPage = 0;
  private fromMePage = 0;
  private toMePage = 0;

  get FriendList() {
    return this.friendList;
  }

  get FromMeRequest() {
    return this.friendRequestFromMe;
  }
  get ToMeRequest() {
    return this.friendRequestToMe;
  }

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {
    this.loadMoreFriend();
    this.loadMoreFromMeRequest();
    this.loadMoreToMeRequest();
  }

  subscribe(): void {
    this.notificationService.FriendRelationshipObservable.subscribe((not) => {
      this.handleNotification(not);
    });
  }

  loadAvatar(id: string) {
    return this.httpClient.get(`${environment.apiUrl}/rest/users/avatar/${id}`);
  }

  loadMoreFriend() {
    const params = new HttpParams()
      .set('size', this.size)
      .set('page', this.friendPage);
    this.httpClient
      .get(`${environment.apiUrl}/rest/relationships/friends`, { params })
      .subscribe((res: any) => this.friendList.push(...res.content));
    this.friendPage++;
  }

  searchByUsername(username: string) {
    return this.httpClient.get(
      `${environment.apiUrl}/rest/users?username=${username}`
    );
  }

  loadMoreFromMeRequest() {
    const params = new HttpParams()
      .set('size', this.size)
      .set('page', this.fromMePage)
      .set('from_me', true);
    this.httpClient
      .get(`${environment.apiUrl}/rest/relationships/friend-requests`, {
        params,
      })
      .subscribe((res: any) => {
        this.friendRequestFromMe.push(
          ...res.content.map(this.mapRequestToRelationship)
        );
      });
    this.fromMePage++;
  }

  loadMoreToMeRequest() {
    const params = new HttpParams()
      .set('size', this.size)
      .set('page', this.toMePage)
      .set('from_me', false);
    this.httpClient
      .get(`${environment.apiUrl}/rest/relationships/friend-requests`, {
        params,
      })
      .subscribe((res: any) => {
        this.friendRequestToMe.push(
          ...res.content.map(this.mapRequestToRelationship)
        );
      });
    this.toMePage++;
  }

  unfriend(id: string, mode: 'friend' | 'friendship' = 'friendship') {
    if (mode === 'friend') {
      id = this.friendList.find((e) => e.friend.id === id)?.id as string;
    }
    this.httpClient
      .delete(`${environment.apiUrl}/rest/relationships/friends/${id}`)
      .subscribe((res) => {
        this.friendList = this.friendList.filter((e) => e.id !== id);
      });
  }

  isFriend(id: string | undefined) {
    return !!this.friendList.find((e) => e.friend.id === id);
  }

  addFriend(friend: User, callback) {
    this.httpClient
      .put(
        `${environment.apiUrl}/rest/relationships/friend-requests/${friend.id}`,
        {}
      )
      .subscribe({
        next: (resp: any) => {
          const request = {
            id: resp,
            friend: friend,
            type: 'TO',
            since: undefined,
          };
          this.friendRequestFromMe.push(request);
          callback(request);
        },
        error: (e) => {
          alert(e);
        },
      });
  }

  cancelFromMeRequest(id: string) {
    this.httpClient
      .delete(
        `${environment.apiUrl}/rest/relationships/friend-requests/${id}`,
        {}
      )
      .subscribe((resp: any) => {
        this.friendRequestFromMe = this.friendRequestFromMe.filter(
          (e) => e.id !== id
        );
      });
  }

  acceptFriendRequest(id: string) {
    this.httpClient
      .post(
        `${environment.apiUrl}/rest/relationships/friend-requests/${id}`,
        {}
      )
      .subscribe((res: any) => {
        this.friendRequestToMe = this.friendRequestToMe.filter(
          (e) => e.id !== id
        );
        this.friendList = [res, ...this.friendList];
      });
  }

  rejectFriendRequestToMe(id: string) {
    this.httpClient
      .delete(
        `${environment.apiUrl}/rest/relationships/friend-requests/${id}`,
        {}
      )
      .subscribe(() => {
        this.friendRequestToMe = this.friendRequestToMe.filter(
          (e) => e.id !== id
        );
      });
  }

  mapRequestToRelationship(e: any) {
    e.friend = e.user;
    delete e.user;
    return e;
  }

  getFriendByFriendId(id: string) {
    return this.friendList.find((e) => e.friend.id === id);
  }

  getFromMeRequestByFriendId(id: string) {
    return this.friendList.find((e) => e.friend.id === id);
  }

  getToMeRequestByFriendId(id: string) {
    return this.friendList.find((e) => e.friend.id === id);
  }

  handleNotification(notification: AppNotification) {
    if (notification.type === ONLINE_STATUS_CHANGE) {
      const friend = this.friendList.find(
        (e) => e.friend.id === notification.content.id
      );
      if (friend) {
        friend.friend.online = notification.content.online;
        friend.friend.lastSeen = notification.content.lastSeen;
        this.friendList = [
          friend,
          ...this.friendList.filter((e) => e != friend),
        ];
      }
    }
  }
}
