import { Component, OnInit } from '@angular/core';
import { ConversationContent } from '../../model/conversation';
import { ConversationService } from '../../service/conversation.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-conversation-content',
  templateUrl: './conversation-content.component.html',
  styleUrls: ['./conversation-content.component.css'],
})
export class ConversationContentComponent implements OnInit {
  contents: Array<ConversationContent> = [];
  loadedConversationId = '';

  constructor(
    private conversationService: ConversationService,
    private httpClient: HttpClient,
  ) {}

  ngOnInit(): void {
    this.conversationService.currentConversationChange.subscribe((id) => {
      this.loadMoreContent(id);
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
        this.contents.push(...res);
      });
  }
}
