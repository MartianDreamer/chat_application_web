import { Injectable } from '@angular/core';
import { Client, Stomp } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment';
import { AppNotification } from '../model/notification';

@Injectable()
export class WebsocketConnectService {
  private notificationSubject = new Subject<AppNotification>();
  constructor(private authService: AuthenticationService) {
    const client = new Client({
      brokerURL: environment.wsUrl,
      connectHeaders: {
        Authorization: `Bearer ${this.authService.AccessToken}`,
      },
      onConnect: (frame) => {
        console.log(frame);
        client.subscribe('/user/queue/notification', (message: any) => {
          console.log(message);
          this.notificationSubject.next(message);
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
