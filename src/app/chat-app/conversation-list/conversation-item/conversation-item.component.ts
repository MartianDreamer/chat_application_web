import { Component, Input } from '@angular/core';
import {
  ATTACHMENT,
  Conversation,
  ConversationContent,
  MESSAGE,
} from '../../model/conversation';
import { FriendService } from '../../service/friend.service';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.css'],
})
export class ConversationItemComponent {
  @Input() conversation: Conversation | undefined;
  lastContent: ConversationContent | undefined;
  get ATTACHMENT() {
    return ATTACHMENT;
  }
  get MESSAGE() {
    return MESSAGE;
  }
  constructor(private friendService: FriendService) {}
}
