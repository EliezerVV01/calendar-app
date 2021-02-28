import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import data from '../../../assets/static/cities.json';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public citiesList: City[] = data as City[]

  constructor(private http: HttpClient) { }

  public getWeatherInformation(city: City): Promise<any>{
      return this.http.get(`${environment.apiUrl}/onecall?lat=${city.latitude}&lon=${city.longitude}&APPID=${environment.apiKey}`).toPromise()
  }
}
