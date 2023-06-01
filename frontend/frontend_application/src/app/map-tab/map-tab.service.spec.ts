import { TestBed } from '@angular/core/testing';

import { MapTabService } from './map-tab.service';

describe('MapTabService', () => {
  let service: MapTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
