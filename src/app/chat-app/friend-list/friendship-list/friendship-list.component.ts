import { Component } from '@angular/core';
import { FriendService } from '../../service/friend.service';

@Component({
  selector: 'app-friendship-list',
  templateUrl: './friendship-list.component.html',
  styleUrls: ['./friendship-list.component.css']
})
export class FriendshipListComponent {

  constructor(protected friendService: FriendService) {}

  scrollEnd(e: any) {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      this.friendService.loadMoreFriend();
    }
  }
}
