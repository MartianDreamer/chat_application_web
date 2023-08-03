import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment';
import { AppNotification } from '../model/notification';
import * as SockJS from 'sockjs-client';

@Injectable()
export class WebsocketConnectService {
  private notificationSubject = new Subject<AppNotification>();
  constructor(private authService: AuthenticationService) {
    const client = new Client({
      webSocketFactory: () => new SockJS(environment.wsUrl),
      connectHeaders: {
        Authorization: `Bearer ${this.authService.AccessToken}`,
      },
      onConnect: () => {
        client.subscribe('/user/queue/notification', (message: any) => {
          this.notificationSubject.next(JSON.parse(message.body));
        });
      },
      onStompError: (frame) => {
        console.log('stomp error: ');
        console.log(frame);
      },
      onWebSocketError: (frame) => {
        console.log('ws error: ');
        console.log(frame);
      },
    });
    client.activate();
  }

  get Connection() {
    return this.notificationSubject.asObservable();
  }
}
