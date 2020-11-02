import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalModalComponent } from './rental-modal.component';

describe('RentalModalComponent', () => {
  let component: RentalModalComponent;
  let fixture: ComponentFixture<RentalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
