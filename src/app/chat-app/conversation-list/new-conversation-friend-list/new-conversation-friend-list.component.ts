import {Component} from '@angular/core';
import {User} from '../../model/user';
import {FriendService} from '../../service/friend.service';

@Component({
  selector: 'app-new-conversation-friend-list',
  templateUrl: './new-conversation-friend-list.component.html',
  styleUrls: ['./new-conversation-friend-list.component.css'],
})
export class NewConversationFriendListComponent {
  private friends: Array<User> = [];

  constructor(
    private friendService: FriendService
  ) {
  }

  get Friends() {
    if (this.friends.length !== this.friendService.FriendList.length) {
      this.friends = [...this.friendService.FriendList.map((e) => e.friend)];
    }
    return this.friends;
  }

  scrollEnd(e) {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      this.friendService.loadMoreFriend();
    }
  }
}
