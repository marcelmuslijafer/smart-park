import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Leaflet from 'leaflet';

import { blueIcon, redIcon, greenIcon, yellowIcon } from './markers';
import { MapTabService } from '../map-tab.service';
import { Subscription } from 'rxjs';
import { ParkingSpace } from '../map-tab.types';
import { ReservationInfoModalComponent } from './reservation-info-modal/reservation-info-modal.component';
import { ConfirmReservationModalComponent } from './confirm-reservation-modal/confirm-reservation-modal.component';

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

  constructor(
    private zone: NgZone,
    private mapTabService: MapTabService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.parkingSpacesSubject = this.mapTabService
      .getParkingSpacesSubject()
      .subscribe((parkingSpaces: ParkingSpace[]) => {
        this.layers = [];

        for (let ps of parkingSpaces) {
          let markerIcon = redIcon;
          // console.log('tu');
          if (ps.reserved) {
            markerIcon = yellowIcon;
          } else if (!ps.taken) {
            markerIcon = ps.disabled ? blueIcon : greenIcon;
          }

          this.layers.push(
            Leaflet.marker(
              { lat: ps.lat, lng: ps.lng },
              { icon: markerIcon }
            ).on('click', (e) => {
              this.zone.run(() => this.onMarkerClick(ps));
            })
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

  onMarkerClick(parkingSpace: ParkingSpace): void {
    if (parkingSpace.taken) {
      console.log('Mjesto je popunjeno i ne može se rezervirati!');
      this.openInfoModal('Mjesto je popunjeno i ne može se rezervirati!');
      return;
    }

    if (parkingSpace.reserved) {
      console.log('Mjesto je već rezervirano, otkazati rezervaciju!');
      this.openConfirmationModal(
        'Mjesto je rezervirano, želite li otkazati rezervaciju? ' +
          parkingSpace.id,
        parkingSpace.id,
        true
      );
      return;
    }

    console.log('Rezerviraj senzor: ', parkingSpace.id);
    this.openConfirmationModal(
      'Želite li rezervirati parkirno mjesto? ' + parkingSpace.id,
      parkingSpace.id,
      false
    );

    return;
  }

  async openConfirmationModal(
    content: string,
    parkingSpaceId: string,
    unreserve: boolean
  ) {
    const dialogRef = this.dialog.open(ConfirmReservationModalComponent, {
      height: 'auto',
      data: {
        title: 'Informacije',
        content: content,
        returnData: {
          parkingSpaceId: parkingSpaceId,
        },
      },
    });

    dialogRef.afterClosed().subscribe(async (returnedData) => {
      if (returnedData) {
        console.log('Rezerviraj mi: ', returnedData.parkingSpaceId);
        let result = await this.mapTabService.reserveOrUnreserveParkingSpace(
          returnedData.parkingSpaceId,
          unreserve
        );

        if (result) {
          if (!unreserve) {
            this.openInfoModal('Uspješna rezervacija mjesta.');
          } else {
            this.openInfoModal('Uspješno otkazana rezervacija.');
          }
          this.mapTabService.getParkingSpaces();
        } else {
          this.openInfoModal('Nismo uspjeli obraditi vaš zahtjev.');
        }
      } else {
        console.log('Otkazana rezervacija.');
      }
    });
  }

  openInfoModal(content: string): void {
    console.log('Otvaram');
    const dialogRef = this.dialog.open(ReservationInfoModalComponent, {
      width: '400px',
      data: {
        title: 'Informacije',
        content: content,
      },
    });
  }

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
