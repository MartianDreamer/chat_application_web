import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebsocketConnectService } from '../../service/websocket-connect.service';
import { environment } from '../../../../environments/environment';
import { ConversationService } from '../../service/conversation.service';
import { HttpClient } from '@angular/common/http';
import { Conversation } from '../../model/conversation';
import { FriendService } from '../../service/friend.service';
import { FriendRelationship } from '../../model/friend';
import { User } from '../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent implements OnInit {
  messageContent = '';
  @ViewChild('inputMessage') inputMessage: ElementRef | undefined;
  @ViewChild('inputImage') inputImage: ElementRef | undefined;
  currentConversation: Conversation | undefined;
  isRenaming = false;
  openSettings = false;
  addError = false;
  addedUsername = '';

  constructor(
    private wsService: WebsocketConnectService,
    private conversationService: ConversationService,
    private friendService: FriendService,
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  updateRows(e) {
    const val = e.target.value;
    const count = val.split('\n').length;
    e.target.rows = count < 5 ? count : 5;
  }

  enter(e) {
    e.preventDefault();
    this.messageContent = this.messageContent.trim();
    if (this.messageContent !== '') {
      this.wsService.send(
        `/app/conversations/${this.conversationService.currentConversation}`,
        this.messageContent,
      );
    }
    this.messageContent = '';
    if (this.inputMessage) this.inputMessage.nativeElement.rows = 1;
  }

  ngOnInit(): void {
    this.conversationService.currentConversationChange.subscribe((cur) => {
      this.currentConversation = this.conversationService.findConversation(cur);
    });
  }

  selectAttachment() {
    this.inputImage?.nativeElement.click();
  }

  sendAttachments(e: any) {
    const form = new FormData();
    for (let file of e.target.files) {
      if (!file.type.startsWith('image')) {
        alert('other types are not supported yet...');
        e.target.value = '';
        return;
      }
      form.append('file', file);
    }
    this.httpClient
      .post(
        `${environment.apiUrl}/rest/attachments/${this.conversationService.currentConversation}`,
        form,
      )
      .subscribe();
    e.target.value = '';
  }

  removeFromConversation(memberId: string) {
    this.httpClient
      .delete(
        `${environment.apiUrl}/rest/conversations/members/${this.currentConversation?.id}`,
        {
          body: [memberId],
        },
      )
      .subscribe(() => {
        if (this.currentConversation) {
          this.currentConversation.members =
            this.currentConversation.members.filter((e) => e.id !== memberId);
        }
      });
  }

  leave() {
    this.httpClient
      .post(
        `${environment.apiUrl}/rest/conversations/leave/${this.currentConversation?.id}`,
        {},
      )
      .subscribe(() => {
        this.conversationService.removeCurrentConversation();
        this.openSettings = false;
        this.router.navigateByUrl(
          `/app/c/${this.conversationService.Conversations[0]}`,
        );
      });
  }

  add() {
    let friendship: FriendRelationship | undefined =
      this.friendService.getFriendByUsername(this.addedUsername);
    while (!friendship && !this.friendService.loadFriendFinish) {
      this.friendService.loadMoreFriend();
      friendship = this.friendService.getFriendByUsername(this.addedUsername);
    }
    if (!friendship) {
      this.addError = true;
      setTimeout(() => {
        this.addError = false;
        this.addedUsername = '';
      }, 500);
      return;
    }
    this.httpClient
      .post(
        `${environment.apiUrl}/rest/conversations/members/${this.currentConversation?.id}`,
        [friendship?.friend.id],
      )
      .subscribe({
        next: () => {
          this.currentConversation?.members.push(friendship?.friend as User);
        },
        error: () => {
          this.addError = true;
          setTimeout(() => {
            this.addError = false;
            this.addedUsername = '';
          }, 500);
        },
      });
  }

  rename(e: any) {
    this.isRenaming = false;
    if (e.target.value !== '') {
      this.httpClient
        .patch(
          `${environment.apiUrl}/rest/conversations/${this.currentConversation?.id}`,
          e.target.value,
        )
        .subscribe(() => {
          if (this.currentConversation) {
            this.currentConversation.name = e.target.value;
          }
        });
    }
  }
}
