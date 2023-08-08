import { Component, OnInit } from '@angular/core';
import { SelfService } from '../service/self.service';
import { FriendService } from '../service/friend.service';
import { ConversationService } from '../service/conversation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  get newConversationNotification() {
    return this.conversationService.newNotification;
  }

  get newFriendNotification() {
    return this.friendService.ToMeRequest.length > 0;
  }

  get Self() {
    return this.selfService.Self;
  }

  get Image() {
    return this.selfService.Self?.avatar;
  }

  openAvatarClickMenu: boolean | undefined;
  clickLocation: any;
  openMyAccount: boolean | undefined;

  constructor(
    private selfService: SelfService,
    private friendService: FriendService,
    private conversationService: ConversationService,
  ) {
    this.friendService.subscribe();
    this.conversationService.subscribeConversation();
  }

  ngOnInit(): void {}

  onAvatarClick(e: MouseEvent) {
    this.openAvatarClickMenu = true;
    this.clickLocation = {
      left: `${e.clientX}px`,
      top: `${e.clientY}px`,
    };
  }

  closeOnAvatarClickMenu(e: boolean) {
    this.openAvatarClickMenu = e;
  }

  closeMyAccount(e: boolean) {
    this.openMyAccount = e;
  }

  renderMyAccount(e: boolean) {
    this.openMyAccount = e;
  }
}
