import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationItemComponent } from './conversation-item.component';

describe('ConversationItemComponent', () => {
  let component: ConversationItemComponent;
  let fixture: ComponentFixture<ConversationItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConversationItemComponent]
    });
    fixture = TestBed.createComponent(ConversationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
