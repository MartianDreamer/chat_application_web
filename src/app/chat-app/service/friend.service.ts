import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FriendRelationship, FriendRequest } from '../model/friend';
import {
  AppNotification,
  FRIEND_REQUEST,
  ONLINE_STATUS_CHANGE,
} from '../model/notification';
import { User } from '../model/user';
import { NotificationService } from './notification.service';

@Injectable()
export class FriendService {
  private friendList: Array<FriendRelationship> = [];
  private friendRequestFromMe: Array<FriendRequest> = [];
  private friendRequestToMe: Array<FriendRequest> = [];
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
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.loadMoreFriend();
    this.loadMoreFromMeRequest();
    this.loadMoreToMeRequest();
  }

  subscribe(): Subscription {
    return this.notificationService.FriendRelationshipObservable.subscribe(
      (not) => {
        this.handleNotification(not);
      }
    );
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
        this.friendRequestFromMe.push(...res.content);
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
        this.friendRequestToMe.push(...res.content);
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

  addFriend(user: User, callback) {
    this.httpClient
      .put(
        `${environment.apiUrl}/rest/relationships/friend-requests/${user.id}`,
        {}
      )
      .subscribe({
        next: (id: any) => {
          const request = {
            id,
            user,
            type: 'TO',
          };
          this.friendRequestFromMe.push(request);
          callback(request);
        },
        error: (e) => {
          alert('can not send request to this person');
          this.router.navigateByUrl('/app/f');
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
      this.friendList = this.friendList.filter(
        (e) => e.id !== notification.content.id
      );
      if (notification.content.friend.online) {
        this.friendList = [notification.content, ...this.friendList];
      } else {
        this.friendList = [...this.friendList, notification.content];
      }
    } else if (notification.type === FRIEND_REQUEST) {
      this.friendRequestToMe = [
        notification.content,
        ...this.friendRequestToMe,
      ];
    } else {
      this.friendList = [notification.content, ...this.friendList];
      this.friendRequestFromMe = this.friendRequestFromMe.filter(
        (e) => e.user.id !== notification.content.friend.id
      );
    }
  }
}
