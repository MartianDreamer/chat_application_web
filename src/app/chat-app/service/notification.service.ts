import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {WebsocketConnectService} from './websocket-connect.service';
import {AppNotification, FRIEND_ACCEPT, FRIEND_REQUEST, ONLINE_STATUS_CHANGE,} from '../model/notification';

@Injectable()
export class NotificationService {
  private friendRequestObservable = new Subject<AppNotification>();

  constructor(private wsService: WebsocketConnectService) {
    this.wsService.Connection.subscribe((val: AppNotification) => {
      if (
        [FRIEND_ACCEPT, FRIEND_REQUEST, ONLINE_STATUS_CHANGE].includes(val.type)
      ) {
        this.friendRequestObservable.next(val);
      }
    });
  }


  get FriendRelationshipObservable() {
    return this.friendRequestObservable;
  }
}
