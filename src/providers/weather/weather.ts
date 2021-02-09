import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable()
export class WeatherProvider {

  city: string;
  units: string;
  link: string; 
  
  constructor(public http: HttpClient) {
  }

  getWeather(city, units): Observable<any> {
    this.city = city;
    this.units = units;
    this.link = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units='+units+'&appid=16ad9ad5338422ad1b826d4095a62c62';
    return this.http.get(this.link);
  }

}
