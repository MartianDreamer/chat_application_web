import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ConversationContent } from '../../../model/conversation';
import { ConversationService } from '../../../service/conversation.service';
import { SelfService } from '../../../service/self.service';

@Component({
  selector: 'app-message-frame',
  templateUrl: './message-frame.component.html',
  styleUrls: ['./message-frame.component.css'],
})
export class MessageFrameComponent implements AfterViewInit {
  @Input() message: ConversationContent | undefined;
  @ViewChild('newMessage') newMessage: ElementRef | undefined;

  constructor(
    private conversationService: ConversationService,
    public selfService: SelfService,
  ) {}

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

  ngAfterViewInit(): void {
    this.newMessage?.nativeElement.scrollIntoView();
  }
}
