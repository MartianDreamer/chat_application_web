import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent
  implements OnInit, OnDestroy
{
  @Input() content:
    | {
        title: string;
        content: string;
        dangerous: boolean;
      }
    | undefined;
  @Output() yesEmitter = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onClickYes() {
    this.yesEmitter.emit(true);
  }

  onClickNo() {
    this.yesEmitter.emit(false);
  }
}
