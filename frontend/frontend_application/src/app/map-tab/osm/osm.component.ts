import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-osm',
  templateUrl: './osm.component.html',
  styleUrls: ['./osm.component.css'],
})
export class OSMComponent {
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];

  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 16,
    center: { lat: 28.626137, lng: 79.821603 },
  };

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
  }
}
