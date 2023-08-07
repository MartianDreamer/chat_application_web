import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsocketConnectService } from '../../service/websocket-connect.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent implements OnInit {
  id: string | undefined;
  messageContent = '';
  @ViewChild('inputMessage') inputMessage: ElementRef | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private wsService: WebsocketConnectService,
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
        `${environment.apiUrl}/app/conversations/${this.id}`,
        this.messageContent,
      );
    }
    this.messageContent = '';
    if (this.inputMessage) this.inputMessage.nativeElement.rows = 1;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('conversationId') as string;
    });
  }
}
