import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapTabService } from './map-tab.service';
import { Subscription } from 'rxjs';
import { FreeParkingSpaces } from './map-tab.types';

@Component({
  selector: 'app-map-tab',
  templateUrl: './map-tab.component.html',
  styleUrls: ['./map-tab.component.css'],
})
export class MapTabComponent implements OnInit, OnDestroy {
  blueCircleNumber;
  greenCircleNumber;

  FreeParkingSpacesSubscription: Subscription;

  constructor(private mapTabService: MapTabService) {}

  ngOnInit(): void {
    this.FreeParkingSpacesSubscription = this.mapTabService
      .getFreeParkingSpacesSubject()
      .subscribe((noOfSpaces: FreeParkingSpaces) => {
        this.blueCircleNumber = noOfSpaces.normalParkingSpacesCount;
        this.greenCircleNumber = noOfSpaces.disabledParkingSpacesCount;
      });

    this.mapTabService.getNumberOfFreeParkingSpaces();
  }

  ngOnDestroy(): void {
    this.FreeParkingSpacesSubscription.unsubscribe();
  }
}
