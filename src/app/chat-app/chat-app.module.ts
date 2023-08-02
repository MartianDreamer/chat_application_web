import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatAppRoutingModule } from './chat-app-routing.module';
import { ChatAppComponent } from './chat-app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { UserInputComponent } from './chat-box/user-input/user-input.component';
import { ConversationContentComponent } from './chat-box/conversation-content/conversation-content.component';
import { FriendItemComponent } from './friend-list/friend-item/friend-item.component';
import { AvatarClickMenuComponent } from './avatar-click-menu/avatar-click-menu.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { FormsModule } from '@angular/forms';
import { AutoFocusDirective } from '../directive/auto-focus.directive';


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
    AutoFocusDirective
  ],
  imports: [
    CommonModule,
    ChatAppRoutingModule,
    FormsModule
  ]
})
export class ChatAppModule { }
