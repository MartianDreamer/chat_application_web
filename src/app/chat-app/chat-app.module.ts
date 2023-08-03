import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AutoFocusDirective } from '../directive/auto-focus.directive';
import { AvatarClickMenuComponent } from './avatar-click-menu/avatar-click-menu.component';
import { ChatAppRoutingModule } from './chat-app-routing.module';
import { ChatAppComponent } from './chat-app.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ConversationContentComponent } from './chat-box/conversation-content/conversation-content.component';
import { UserInputComponent } from './chat-box/user-input/user-input.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { FriendItemComponent } from './friend-list/friend-item/friend-item.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { ModalComponent } from './modal/modal.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FriendService } from './service/friend.service';
import { NotificationService } from './service/notification.service';
import { SelfService } from './service/self.service';
import { DraggableComponent } from './draggable.component';
import { ToMeRequestItemComponent } from './friend-list/to-me-request-item/to-me-request-item.component';

@NgModule({
  declarations: [
    ChatAppComponent,
    NavbarComponent,
    FriendListComponent,
    ConversationListComponent,
    ChatBoxComponent,
    UserInputComponent,
    ConversationContentComponent,
    FriendItemComponent,
    AvatarClickMenuComponent,
    MyAccountComponent,
    AutoFocusDirective,
    ModalComponent,
    DraggableComponent,
    ToMeRequestItemComponent
  ],
  imports: [CommonModule, ChatAppRoutingModule, FormsModule],
  providers: [
    SelfService,
    FriendService,
    NotificationService
  ]
})
export class ChatAppModule {}
