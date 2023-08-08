import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../model/user';
import { FriendService } from '../../service/friend.service';
import { FriendRequest } from '../../model/friend';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css'],
})
export class SearchItemComponent {
  @Input() user: User | undefined;
  request: FriendRequest | undefined;
  @Output() addEmitter = new EventEmitter<string | undefined>();

  constructor(private friendService: FriendService) {}

  addFriend() {
    if (!this.request) {
      this.friendService.addFriend(this.user as User, (request) => {
        this.request = request;
        this.addEmitter.next(this.user?.username as string);
      });
    } else {
      this.friendService.cancelFromMeRequest(this.request.id);
      this.request = undefined;
      this.addEmitter.next(undefined);
    }
  }
}
