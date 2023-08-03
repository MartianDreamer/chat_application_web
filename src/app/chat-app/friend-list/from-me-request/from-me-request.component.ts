import { Component, Input } from '@angular/core';
import { FriendRequest } from '../../model/friend';
import { FriendService } from '../../service/friend.service';

@Component({
  selector: 'app-from-me-request',
  templateUrl: './from-me-request.component.html',
  styleUrls: ['./from-me-request.component.css'],
})
export class FromMeRequestComponent {
  @Input() friendRequest: FriendRequest | undefined;
  constructor(private friendService: FriendService) {}

  cancel() {
    this.friendService.cancelFromMeRequest(this.friendRequest?.id as string);
  }
}
