import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConversationFriendItemComponent } from './new-conversation-friend-item.component';

describe('NewConversationFriendItemComponent', () => {
  let component: NewConversationFriendItemComponent;
  let fixture: ComponentFixture<NewConversationFriendItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewConversationFriendItemComponent]
    });
    fixture = TestBed.createComponent(NewConversationFriendItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
