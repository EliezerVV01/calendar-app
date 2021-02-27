import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import data from '../../../assets/static/cities.json';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public citiesList: City[] = data as City[]

  constructor(private http: HttpClient) { }

}
