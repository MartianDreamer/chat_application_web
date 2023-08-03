import { Component, Input, OnInit } from '@angular/core';
import { FriendRelationship } from '../../model/friend';
import { FriendService } from '../../service/friend.service';

@Component({
  selector: 'app-to-me-request-item',
  templateUrl: './to-me-request-item.component.html',
  styleUrls: ['./to-me-request-item.component.css'],
})
export class ToMeRequestItemComponent implements OnInit {
  @Input() friendship: FriendRelationship | undefined;

  constructor(public friendService: FriendService) {}

  ngOnInit(): void {
    if (!this.friendship) return;
    this.friendService
      .loadAvatar(this.friendship?.friend.id as string)
      .subscribe((res: any) => {
        if (this.friendship) this.friendship.friend.avatar = res.content;
      });
  }

  reject() {
    this.friendService.rejectFriendRequestToMe(this.friendship?.id as string);
  }
  accept() {
    this.friendService.acceptFriendRequest(this.friendship?.id as string);
  }
}
