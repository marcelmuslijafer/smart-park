import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationInfoModalComponent } from './reservation-info-modal.component';

describe('ReservationInfoModalComponent', () => {
  let component: ReservationInfoModalComponent;
  let fixture: ComponentFixture<ReservationInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationInfoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
