import { Component } from '@angular/core';
import { FriendRelationship } from '../model/friend';
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

  get FromMeRequest() {
    return this.friendService.FromMeRequest;
  }

  get ToMeRequest() {
    return this.friendService.ToMeRequest;
  }

  searchResult: FriendRelationship | undefined;
  mode: 'friend' | 'request' | 'search' = 'friend';
  constructor(private friendService: FriendService) {}

  scrollEnd(e: any) {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      this.friendService.loadMoreFriend();
    }
  }

  onEnter(e: any) {
    this.friendService.searchByUsername(e.target.value).subscribe({
      next: (res: any) => {
        const friend = this.friendService.getFriendByFriendId(res.id);
        const toMeRequest = this.friendService.getToMeRequestByFriendId(res.id);
        const fromMeRequest = this.friendService.getFromMeRequestByFriendId(
          res.id
        );
        if (friend) {
          this.searchResult = { ...friend, friend: res };
        } else if (toMeRequest) {
          this.searchResult = { ...toMeRequest, friend: res };
        } else if (fromMeRequest) {
          this.searchResult = {
            ...fromMeRequest,
            friend: res,
          } as FriendRelationship;
        } else {
          this.searchResult = {
            id: undefined,
            friend: res,
            since: undefined,
            type: undefined,
          };
        }
        this.mode = 'search';
      },
      error: () => {
        e.target.classList.add('border');
        e.target.classList.add('border-danger');
        setTimeout(() => {
          e.target.classList.remove('border');
          e.target.classList.remove('border-danger');
        }, 3000);
      },
    });
  }

  onBackspace(e: any) {
    if (e.target.value !== '') return;
    this.mode = 'friend';
  }

  showRequest() {
    if (this.mode === 'request') {
      this.mode = 'friend';
    } else this.mode = 'request';
  }
}
