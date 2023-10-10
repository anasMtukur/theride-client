import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeDriverComponent } from './become-driver.component';

describe('BecomeDriverComponent', () => {
  let component: BecomeDriverComponent;
  let fixture: ComponentFixture<BecomeDriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BecomeDriverComponent]
    });
    fixture = TestBed.createComponent(BecomeDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
