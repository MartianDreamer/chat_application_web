import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConversationFriendListComponent } from './new-conversation-friend-list.component';

describe('NewConversationFriendListComponent', () => {
  let component: NewConversationFriendListComponent;
  let fixture: ComponentFixture<NewConversationFriendListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewConversationFriendListComponent]
    });
    fixture = TestBed.createComponent(NewConversationFriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
