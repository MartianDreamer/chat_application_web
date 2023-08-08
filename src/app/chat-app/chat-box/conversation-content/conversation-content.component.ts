import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConversationContent, MESSAGE } from '../../model/conversation';
import { ConversationService } from '../../service/conversation.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversation-content',
  templateUrl: './conversation-content.component.html',
  styleUrls: ['./conversation-content.component.css'],
})
export class ConversationContentComponent implements OnInit, OnDestroy {
  contents: Array<ConversationContent> = [];
  loadedConversationId = '';
  private conversationSubscription: Subscription | undefined;
  private contentSubscription: Subscription | undefined;

  constructor(
    private conversationService: ConversationService,
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
        this.loadMoreContent(id);
        this.contentSubscription = this.conversationService
          .subscribeContent(id)
          .subscribe((content) => this.contents.push(content));
      });
  }

  loadMoreContent(id: string) {
    if (this.loadedConversationId === id || !id) {
      return;
    }
    this.loadedConversationId = id;
    const params = new HttpParams().set('limit', 50);
    if (this.contents.length > 0) {
      params.set('timestamp', this.contents[0].dto.timestamp);
    }
    this.httpClient
      .get(`${environment.apiUrl}/rest/conversations/contents/${id}`, {
        params,
      })
      .subscribe((res: any) => {
        res.reverse();
        this.contents = [...res, ...this.contents];
      });
  }

  protected readonly MESSAGE = MESSAGE;
}
