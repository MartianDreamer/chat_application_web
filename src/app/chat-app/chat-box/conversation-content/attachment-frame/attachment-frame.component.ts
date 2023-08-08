import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AttachmentContent,
  ConversationContent,
} from '../../../model/conversation';
import { ConversationService } from '../../../service/conversation.service';
import { SelfService } from '../../../service/self.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-attachment-frame',
  templateUrl: './attachment-frame.component.html',
  styleUrls: ['./attachment-frame.component.css'],
})
export class AttachmentFrameComponent implements OnInit, AfterViewInit {
  @Input() message: ConversationContent | undefined;
  contents: Array<AttachmentContent> = [];
  @ViewChild('newAttachment') newAttachment: ElementRef | undefined;

  constructor(
    private conversationService: ConversationService,
    public selfService: SelfService,
    private httpClient: HttpClient,
  ) {}

  ngAfterViewInit(): void {
    this.newAttachment?.nativeElement.scrollIntoView();
  }

  get MessageAvatar() {
    const conversation = this.conversationService.getCurrentConversation();
    if (conversation) {
      const member = conversation.members.find(
        (e) => e.id === this.message?.dto.from,
      );
      return member?.avatar;
    }
    return undefined;
  }

  ngOnInit(): void {
    if (this.message) {
      this.httpClient
        .get(`${environment.apiUrl}/rest/attachments/${this.message.dto.id}`)
        .subscribe((res: any) => {
          this.contents = res;
        });
    }
  }
}
