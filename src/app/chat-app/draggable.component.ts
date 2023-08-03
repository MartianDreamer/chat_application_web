import { Component } from '@angular/core';

@Component({
  template: '',
})
export class DraggableComponent {
  componentStyle = {
    position: 'absolute',
    left: `${window.innerWidth / 2.5}px`,
    top: `${window.innerHeight / 2.5}px`,
  };
  mouseDragStartLocation: any;

  onDragStart(e: MouseEvent) {
    this.mouseDragStartLocation = {
      left: e.clientX,
      top: e.clientY,
    };
  }

  onDragEnd(e: MouseEvent) {
    e.preventDefault();
    const dragDistance = {
      left: e.clientX - this.mouseDragStartLocation.left,
      top: e.clientY - this.mouseDragStartLocation.top,
    };
    const oldLeft = Number.parseFloat(
      this.componentStyle.left.replace('px', '')
    );
    const newLeft = oldLeft + dragDistance.left;
    const oldTop = Number.parseFloat(this.componentStyle.top.replace('px', ''));
    const newTop = oldTop + dragDistance.top;
    this.componentStyle = {
      ...this.componentStyle,
      left: `${newLeft}px`,
      top: `${newTop}px`,
    };
  }
}
