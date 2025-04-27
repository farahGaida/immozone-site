import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForRentComponent } from './for-rent.component';

describe('ForRentComponent', () => {
  let component: ForRentComponent;
  let fixture: ComponentFixture<ForRentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForRentComponent]
    });
    fixture = TestBed.createComponent(ForRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
