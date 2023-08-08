import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFrameComponent } from './message-frame.component';

describe('MessageFrameComponent', () => {
  let component: MessageFrameComponent;
  let fixture: ComponentFixture<MessageFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageFrameComponent]
    });
    fixture = TestBed.createComponent(MessageFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
