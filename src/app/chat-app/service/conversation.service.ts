import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Conversation, ConversationContent } from '../model/conversation';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import {
  AppNotification,
  ATTACHMENT,
  MESSAGE,
  NEW_CONVERSATION,
} from '../model/notification';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private _currentConversation: string | undefined;
  addedUsers: Array<string> = [];
  private _conversations: Array<Conversation> = [];
  private _conversationLoaded = new Subject<string>();
  private _currentConversationChange = new Subject<string>();
  page = 0;
  size = 20;
  totalPages = 1;
  private _newNotification = false;

  get newNotification(): boolean {
    return this._newNotification;
  }

  set newNotification(value: boolean) {
    this._newNotification = value;
  }

  get ConversationLoaded() {
    return this._conversationLoaded.asObservable();
  }

  get currentConversation(): string | undefined {
    return this._currentConversation;
  }

  get currentConversationChange() {
    return this._currentConversationChange.asObservable();
  }

  set currentConversation(value: string | undefined) {
    this._currentConversationChange.next(value as string);
    this._currentConversation = value;
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  get Conversations(): Array<Conversation> {
    return this._conversations;
  }

  removeCurrentConversation() {
    this._conversations = this._conversations.filter(
      (e) => e.id !== this.currentConversation,
    );
  }

  loadMoreConversation() {
    if (this.page === this.totalPages) {
      return;
    }
    const params = new HttpParams()
      .set('page', this.page)
      .set('size', this.size);
    this.httpClient
      .get(`${environment.apiUrl}/rest/conversations`, {
        params,
      })
      .subscribe((res: any) => {
        this._conversations.push(...res.content);
        this.totalPages = res.totalPages;
        if (this._conversations.length > 0) {
          this._conversationLoaded.next(this._conversations[0].id);
        }
      });
  }

  addUserToAddedUser(id: string) {
    this.addedUsers.push(id);
  }

  removeFromAddedUser(id: string) {
    this.addedUsers = [...this.addedUsers.filter((e) => e !== id)];
  }

  createConversation(name: string) {
    this.httpClient
      .put(`${environment.apiUrl}/rest/conversations`, {
        name,
        members: this.addedUsers,
      })
      .subscribe({
        next: (res: any) => {
          this.router.navigateByUrl(`/app/c/${res.id}`);
        },
        error: (e: any) => {
          if (e.error.startsWith('conversation is existed ')) {
            const id = e.error.replace('conversation is existed ', '');
            let conversation = this.findConversation(id);
            if (conversation) {
              this.router.navigateByUrl(`/app/c/${id}`);
            } else {
              this.httpClient
                .get(`${environment.apiUrl}/rest/conversations/${id}`)
                .subscribe((conv: any) => {
                  this._conversations = [conv, ...this._conversations];
                  this.router.navigateByUrl(`/app/c/${id}`);
                });
            }
          }
        },
      });
    this.addedUsers = [];
  }

  isAdded(id: string) {
    return this.addedUsers.includes(id);
  }

  findConversation(id: string) {
    return this._conversations.find((e) => e.id === id);
  }

  subscribeConversation() {
    return this.notificationService.ConversationObservable.subscribe((res) => {
      this.handleNotification(res);
    });
  }

  handleNotification(not: AppNotification) {
    this._newNotification = true;
    if (not.type === NEW_CONVERSATION) {
      this._conversations = [not.content, ...this._conversations];
    } else {
      const latest = this._conversations.find((e) => e.id === not.content.to);
      if (latest)
        this._conversations = [
          latest,
          ...this._conversations.filter((e) => e !== latest),
        ];
    }
  }

  getLatest(id: string) {
    return this.httpClient.get(
      `${environment.apiUrl}/rest/conversations/latest/${id}`,
    );
  }

  subscribeContent(conversationId: string) {
    const subject = new Subject<ConversationContent>();
    this.notificationService.ConversationObservable.subscribe((mes) => {
      let type: 'ATTACHMENT' | 'MESSAGE';
      if (mes.type === ATTACHMENT) type = ATTACHMENT;
      else if (mes.type === MESSAGE) type = MESSAGE;
      else return;
      if (mes.content.to === conversationId) {
        subject.next({
          notificationId: mes.id,
          type,
          dto: mes.content,
          read: true,
        });
      }
    });
    return subject.asObservable();
  }

  getCurrentConversation() {
    return this._conversations.find((e) => e.id === this.currentConversation);
  }
}
