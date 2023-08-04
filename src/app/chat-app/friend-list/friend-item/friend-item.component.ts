import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FriendRelationship } from '../../model/friend';
import { FriendService } from '../../service/friend.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
  styleUrls: ['./friend-item.component.css'],
})
export class FriendItemComponent implements OnInit, OnChanges {
  @Input() friendship: FriendRelationship | undefined;
  modalContent: any;
  constructor(public friendService: FriendService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    if (!this.friendship) return;
    if (this.friendship?.friend.avatar) return;
    this.friendService
      .loadAvatar(this.friendship?.friend.id as string)
      .subscribe((res: any) => {
        if (this.friendship) this.friendship.friend.avatar = res.content;
      });
  }

  addFriend(e: any) {
    if (e.target.classList.contains('friend-control-button-add-clicked')) {
      this.friendService.cancelFromMeRequest(this.friendship?.id as string);
      return e.target.classList.remove('friend-control-button-add-clicked');
    }
    this.friendService.addFriend(
      this.friendship?.friend as User,
      (res) => (this.friendship = res)
    );
    e.target.classList.add('friend-control-button-add-clicked');
  }

  unfriend() {
    this.modalContent = {
      title: 'Unfriend',
      content: `Do you really want to unfriend with ${this.friendship?.friend.username}?`,
      dangerous: true,
    };
  }

  doUnfriend(e: boolean) {
    if (e) {
      if (this.friendship?.id) {
        this.friendService.unfriend(this.friendship?.id as string);
      } else {
        this.friendService.unfriend(
          this.friendship?.friend.id as string,
          'friend'
        );
      }
      this.friendship = { ...this.friendship } as FriendRelationship;
    }
    this.modalContent = undefined;
  }
}
