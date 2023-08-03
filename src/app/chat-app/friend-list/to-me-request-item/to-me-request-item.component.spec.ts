import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToMeRequestItemComponent } from './to-me-request-item.component';

describe('ToMeRequestItemComponent', () => {
  let component: ToMeRequestItemComponent;
  let fixture: ComponentFixture<ToMeRequestItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToMeRequestItemComponent]
    });
    fixture = TestBed.createComponent(ToMeRequestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
