import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { StatisticsService } from './statistics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-statistics-tab',
  templateUrl: './statistics-tab.component.html',
  styleUrls: ['./statistics-tab.component.css'],
})
export class StatisticsTabComponent implements OnInit, OnDestroy {
  dataset: ChartData<'bar', { key: string; value: number }[]>;
  options: ChartOptions;
  dataSetSubscription: Subscription;

  constructor(private statisticsService: StatisticsService) {}

  ngOnDestroy(): void {
    this.dataSetSubscription.unsubscribe();
  }

  ngOnInit() {
    this.dataSetSubscription = this.statisticsService
      .getParkingSpaceStatisticsSubject()
      .subscribe(
        (dataset: ChartData<'bar', { key: string; value: number }[]>) => {
          this.dataset = dataset;
        }
      );
    this.statisticsService.getNumberOfFreeParkingSpaces();
    this.options = this.statisticsService.getCanvasOptions();
  }
}
