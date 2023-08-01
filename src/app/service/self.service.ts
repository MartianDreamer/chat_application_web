import { Injectable } from '@angular/core';
import { User } from '../chat-app/model/user';

@Injectable({
  providedIn: 'root',
})
export class SelfService {
  private self: User | undefined;
  constructor() {}

  set Self(self: User) {
    this.self = self;
  }

  get Self(): User | undefined {
    return this.self;
  }
}
