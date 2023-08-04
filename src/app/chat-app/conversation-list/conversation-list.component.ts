import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConversationService} from '../service/conversation.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css'],
})
export class ConversationListComponent implements OnInit {
  mode: 'CONVERSATION' | 'CREATE' = 'CONVERSATION';
  newConversationName: string = '';

  constructor(private router: Router, private conversationService: ConversationService) {
  }

  ngOnInit(): void {
    if (this.router.url.endsWith('/c')) {
      this.mode = 'CONVERSATION';
    } else {
      this.mode = 'CREATE';
    }
  }

  newConversation() {
    switch (this.mode) {
      case 'CONVERSATION':
        this.router.navigateByUrl('/app/c/n');
        this.mode = 'CREATE';
        break;
      case 'CREATE':
        this.router.navigateByUrl('/app/c');
        this.mode = 'CONVERSATION';
    }
  }

  createConversation() {
    if (this.newConversationName !== '') {
      this.conversationService.createConversation(this.newConversationName);
    }
  }
}
