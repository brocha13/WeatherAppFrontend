import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { weatherModel } from 'src/app/model/weather.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class HomeComponent implements OnInit {
  weatherData: weatherModel;
  dateAsString: string;

  constructor(private http: HttpClient) {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    this.dateAsString = new Date(Date.now() - tzoffset).toISOString().slice(0, 16);
  }

  ngOnInit(): void { }

  getWeatherData() {
    const url = 'http://localhost:9000/getWeatherData?date=' + this.dateAsString.slice(0, -3);
    this.http.get<weatherModel>(url).subscribe(
      (value) => {
        value.temp -= 272.15;
        value.tempMax -= 272.15;
        value.tempMin -= 272.15;
        this.weatherData = value;
      },
      (error: HttpErrorResponse) => {
        this.weatherData = null;
        console.log(error);
        switch (error.status) {
          case 401: {
            window.alert('You must log in to get weather data');
            break;
          }
          case 400: {
             window.alert(error.error);
             break;
            }
          default: {
            window.alert('Unexpected error, please try again later!');
            break;
          }
        }
      }
    );
  }

  isWeatherData(): boolean {
    return this.weatherData != null;
  }
}
