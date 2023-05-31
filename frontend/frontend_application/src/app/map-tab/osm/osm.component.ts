import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

import { blueIcon, redIcon, greenIcon } from './markers';
import { MapTabService } from '../map-tab.service';
import { Subscription } from 'rxjs';
import { ParkingSpace } from '../map-tab.types';

@Component({
  selector: 'app-osm',
  templateUrl: './osm.component.html',
  styleUrls: ['./osm.component.css'],
})
export class OSMComponent implements OnInit, OnDestroy {
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  layers = [];

  parkingSpacesSubject: Subscription;

  constructor(private mapTabService: MapTabService) {}

  ngOnInit(): void {
    this.parkingSpacesSubject = this.mapTabService
      .getParkingSpacesSubject()
      .subscribe((parkingSpaces: ParkingSpace[]) => {
        for (let ps of parkingSpaces) {
          let markerIcon = redIcon;
          console.log("tu")
          if (!ps.taken) {
            markerIcon = ps.disabled ? blueIcon : greenIcon;
          }

          this.layers.push(
            Leaflet.marker({ lat: ps.lat, lng: ps.lng }, { icon: markerIcon })
          );
        }
      });

    setTimeout(() => {
      this.mapTabService.getParkingSpaces();
    }, 0);
  }

  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 18,
    minZoom: 7,
    maxZoom: 22,
    center: { lat: 45.800896, lng: 15.970451 },
  };

  onMapReady($event: Leaflet.Map) {
    this.map = $event;

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 22,
      maxNativeZoom: 19,
    }).addTo(this.map);
  }

  ngOnDestroy(): void {
    this.parkingSpacesSubject.unsubscribe();
  }

  // layers = [
  //   Leaflet.marker({ lat: 45.80095, lng: 15.970708 }, { icon: blueIcon }),
  //   Leaflet.marker({ lat: 45.800935, lng: 15.970574 }, { icon: greenIcon }),
  //   Leaflet.marker({ lat: 45.800922, lng: 15.970443 }, { icon: redIcon }),
  //   Leaflet.marker({ lat: 45.800912, lng: 15.970315 }, { icon: greenIcon }),
  //   Leaflet.marker({ lat: 45.80095, lng: 15.970708 }, { icon: blueIcon }),
  //   Leaflet.marker({ lat: 45.800935, lng: 15.970574 }, { icon: greenIcon }),
  //   Leaflet.marker({ lat: 45.800922, lng: 15.970443 }, { icon: redIcon }),
  //   Leaflet.marker({ lat: 45.800912, lng: 15.970315 }, { icon: greenIcon }),
  // ];
}
