import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ATTACHMENT,
  Conversation,
  ConversationContent,
  MESSAGE,
} from '../../model/conversation';
import { FriendService } from '../../service/friend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConversationService } from '../../service/conversation.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.css'],
})
export class ConversationItemComponent implements OnInit, OnDestroy {
  @Input() public conversation: Conversation | undefined;
  lastContent: ConversationContent | undefined;
  activated = false;
  routeSubscription: Subscription | undefined;
  contentSubscription: Subscription | undefined;

  get MESSAGE() {
    return MESSAGE;
  }

  constructor(
    private friendService: FriendService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private conversationService: ConversationService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    if (this.conversation) {
      this.conversation.members.forEach((e) => {
        if (e.avatar) return;
        this.friendService.loadAvatar(e.id).subscribe((res: any) => {
          e.avatar = res.content;
        });
      });
      this.conversationService
        .getLatest(this.conversation.id)
        .subscribe((res: any) => {
          if (res.length > 0 && !this.lastContent) {
            this.lastContent = res[0] as ConversationContent;
            this.notificationService
              .isAcknowledged(this.lastContent.dto.id, this.lastContent.type)
              .subscribe((resp: any) => {
                if (this.lastContent) this.lastContent.read = !resp;
              });
          }
        });
      this.routeSubscription = this.activatedRoute.paramMap.subscribe(
        (param) => {
          const id = param.get('conversationId');
          this.activated = id === this.conversation?.id;
        },
      );
      this.contentSubscription =
        this.notificationService.ConversationObservable.subscribe((not) => {
          if (
            (not.type === MESSAGE || not.type === ATTACHMENT) &&
            not.content.to === this.conversation?.id
          ) {
            this.lastContent = {
              notificationId: not.id,
              type: not.type,
              dto: not.content,
              read:
                this.conversationService.currentConversation === not.content.to,
            };
            if (
              this.conversationService.currentConversation === not.content.to
            ) {
              this.notificationService.acknowledge(not.id as string);
              this.conversationService.newNotification = false;
            }
          }
        });
    }
  }

  onClick() {
    this.router.navigateByUrl(`/app/c/${this.conversation?.id}`);
    if (this.lastContent) this.lastContent.read = true;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.contentSubscription?.unsubscribe();
  }
}
