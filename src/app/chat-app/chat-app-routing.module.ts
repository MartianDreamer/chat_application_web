import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { ChatAppComponent } from './chat-app.component';
import { FriendshipListComponent } from './friend-list/friendship-list/friendship-list.component';
import { SearchListComponent } from './friend-list/search-list/search-list.component';
import { RequestListComponent } from './friend-list/request-list/request-list.component';

const routes: Routes = [
  {
    path: '',
    component: ChatAppComponent,
    children: [
      {
        path: '',
        redirectTo: '/app/c',
        pathMatch: 'full'
      },
      {
        path: 'c',
        component: ConversationListComponent,
      },
      {
        path: 'f',
        component: FriendListComponent,
        children: [
          {
            path: '',
            component: FriendshipListComponent
          },
          {
            path: 's/:username',
            component: SearchListComponent
          },
          {
            path: 'r',
            component: RequestListComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatAppRoutingModule { }
