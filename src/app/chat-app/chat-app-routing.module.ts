import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { ChatAppComponent } from './chat-app.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatAppRoutingModule { }
