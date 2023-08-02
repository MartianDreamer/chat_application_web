import { Component } from '@angular/core';
import { FriendService } from '../service/friend.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css'],
})
export class FriendListComponent {
  get FriendList() {
    return this.friendService.FriendList;
  }
  constructor(private friendService: FriendService) {}

  scrollEnd(e: any) {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      this.friendService.loadMoreFriend();
    }
  }
}
