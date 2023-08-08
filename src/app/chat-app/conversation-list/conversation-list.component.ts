import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationSkipped, Router } from '@angular/router';
import { ConversationService } from '../service/conversation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css'],
})
export class ConversationListComponent implements OnInit {
  mode: 'CONVERSATION' | 'CREATE' = 'CONVERSATION';
  newConversationName: string = '';
  conversationSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private conversationService: ConversationService,
  ) {}

  ngOnInit(): void {
    this.conversationService.newNotification = false;
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd || e instanceof NavigationSkipped) {
        const id = e.url.substring(e.url.lastIndexOf('/') + 1);
        if (
          id.length === 36 &&
          e.url.startsWith('/app/c') &&
          id !== this.conversationService.currentConversation
        ) {
          this.conversationService.currentConversation = id;
        }
      }
    });
    if (this.router.url.endsWith('/c/n')) {
      this.mode = 'CREATE';
    } else {
      this.mode = 'CONVERSATION';
      const conversationLoaded =
        this.conversationService.ConversationLoaded.subscribe((res) => {
          this.router.navigateByUrl(`/app/c/${res}`).then(() => {
            conversationLoaded.unsubscribe();
          });
        });
      if (this.conversationService.currentConversation) {
        this.router.navigateByUrl(
          `/app/c/${this.conversationService.currentConversation}`,
        );
      }
    }
  }

  newConversation() {
    switch (this.mode) {
      case 'CONVERSATION':
        this.router.navigateByUrl('/app/c/n').then(() => {
          this.mode = 'CREATE';
        });
        break;
      case 'CREATE':
        this.router
          .navigateByUrl(
            `/app/c/${this.conversationService.currentConversation}`,
          )
          .then(() => {
            this.mode = 'CONVERSATION';
          });
    }
  }

  createConversation() {
    if (this.newConversationName !== '') {
      this.conversationService.createConversation(this.newConversationName);
    }
    this.newConversationName = '';
  }
}
