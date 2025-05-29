import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/all`);
  }

  searchCountriesByName(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/name/${name}`);
  }

  getCountryByCode(code: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`);
  }

  getCountryByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`)
  }
}
