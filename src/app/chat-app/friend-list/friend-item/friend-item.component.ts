import { Component, Input, OnInit } from '@angular/core';
import { FriendRelationship } from '../../model/friend';
import { FriendService } from '../../service/friend.service';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
  styleUrls: ['./friend-item.component.css'],
})
export class FriendItemComponent implements OnInit {
  @Input() friendship: FriendRelationship | undefined;
  image: String | undefined;

  constructor(private friendService: FriendService) {}

  ngOnInit(): void {
    this.friendService
      .loadAvatar(this.friendship?.friend.id as string)
      .subscribe((res: any) => {
        this.image = res.content;
      });
  }
}
