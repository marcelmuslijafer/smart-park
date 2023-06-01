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
  dataset: ChartData<'bar', { key: string; value: number }[]> | undefined;
  options: ChartOptions | undefined;
  dataSetSubscription!: Subscription;
  occupancyStatusSubscription!: Subscription;
  daysOfWeek: any;
  selectedOption: string = 'Monday';
  occupancyStatus: string = '';

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
          console.log(dataset);
        }
      );
    this.occupancyStatusSubscription = this.statisticsService
      .getOccupancyStatusSubject()
      .subscribe((occupancyStatus: string) => {
        this.occupancyStatus = occupancyStatus;
      });
    this.statisticsService.getNumberOfFreeParkingSpaces('start');
    this.options = this.statisticsService.getCanvasOptions();
    this.daysOfWeek = this.statisticsService.getDaysOfWeek();
  }

  onDayChanged(option: string) {
    this.statisticsService.getNumberOfFreeParkingSpaces(option);
  }
}
