import { Injectable } from '@angular/core';
import { Subject, lastValueFrom, firstValueFrom } from 'rxjs';

import { ParkingSpace } from './map-tab.types';

@Injectable({
  providedIn: 'root',
})
export class MapTabService {
  private LOCAL_DEV = true;
  private apiUrl = 'SOME_URL';

  private parkingSpacesSubject: Subject<ParkingSpace[]> = new Subject<
    ParkingSpace[]
  >();

  constructor() {}

  /****************************************************
   *                 SUBJECTS                         *
   ****************************************************/
  getParkingSpacesSubject() {
    return this.parkingSpacesSubject.asObservable();
  }

  /****************************************************/
  async getParkingSpaces() {
    if (this.LOCAL_DEV) {
      this.parkingSpacesSubject.next(this.dummyFreeParkingSpaces);
      return;
    }

    // TODO -> get from mserver

    return;
  }

  dummyFreeParkingSpaces: ParkingSpace[] = [
    { lat: 45.80082, lng: 15.970744, taken: true, disabled: true },
    { lat: 45.800813, lng: 15.970691, taken: false, disabled: false },
    { lat: 45.800809, lng: 15.970632, taken: false, disabled: false },
    { lat: 45.800801, lng: 15.970562, taken: true, disabled: false },
    { lat: 45.800783, lng: 15.970468, taken: false, disabled: true },

    { lat: 45.800935, lng: 15.970574, taken: true, disabled: false },
    { lat: 45.800922, lng: 15.970443, taken: true, disabled: true },
    { lat: 45.800896, lng: 15.970247, taken: false, disabled: false },
    { lat: 45.800901, lng: 15.970306, taken: false, disabled: true },
  ];
}
