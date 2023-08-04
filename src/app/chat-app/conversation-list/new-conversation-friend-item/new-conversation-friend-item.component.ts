import { Component, Input, OnInit } from '@angular/core';
import { FriendRelationship } from '../../model/friend';
import { FriendService } from '../../service/friend.service';

@Component({
  selector: 'app-new-conversation-friend-item',
  templateUrl: './new-conversation-friend-item.component.html',
  styleUrls: ['./new-conversation-friend-item.component.css'],
})
export class NewConversationFriendItemComponent implements OnInit {
  @Input() friendship: FriendRelationship | undefined;

  constructor(private friendService: FriendService) {}

  ngOnInit(): void {}
  addToConversation() {}
}
