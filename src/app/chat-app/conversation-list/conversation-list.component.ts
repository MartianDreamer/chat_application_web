import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css'],
})
export class ConversationListComponent {
  constructor(private router: Router) {}

  newConversation() {
    this.router.navigateByUrl('/app/c/n');
  }
}
