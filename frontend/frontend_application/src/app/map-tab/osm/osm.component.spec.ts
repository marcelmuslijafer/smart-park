import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OSMComponent } from './osm.component';

describe('OSMComponent', () => {
  let component: OSMComponent;
  let fixture: ComponentFixture<OSMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OSMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OSMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
