import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DraggableComponent } from '../draggable.component';

let previousX: string | undefined;
let previousY: string | undefined;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent
  extends DraggableComponent
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
    this.componentStyle = {
      position: 'absolute',
      left: previousX ? previousX : `${window.innerWidth / 2.5}px`,
      top: previousY ? previousY : `${window.innerHeight / 2.5}px`,
    };
  }

  ngOnDestroy(): void {
    previousX = this.componentStyle.left;
    previousY = this.componentStyle.top;
  }

  onClickYes() {
    this.yesEmitter.emit(true);
  }

  onClickNo() {
    this.yesEmitter.emit(false);
  }
}
