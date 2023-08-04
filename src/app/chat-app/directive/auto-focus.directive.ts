import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements OnInit {
  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    window.setTimeout(() => {
      this.element.nativeElement.focus(); 
    });
  }
}
