import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Conversation} from '../model/conversation';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  addedUsers: Array<string> = [];
  private _conversations: Array<Conversation> = [];
  page = 0;
  size = 20;
  totalPages = 1;

  constructor(private httpClient: HttpClient) {
    this.loadMoreConversation();
  }


  get Conversations(): Array<Conversation> {
    return this._conversations;
  }

  loadMoreConversation() {
    if (this.page === this.totalPages) {
      return;
    }
    const params = new HttpParams()
      .set('page', this.page)
      .set('size', this.size);
    this.httpClient.get(`${environment.apiUrl}/rest/conversations`, {
      params
    }).subscribe((res: any) => {
      this._conversations.push(...res.content);
      this.totalPages = res.totalPages;
    });
  }

  addUserToAddedUser(id: string) {
    this.addedUsers.push(id);
  }

  removeFromAddedUser(id: string) {
    this.addedUsers = [...this.addedUsers.filter(e => e !== id)];
  }

  createConversation(name: string) {
    this.httpClient.put(`${environment.apiUrl}/rest/conversations`, {
      name,
      members: this.addedUsers
    }).subscribe({
        next: (res: any) => {
          this._conversations = [res, ...this._conversations];
          //TODO navigate to the just created conversation
        },
        error: (e: any) => {
          if (e.startsWith('conversation is existed ')) {
            e.replace('conversation is existed ', '');
            //TODO jump to the existed conversation
          }
        }
      }
    );
    this.addedUsers = [];
  }

  isAdded(id: string) {
    return this.addedUsers.includes(id);
  }
}
