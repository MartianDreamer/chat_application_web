import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConversationContent, MESSAGE } from '../../model/conversation';
import { ConversationService } from '../../service/conversation.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-conversation-content',
  templateUrl: './conversation-content.component.html',
  styleUrls: ['./conversation-content.component.css'],
})
export class ConversationContentComponent implements OnInit, OnDestroy {
  contents: Array<ConversationContent> = [];
  private conversationSubscription: Subscription | undefined;
  private contentSubscription: Subscription | undefined;
  private isFinishLoading = false;

  constructor(
    private conversationService: ConversationService,
    private notificationService: NotificationService,
    private httpClient: HttpClient,
  ) {}

  ngOnDestroy(): void {
    this.contentSubscription?.unsubscribe();
    this.conversationSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.conversationSubscription =
      this.conversationService.currentConversationChange.subscribe((id) => {
        this.contents = [];
        this.isFinishLoading = false;
        this.loadMoreContent(id);
        this.contentSubscription?.unsubscribe();
        this.contentSubscription = this.conversationService
          .subscribeContent(id)
          .subscribe((content) => {
            this.notificationService
              .acknowledge(content.notificationId as string)
              .subscribe();
            this.conversationService.newNotification = false;
            this.contents.push(content);
          });
      });
    if (this.conversationService.currentConversation)
      this.loadMoreContent(this.conversationService.currentConversation);
  }

  loadMoreContent(id: string) {
    let params = new HttpParams().set('limit', 50);
    if (this.contents.length > 0) {
      params = params.set('timestamp', this.contents[0].dto.timestamp);
    }
    if (!this.isFinishLoading) {
      this.httpClient
        .get(`${environment.apiUrl}/rest/conversations/contents/${id}`, {
          params,
        })
        .subscribe((res: any) => {
          if (res.length === 0) {
            this.isFinishLoading = true;
            return;
          }
          res.reverse();
          this.contents = [...res, ...this.contents];
        });
    }
  }

  protected readonly MESSAGE = MESSAGE;

  scrollStart(e: any) {
    if (e.target.scrollTop === 0) {
      this.loadMoreContent(
        this.conversationService.currentConversation as string,
      );
    }
  }
}
