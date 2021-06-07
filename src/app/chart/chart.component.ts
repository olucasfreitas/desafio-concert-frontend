import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { ChartData } from '../chart';

Chart.register(...registerables);

const API = 'http://localhost:3333/';
const token = localStorage.getItem('token');

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }),
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  date: Date[] = [];
  meantemp: Number[] = [];
  humidity: Number[] = [];
  wind_speed: Number[] = [];
  mean_pressure: Number[] = [];
  chart: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(API + 'measurements', httpOptions).subscribe((data) => {
      const transformedData = data as ChartData[];
      transformedData.forEach((value: any) => {
        this.date.push(value.date);
        this.meantemp.push(value.meantemp.toFixed(1));
        this.humidity.push(value.humidity.toFixed(1));
        this.wind_speed.push(value.wind_speed.toFixed(1));
        this.mean_pressure.push(value.meanpressure.toFixed(1));
      });
    });

    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.date,
        datasets: [
          {
            label: 'meantemp',
            data: this.meantemp,
            fill: false,
            borderColor: 'red',
            tension: 0.1,
          },
          {
            label: 'humidity',
            data: this.humidity,
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
          },
          {
            label: 'wind speed',
            data: this.wind_speed,
            fill: false,
            borderColor: 'yellow',
            tension: 0.1,
          },
          {
            label: 'mean pressure',
            data: this.mean_pressure,
            fill: false,
            borderColor: 'green',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            min: 0,
            max: 1150,
          },
        },
      },
    });
  }

  updateChart() {
    this.chart.update();
  }
}
