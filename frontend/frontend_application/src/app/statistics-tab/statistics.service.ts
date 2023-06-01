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
      tooltip: {
        enabled: false,
      },
    },
  };

  private daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  private parkingSpaceStatisticsSubject: Subject<
    ChartData<'bar', { key: string; value: number }[]>
  > = new Subject<ChartData<'bar', { key: string; value: number }[]>>();

  private occupancyStatusSubject: Subject<string> = new Subject<string>();

  constructor() {}

  getParkingSpaceStatisticsSubject() {
    return this.parkingSpaceStatisticsSubject.asObservable();
  }

  getOccupancyStatusSubject() {
    return this.occupancyStatusSubject.asObservable();
  }

  getCanvasOptions() {
    return this.options;
  }

  async getOccupancyStatus(
    dataset: ChartData<'bar', { key: string; value: number }[]>
  ) {
    this.occupancyStatusSubject.next('Occupancy is moderate at this time');
    console.log(dataset.datasets[0].data);
    var currentHours = new Date().getHours();
    var maxValue = 0;
    var currentHourValue = 0;
    dataset.datasets[0].data.forEach((data) => {
      if (data.value > maxValue) {
        maxValue = data.value
      }
      if(parseInt(data.key) == currentHours) {
        currentHourValue = data.value;
      }
    })
    if(currentHourValue/maxValue < 0.2) {
      this.occupancyStatusSubject.next('Occupancy is very low at this time');
    } else if(currentHourValue/maxValue < 0.4) {
      this.occupancyStatusSubject.next('Occupancy is low at this time');
    } else if(currentHourValue/maxValue < 0.6) {
      this.occupancyStatusSubject.next('Occupancy is moderate at this time');
    } else if(currentHourValue/maxValue < 0.8) {
      this.occupancyStatusSubject.next('Occupancy is high at this time');
    } else {
      this.occupancyStatusSubject.next('Occupancy is very high at this time');
    }
    return;
  }

  async getNumberOfFreeParkingSpaces(day: string) {
    if (day == 'start') {
      this.parkingSpaceStatisticsSubject.next(this.datasetsStart);
      this.getOccupancyStatus(this.datasetsStart);
      return;
    }
    if (this.local_dev) {
      if (day == 'Monday') {
        this.parkingSpaceStatisticsSubject.next(this.datasetsMonday);
        this.getOccupancyStatus(this.datasetsMonday);
      } else if (day == 'Wednesday') {
        this.parkingSpaceStatisticsSubject.next(this.datasetsWednesday);
        this.getOccupancyStatus(this.datasetsWednesday);
      } else {
        this.parkingSpaceStatisticsSubject.next(this.datasetsTuesday);
        this.getOccupancyStatus(this.datasetsTuesday);
      }
      return;
    }

    // TODO -> get from mserver

    return;
  }

  getDaysOfWeek() {
    return this.daysOfWeek;
  }

  datasetsMonday: ChartData<'bar', { key: string; value: number }[]> = {
    datasets: [
      {
        data: [
          { key: '0', value: 20 },
          { key: '1', value: 15 },
          { key: '2', value: 15 },
          { key: '3', value: 11 },
          { key: '4', value: 5 },
          { key: '5', value: 14 },
          { key: '6', value: 15 },
          { key: '7', value: 16 },
          { key: '8', value: 7 },
          { key: '9', value: 15 },
          { key: '10', value: 19 },
          { key: '11', value: 2 },
          { key: '12', value: 12 },
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
        ],
        parsing: {
          xAxisKey: 'key',
          yAxisKey: 'value',
        },
      },
    ],
  };

  datasetsTuesday: ChartData<'bar', { key: string; value: number }[]> = {
    datasets: [
      {
        data: [
          { key: '0', value: 1 },
          { key: '1', value: 15 },
          { key: '2', value: 15 },
          { key: '3', value: 11 },
          { key: '4', value: 5 },
          { key: '5', value: 14 },
          { key: '6', value: 15 },
          { key: '7', value: 16 },
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
        ],
        parsing: {
          xAxisKey: 'key',
          yAxisKey: 'value',
        },
      },
    ],
  };

  datasetsWednesday: ChartData<'bar', { key: string; value: number }[]> = {
    datasets: [
      {
        data: [
          { key: '0', value: 5 },
          { key: '1', value: 15 },
          { key: '2', value: 15 },
          { key: '3', value: 11 },
          { key: '4', value: 5 },
          { key: '5', value: 14 },
          { key: '6', value: 15 },
          { key: '7', value: 16 },
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
        ],
        parsing: {
          xAxisKey: 'key',
          yAxisKey: 'value',
        },
      },
    ],
  };

  datasetsStart: ChartData<'bar', { key: string; value: number }[]> = {
    datasets: [
      {
        data: [
          { key: '0', value: 20 },
          { key: '1', value: 15 },
          { key: '2', value: 15 },
          { key: '3', value: 11 },
          { key: '4', value: 5 },
          { key: '5', value: 14 },
          { key: '6', value: 15 },
          { key: '7', value: 16 },
          { key: '8', value: 7 },
          { key: '9', value: 15 },
          { key: '10', value: 19 },
          { key: '11', value: 2 },
          { key: '12', value: 12 },
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
        ],
        parsing: {
          xAxisKey: 'key',
          yAxisKey: 'value',
        },
      },
    ],
  };
}
