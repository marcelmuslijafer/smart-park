import { Injectable } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private local_dev = true;

  private options: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  
  private parkingSpaceStatisticsSubject: Subject<
    ChartData<'bar', { key: string; value: number }[]>
  > = new Subject<ChartData<'bar', { key: string; value: number }[]>>();

  constructor() {}

  getParkingSpaceStatisticsSubject() {
    return this.parkingSpaceStatisticsSubject.asObservable();
  }

  getCanvasOptions() {
    return this.options;
  }

  async getNumberOfFreeParkingSpaces() {
    if (this.local_dev) {
      this.parkingSpaceStatisticsSubject.next(this.datasets);
      return;
    }

    // TODO -> get from mserver

    return;
  }

  datasets: ChartData<'bar', { key: string; value: number }[]> = {
    datasets: [
      {
        data: [
          { key: '1', value: 20 },
          { key: '2', value: 15 },
          { key: '3', value: 11 },
          { key: '4', value: 12 },
          { key: '5', value: 14 },
          { key: '6', value: 5 },
          { key: '7', value: 6 },
          { key: '8', value: 7 },
          { key: '9', value: 15 },
          { key: '10', value: 19 },
          { key: '11', value: 2 },
          { key: '12', value: 1 },
          { key: '13', value: 3 },
          { key: '14', value: 6 },
          { key: '15', value: 12 },
          { key: '16', value: 15 },
          { key: '17', value: 16 },
          { key: '18', value: 5 },
          { key: '19', value: 18 },
          { key: '20', value: 2 },
          { key: '21', value: 11 },
          { key: '22', value: 10 },
          { key: '23', value: 11 },
          { key: '24', value: 14 },
        ],
        parsing: {
          xAxisKey: 'key',
          yAxisKey: 'value',
        },
      },
    ],
  };
}
