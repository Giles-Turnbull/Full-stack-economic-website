import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryDataService {
  //initialize the country data
  private storageKey = 'country';
  private selectedCountrySubject = new BehaviorSubject<string>('');
  selectedCountry$ = this.selectedCountrySubject.asObservable();

  constructor() {}

  // Save the country data to local storage
  getCountryData(): any {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  // Get the country data from local storage
  setSelectedCountry(country: string) {
    this.selectedCountrySubject.next(country);
  }
}
