import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebsocketConnectService } from '../../service/websocket-connect.service';
import { environment } from '../../../../environments/environment';
import { ConversationService } from '../../service/conversation.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent implements OnInit {
  messageContent = '';
  @ViewChild('inputMessage') inputMessage: ElementRef | undefined;
  @ViewChild('inputImage') inputImage: ElementRef | undefined;

  constructor(
    private wsService: WebsocketConnectService,
    private conversationService: ConversationService,
    private httpClient: HttpClient,
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

  ngOnInit(): void {}

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
}
