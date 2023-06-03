import { Injectable } from '@angular/core';
import { Subject, lastValueFrom } from 'rxjs';

import { ParkingSpace } from './map-tab.types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapTabService {
  private LOCAL_DEV = true;
  private apiUrl = 'http://localhost:3000/';

  private parkingSpacesSubject: Subject<ParkingSpace[]> = new Subject<
    ParkingSpace[]
  >();

  constructor(private http: HttpClient) {}

  /****************************************************
   *                 SUBJECTS                         *
   ****************************************************/
  getParkingSpacesSubject() {
    return this.parkingSpacesSubject.asObservable();
  }

  /****************************************************/
  async getParkingSpaces() {
    if (!this.LOCAL_DEV) {
      this.parkingSpacesSubject.next(this.dummyFreeParkingSpaces);
      return;
    }

    try {
      let toPromise = this.http.get<ParkingSpace[]>(
        this.apiUrl + 'getParkingSpacesData'
      );
      const responseLastValue = await lastValueFrom(toPromise);

      console.log('responseLastValue:', responseLastValue);
      this.parkingSpacesSubject.next(responseLastValue);
    } catch (error) {
      console.error('Error:', error);
    }

    return;
  }

  dummyFreeParkingSpaces: ParkingSpace[] = [
    {
      id: '1',
      lat: 45.80082,
      lng: 15.970744,
      taken: true,
      disabled: true,
      reserved: false,
    },
    {
      id: '2',
      lat: 45.800813,
      lng: 15.970691,
      taken: false,
      disabled: false,
      reserved: false,
    },
    {
      id: '3,',
      lat: 45.800809,
      lng: 15.970632,
      taken: false,
      disabled: false,
      reserved: false,
    },
    {
      id: '4',
      lat: 45.800801,
      lng: 15.970562,
      taken: true,
      disabled: false,
      reserved: false,
    },
    {
      id: '5',
      lat: 45.800783,
      lng: 15.970468,
      taken: false,
      disabled: true,
      reserved: false,
    },

    {
      id: '6',
      lat: 45.800935,
      lng: 15.970574,
      taken: true,
      disabled: false,
      reserved: false,
    },
    {
      id: '7',
      lat: 45.800922,
      lng: 15.970443,
      taken: true,
      disabled: true,
      reserved: false,
    },
    {
      id: '8',
      lat: 45.800896,
      lng: 15.970247,
      taken: false,
      disabled: false,
      reserved: false,
    },
    {
      id: '9',
      lat: 45.800901,
      lng: 15.970306,
      taken: false,
      disabled: true,
      reserved: true,
    },
  ];
}
