import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapTabService } from './map-tab.service';
import { Subscription } from 'rxjs';
import { ParkingSpace } from './map-tab.types';

@Component({
  selector: 'app-map-tab',
  templateUrl: './map-tab.component.html',
  styleUrls: ['./map-tab.component.css'],
})
export class MapTabComponent implements OnInit, OnDestroy {
  blueCircleNumber: number = 0;
  greenCircleNumber: number = 0;
  loadingSpinnerData = false;

  FreeParkingSpacesSubscription: Subscription;
  LoadingSpinnerSubscription: Subscription;

  constructor(private mapTabService: MapTabService) {}

  ngOnInit(): void {
    this.LoadingSpinnerSubscription = this.mapTabService
      .getLoadingSpinnerSubject()
      .subscribe((value) => {
        this.loadingSpinnerData = value;
      });

    this.FreeParkingSpacesSubscription = this.mapTabService
      .getParkingSpacesSubject()
      .subscribe((parkingSpace: ParkingSpace[]) => {
        this.blueCircleNumber = 0;
        this.greenCircleNumber = 0;

        parkingSpace.forEach((ps) => {
          if (!ps.taken && !ps.reserved) {
            if (ps.disabled) {
              this.blueCircleNumber++;
            } else {
              this.greenCircleNumber++;
            }
          }
        });
      });

    // this.mapTabService.getParkingSpaces();
    this.mapTabService.startPeriodicCalls();
  }

  ngOnDestroy(): void {
    this.FreeParkingSpacesSubscription.unsubscribe();
  }
}
