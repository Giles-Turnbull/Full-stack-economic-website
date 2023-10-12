import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryDataService } from '../services/country-data.service';

@Component({
  selector: 'app-country-settings',
  templateUrl: './country-settings.component.html',
  styleUrls: ['./country-settings.component.css']
})
export class CountrySettingsComponent implements OnInit {
  //initialize variables
  selectedCountry: string = ''; // Tracking selected country
  pH: number = 0;
  EC: number = 0;
  NH3: number = 0;
  DO: number = 0;
  NO2_3: number = 0;
  T_P: number = 0;
  wqi: number = 0;

  constructor(
    private router: Router,
    private countryDataService: CountryDataService
  ) {}

  ngOnInit() {
    this.countryDataService.selectedCountry$.subscribe((country) => {
      if (country) {
        this.selectedCountry = country; // Update the selected country
        this.loadCountrySettings(country);
      }
    });
  }

  // Load country settings from local storage
  loadCountrySettings(country: string) {
    console.log(`Loading country data for: ${country}`);
    const countryData = this.countryDataService.getCountryData();
    if (countryData) {
      const countrySettings = countryData[country];
      if (countrySettings) {
        this.pH = countrySettings.pH;
        this.EC = countrySettings.EC;
        this.NH3 = countrySettings.NH3;
        this.DO = countrySettings.DO;
        this.NO2_3 = countrySettings.NO2_3;
        this.T_P = countrySettings.T_P;

        this.calculateWQI();
      }
    }
  }

  // Update local storage when form inputs change
  updateLocalStorage() {
    if (this.selectedCountry) {
      const countryData = this.countryDataService.getCountryData() || {};
      const updatedCountrySettings = {
        ...countryData[this.selectedCountry],
        pH: this.pH,
        EC: this.EC,
        NH3: this.NH3,
        DO: this.DO,
        NO2_3: this.NO2_3,
        T_P: this.T_P,
      };
      countryData[this.selectedCountry] = updatedCountrySettings;
      localStorage.setItem('country', JSON.stringify(countryData));
      this.calculateWQI();
    }
  }

  calculateWQI() {
    // Use your specific weightings for each parameter
    const weightings = {
      pH: 0.15,
      EC: 0.12,
      NH3: 0.10,
      DO: 0.20,
      NO2_3: 0.18,
      T_P: 0.15,
    };
  
    // Retrieve the parameter values from local storage
    const countryData = this.countryDataService.getCountryData();
    if (countryData) {
      const countrySettings = countryData[this.selectedCountry];
      if (countrySettings) {
        const {
          pH,
          EC,
          NH3,
          DO,
          NO2_3,
          T_P
        } = countrySettings;
  
        // Calculate WQI using the weighted sum of parameters
        const wqi = (
          weightings.pH * pH +
          weightings.EC * EC +
          weightings.NH3 * NH3 +
          weightings.DO * DO +
          weightings.NO2_3 * NO2_3 +
          weightings.T_P * T_P
        );
  
        this.wqi = wqi;
      }
    }
  }
  
  
  saveData() {
    // Save data logic remains the same
  }
}
