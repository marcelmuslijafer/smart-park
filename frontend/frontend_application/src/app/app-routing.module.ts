import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { MapTabComponent } from './map-tab/map-tab.component';

const routes: Routes = [
  { path: '', redirectTo: '/parking', pathMatch: 'full' },
  { path: 'parking', component: MapTabComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
