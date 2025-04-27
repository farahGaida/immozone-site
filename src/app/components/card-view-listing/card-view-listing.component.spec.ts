import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewListingComponent } from './card-view-listing.component';

describe('CardViewListingComponent', () => {
  let component: CardViewListingComponent;
  let fixture: ComponentFixture<CardViewListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardViewListingComponent]
    });
    fixture = TestBed.createComponent(CardViewListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
