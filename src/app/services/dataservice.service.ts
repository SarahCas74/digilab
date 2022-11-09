import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { job } from './../helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  urlapi: string = 'https://restcountries.com/v3.1/all'
  dataDirectory = 'https://reqres.in/api/users';
  dataWeather = 'https://api.open-meteo.com/v1/forecast/'
  urlGps = 'https://cors-anywhere.herokuapp.com/https://api-adresse.data.gouv.fr/search/';
  urlChat = 'https://official-joke-api.appspot.com/random_ten';
  listeJob=job;


  constructor(private _http: HttpClient) { }

  getCountries(): Observable<any> {
    return this._http.get(this.urlapi)
  }

  //Service du finder
  getJob():string[]{
    return this.listeJob
  }
  

  //Service du login avatar
  getAvatar(): Observable<any> {
    return this._http.get(this.dataDirectory)
  }

  //Service du getItem
  getItem() {
    return localStorage.getItem('user')
  }

  // Service du Directory
  postData(formDirectory: any): Observable<any> {
    return this._http.post(this.dataDirectory, { data: formDirectory })
  }

  //service du Weather
  getCoordinates(ville: string, rue: string, cp: number): Observable<any> {
    let paramsData = new HttpParams().append('q', `${ville},${rue},${cp}`)
    return this._http.get(this.urlGps, { params: paramsData })
  }

  getWeather(latitude: number, longitude: number): Observable<any> {
    let paramsWeather = new HttpParams().append('hourly', 'temperature_2m')
      .append('timezone', 'Europe/Berlin')
      .append('latitude', latitude)
      .append('longitude', longitude)
    return this._http.get(this.dataWeather, { params: paramsWeather })

  }

  //service des mssages chat
  getMessages(): Observable<any> {
    return this._http.get(this.urlChat)
  }

}






