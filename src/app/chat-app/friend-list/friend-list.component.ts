import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FriendService } from '../service/friend.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css'],
})
export class FriendListComponent implements OnDestroy {
  private friendSubcription: Subscription;
  mode: 'friend' | 'request' | 'search' = 'friend';
  constructor(protected friendService: FriendService, private router: Router) {
    this.friendSubcription = this.friendService.subscribe();
  }
  ngOnDestroy(): void {
    this.friendSubcription.unsubscribe();
  }
  onEnter(e: any) {
    if (e.target.value === '') {
      this.router.navigateByUrl('/app/f');
      this.mode = 'friend';
    }
    this.router.navigateByUrl(`/app/f/s/${e.target.value}`);
    this.mode = 'search';
  }

  onBackspace(e: any) {
    if (e.target.value !== '') return;
    this.router.navigateByUrl('/app/f');
    this.mode = 'friend';
  }

  showRequest() {
    if (this.mode === 'friend') {
      this.router.navigateByUrl('/app/f/r');
      this.mode = 'request';
    } else {
      this.router.navigateByUrl('/app/f');
      this.mode = 'friend';
    }
  }
}
