import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentFrameComponent } from './attachment-frame.component';

describe('AttachmentFrameComponent', () => {
  let component: AttachmentFrameComponent;
  let fixture: ComponentFixture<AttachmentFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttachmentFrameComponent]
    });
    fixture = TestBed.createComponent(AttachmentFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
