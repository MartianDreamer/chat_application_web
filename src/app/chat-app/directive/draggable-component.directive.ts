import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appDraggableComponent]',
})
export class DraggableComponentDirective implements OnInit, OnDestroy {
  distance = {
    x: 0,
    y: 0,
  };

  drag = (e) => {
    if (e.clientX !== 0 && e.clientY !== 0) {
      this.element.nativeElement.style.left = `${
        e.clientX - this.distance.x
      }px`;
      this.element.nativeElement.style.top = `${e.clientY - this.distance.y}px`;
    }
  };

  dragstart = (e) => {
    const curentPos = this.element.nativeElement.getBoundingClientRect();
    this.distance.x = e.clientX - curentPos.x;
    this.distance.y = e.clientY - curentPos.y;
  };

  mousedown = () => {
    const curentPos = this.element.nativeElement.getBoundingClientRect();
    this.element.nativeElement.style.removeProperty('transform');
    this.element.nativeElement.style.top = `${curentPos.top}px`;
    this.element.nativeElement.style.left = `${curentPos.left}px`;
    this.element.nativeElement.removeEventListener('mousedown', this.mousedown);
  };

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.element.nativeElement.style.position = 'fixed';
    this.element.nativeElement.style['z-index'] = 1000;
    this.element.nativeElement.style.top = '50%';
    this.element.nativeElement.style.left = '50%';
    this.element.nativeElement.style.transform = 'translate(-50%, -50%)';
    this.element.nativeElement.addEventListener('mousedown', this.mousedown);
    this.element.nativeElement.addEventListener('dragstart', this.dragstart);
    this.element.nativeElement.addEventListener('drag', this.drag);
  }

  ngOnDestroy(): void {
    this.element.nativeElement.removeEventListener('drag', this.drag);
  }
}
