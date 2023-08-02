import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarClickMenuComponent } from './avatar-click-menu.component';

describe('AvatarClickMenuComponent', () => {
  let component: AvatarClickMenuComponent;
  let fixture: ComponentFixture<AvatarClickMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarClickMenuComponent]
    });
    fixture = TestBed.createComponent(AvatarClickMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
