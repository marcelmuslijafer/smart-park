import { Injectable } from '@angular/core';
import { Subject, lastValueFrom, firstValueFrom } from 'rxjs';

import { FreeParkingSpaces } from './map-tab.types';

@Injectable({
  providedIn: 'root',
})
export class MapTabService {
  private LOCAL_DEV = true;
  private apiUrl = 'SOME_URL';

  private freeParkingSpacesSubject: Subject<FreeParkingSpaces> =
    new Subject<FreeParkingSpaces>();

  constructor() {}

  /****************************************************
   *                 SUBJECTS                         *
   ****************************************************/
  getFreeParkingSpacesSubject() {
    return this.freeParkingSpacesSubject.asObservable();
  }

  /****************************************************/
  async getNumberOfFreeParkingSpaces() {
    if (this.LOCAL_DEV) {
      this.freeParkingSpacesSubject.next(this.dummyFreeParkingSpaces);
      return;
    }

    // TODO -> get from mserver

    return;
  }

  dummyFreeParkingSpaces: FreeParkingSpaces = {
    normalParkingSpacesCount: 15,
    disabledParkingSpacesCount: 5,
  };
}
