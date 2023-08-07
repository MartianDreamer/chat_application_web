import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketConnectService } from './websocket-connect.service';
import {
  AppNotification,
  FRIEND_ACCEPT,
  FRIEND_REQUEST,
  NEW_CONVERSATION,
  ONLINE_STATUS_CHANGE,
} from '../model/notification';
import { ATTACHMENT, MESSAGE } from '../model/conversation';

@Injectable()
export class NotificationService {
  private _friendSubject = new Subject<AppNotification>();
  private _conversationSubject = new Subject<AppNotification>();

  constructor(private wsService: WebsocketConnectService) {
    this.wsService.Connection.subscribe((val: AppNotification) => {
      if (
        [FRIEND_ACCEPT, FRIEND_REQUEST, ONLINE_STATUS_CHANGE].includes(val.type)
      ) {
        this._friendSubject.next(val);
      } else if ([MESSAGE, ATTACHMENT, NEW_CONVERSATION].includes(val.type)) {
        this._conversationSubject.next(val);
      }
    });
  }

  get FriendRelationshipObservable() {
    return this._friendSubject.asObservable();
  }

  get ConversationObservable() {
    return this._conversationSubject.asObservable();
  }
}
