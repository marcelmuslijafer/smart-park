import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OSMComponent } from './map-tab/osm/osm.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapTabComponent } from './map-tab/map-tab.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StatisticsTabComponent } from './statistics-tab/statistics-tab.component';
import { NgChartsModule } from 'ng2-charts';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ConfirmReservationModalComponent } from './map-tab/osm/confirm-reservation-modal/confirm-reservation-modal.component';
import { ReservationInfoModalComponent } from './map-tab/osm/reservation-info-modal/reservation-info-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MapTabComponent,
    NavigationTabsComponent,
    OSMComponent,
    StatisticsTabComponent,
    ConfirmReservationModalComponent,
    ReservationInfoModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    LeafletModule,
    NgChartsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
