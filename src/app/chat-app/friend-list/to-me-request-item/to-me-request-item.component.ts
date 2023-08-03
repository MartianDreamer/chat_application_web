import { Component, Input, OnInit } from '@angular/core';
import { FriendRelationship, FriendRequest } from '../../model/friend';
import { FriendService } from '../../service/friend.service';

@Component({
  selector: 'app-to-me-request-item',
  templateUrl: './to-me-request-item.component.html',
  styleUrls: ['./to-me-request-item.component.css'],
})
export class ToMeRequestItemComponent implements OnInit {
  @Input() friendRequest: FriendRequest | undefined;

  constructor(public friendService: FriendService) {}

  ngOnInit(): void {
    if (!this.friendRequest) return;
    this.friendService
      .loadAvatar(this.friendRequest?.user.id as string)
      .subscribe((res: any) => {
        if (this.friendRequest) this.friendRequest.user.avatar = res.content;
      });
  }

  reject() {
    this.friendService.rejectFriendRequestToMe(this.friendRequest?.id as string);
  }
  accept() {
    this.friendService.acceptFriendRequest(this.friendRequest?.id as string);
  }
}
