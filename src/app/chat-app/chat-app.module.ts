import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {AvatarClickMenuComponent} from './avatar-click-menu/avatar-click-menu.component';
import {ChatAppRoutingModule} from './chat-app-routing.module';
import {ChatAppComponent} from './chat-app.component';
import {ChatBoxComponent} from './chat-box/chat-box.component';
import {ConversationContentComponent} from './chat-box/conversation-content/conversation-content.component';
import {UserInputComponent} from './chat-box/user-input/user-input.component';
import {ConversationItemComponent} from './conversation-list/conversation-item/conversation-item.component';
import {ConversationListComponent} from './conversation-list/conversation-list.component';
import {
  NewConversationFriendItemComponent
} from './conversation-list/new-conversation-friend-item/new-conversation-friend-item.component';
import {
  NewConversationFriendListComponent
} from './conversation-list/new-conversation-friend-list/new-conversation-friend-list.component';
import {AutoFocusDirective} from './directive/auto-focus.directive';
import {DraggableComponentDirective} from './directive/draggable-component.directive';
import {FriendItemComponent} from './friend-list/friend-item/friend-item.component';
import {FriendListComponent} from './friend-list/friend-list.component';
import {FriendshipListComponent} from './friend-list/friendship-list/friendship-list.component';
import {FromMeRequestComponent} from './friend-list/from-me-request/from-me-request.component';
import {RequestListComponent} from './friend-list/request-list/request-list.component';
import {SearchItemComponent} from './friend-list/search-item/search-item.component';
import {SearchListComponent} from './friend-list/search-list/search-list.component';
import {ToMeRequestItemComponent} from './friend-list/to-me-request-item/to-me-request-item.component';
import {ModalComponent} from './modal/modal.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FriendService} from './service/friend.service';
import {NotificationService} from './service/notification.service';
import {SelfService} from './service/self.service';
import {WebsocketConnectService} from './service/websocket-connect.service';
import {MyConversationsComponent} from './conversation-list/my-conversations/my-conversations.component';
import {DatePipe} from '../pipe/date.pipe';

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
    ToMeRequestItemComponent,
    SearchItemComponent,
    SearchListComponent,
    RequestListComponent,
    FriendshipListComponent,
    FromMeRequestComponent,
    ConversationItemComponent,
    DraggableComponentDirective,
    NewConversationFriendListComponent,
    NewConversationFriendItemComponent,
    MyConversationsComponent,
    DatePipe
  ],
  imports: [CommonModule, ChatAppRoutingModule, FormsModule],
  providers: [
    SelfService,
    FriendService,
    NotificationService,
    WebsocketConnectService
  ]
})
export class ChatAppModule {
}
