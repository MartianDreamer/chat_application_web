import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ConversationService } from '../service/conversation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css'],
})
export class ConversationListComponent implements OnInit, OnDestroy {
  mode: 'CONVERSATION' | 'CREATE' = 'CONVERSATION';
  newConversationName: string = '';
  conversationSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private conversationService: ConversationService,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        const id = e.url.substring(e.url.lastIndexOf('/') + 1);
        if (id.length === 36 && e.url.startsWith('/app/c')) {
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
            this.conversationService.currentConversation = res;
          });
        });
      if (this.conversationService.currentConversation) {
        this.router.navigateByUrl(
          `/app/c/${this.conversationService.currentConversation}`,
        );
      }
    }
    this.conversationSubscription = this.conversationService.subscribeConversation();
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

  ngOnDestroy(): void {
    this.conversationSubscription?.unsubscribe();
  }
}
