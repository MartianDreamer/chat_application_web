import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements OnInit {
  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    window.setTimeout(() => {
      this.element.nativeElement.focus(); //For SSR (server side rendering) this is not safe. Use: https://github.com/angular/angular/issues/15008#issuecomment-285141070)
    });
  }
}
