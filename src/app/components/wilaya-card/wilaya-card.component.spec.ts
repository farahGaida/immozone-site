import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilayaCardComponent } from './wilaya-card.component';

describe('WilayaCardComponent', () => {
  let component: WilayaCardComponent;
  let fixture: ComponentFixture<WilayaCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WilayaCardComponent]
    });
    fixture = TestBed.createComponent(WilayaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
