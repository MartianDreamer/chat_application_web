import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromMeRequestComponent } from './from-me-request.component';

describe('FromMeRequestComponent', () => {
  let component: FromMeRequestComponent;
  let fixture: ComponentFixture<FromMeRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FromMeRequestComponent]
    });
    fixture = TestBed.createComponent(FromMeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
