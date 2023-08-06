import {Component} from '@angular/core';
import {ConversationService} from '../../service/conversation.service';

@Component({
  selector: 'app-my-conversations',
  templateUrl: './my-conversations.component.html',
  styleUrls: ['./my-conversations.component.css']
})
export class MyConversationsComponent {
  constructor(public conversationService: ConversationService) {
  }

}
