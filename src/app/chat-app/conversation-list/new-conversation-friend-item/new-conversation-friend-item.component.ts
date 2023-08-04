import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {FriendService} from '../../service/friend.service';
import {ConversationService} from '../../service/conversation.service';

@Component({
  selector: 'app-new-conversation-friend-item',
  templateUrl: './new-conversation-friend-item.component.html',
  styleUrls: ['./new-conversation-friend-item.component.css'],
})
export class NewConversationFriendItemComponent implements OnInit {
  @Input() friend: User | undefined;

  constructor(
    private friendService: FriendService,
    private conversationService: ConversationService
  ) {
  }

  get Added() {
    if (!this.friend)
      return false;
    return this.conversationService.isAdded(this.friend.id);
  }

  ngOnInit(): void {
    if (!this.friend) return;
    if (this.friend.avatar) return;
    this.friendService.loadAvatar(this.friend.id).subscribe((res: any) => {
      if (this.friend) this.friend.avatar = res.content;
    });
  }

  addToConversation() {
    if (!this.friend)
      return;
    if (!this.Added) {
      this.conversationService.addUserToAddedUser(this.friend.id);
    } else {
      this.conversationService.removeFromAddedUser(this.friend.id);
    }
  }
}
