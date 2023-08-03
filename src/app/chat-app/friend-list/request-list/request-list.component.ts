import { Component } from '@angular/core';
import { FriendService } from '../../service/friend.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
})
export class RequestListComponent {
  constructor(protected friendService: FriendService) {}

  scrollEnd(e: any, type: 'from' | 'to') {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      if (type === 'from') {
        this.friendService.loadMoreFromMeRequest();
      } else {
        this.friendService.loadMoreToMeRequest();
      }
    }
  }
}
