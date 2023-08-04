import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatAppComponent } from './chat-app.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { NewConversationFriendListComponent } from './conversation-list/new-conversation-friend-list/new-conversation-friend-list.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { FriendshipListComponent } from './friend-list/friendship-list/friendship-list.component';
import { RequestListComponent } from './friend-list/request-list/request-list.component';
import { SearchListComponent } from './friend-list/search-list/search-list.component';
import { MyConversationsComponent } from './conversation-list/my-conversations/my-conversations.component';

const routes: Routes = [
  {
    path: '',
    component: ChatAppComponent,
    children: [
      {
        path: '',
        redirectTo: '/app/c',
        pathMatch: 'full',
      },
      {
        path: 'c',
        component: ConversationListComponent,
        children: [
          {
            path: '',
            component: MyConversationsComponent,
          },
          {
            path: 'n',
            component: NewConversationFriendListComponent,
          },
        ],
      },
      {
        path: 'f',
        component: FriendListComponent,
        children: [
          {
            path: '',
            component: FriendshipListComponent,
          },
          {
            path: 's/:username',
            component: SearchListComponent,
          },
          {
            path: 'r',
            component: RequestListComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatAppRoutingModule {}
