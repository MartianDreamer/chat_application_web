import { TestBed } from '@angular/core/testing';

import { WebsocketConnectService } from './websocket-connect.service';

describe('WebsocketConnectService', () => {
  let service: WebsocketConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
