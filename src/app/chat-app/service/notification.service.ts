import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FriendRelationship } from '../model/friend';
import { WebsocketConnectService } from './websocket-connect.service';
import {
  AppNotification,
  FRIEND_ACCEPT,
  FRIEND_REQUEST,
  ONLINE_STATUS_CHANGE,
} from '../model/notification';

@Injectable()
export class NotificationService {
  constructor(private wsService: WebsocketConnectService) {
    this.wsService.Connection.subscribe((val: AppNotification) => {
      if (
        [FRIEND_ACCEPT, FRIEND_REQUEST, ONLINE_STATUS_CHANGE].includes(val.type)
      ) {
        this.friendRequestObservable.next(val);
      }
    });
  }

  private friendRequestObservable = new Subject<AppNotification>();

  get FriendRelationshipObservable() {
    return this.friendRequestObservable;
  }
}
