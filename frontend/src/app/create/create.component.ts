// create.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CountryDataService } from '../services/country-data.service';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  ngOnInit(): void {
    this.loadText();
  }

  //initialize variables
  showExampleText: boolean = true;
  showForm: boolean = false;
  showCreateForm: boolean = true;
  name: string = '';
  visibility: string = 'public'; // Default to public
  form: FormGroup; // Define a FormGroup
  selectedCountry: string = '';
  TitleName: string = '';

  constructor(
    private authService: AuthService,
    private countryDataService: CountryDataService,
    private http: HttpClient, // Inject HttpClient
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required], // Use Validators for validation
      visibility: ['public'],
    });
  }

  // Load country settings from local storage
  loadCountrySettings(country: string) {
    this.countryDataService.setSelectedCountry(country);
    this.showExampleText = false;
  }

  // Load text from local storage
  loadText() {
    console.log("load text");
    this.showExampleText = true;
    
    // Retrieve the country data from local storage
    let countryData = this.countryDataService.getCountryData();
    
    if (countryData) {
        // Set the name property based on the data from local storage
        this.TitleName = countryData.name;
        console.log("nameeeee:", this.TitleName);
    }
}

  // Create a new country
  openCreateForm() {
    this.showCreateForm = false;
    this.showForm = true;
  }
  

  saveData() {
    if (this.form.valid) {
      // Retrieve the country data from local storage
      let countryData = this.countryDataService.getCountryData();
  
      if (countryData) {
        // Modify the country data based on the selected country and changes
        if (countryData) {
          // Update the selected country's data with form values
          countryData.name = this.form.value.name; // Use form value
          countryData.access = this.form.value.visibility; // Use form value
          if (countryData.access === 'private') {
            countryData.access = false;
          } else {
            countryData.access = true;
          }
          // Add other properties as needed, for example, the user who made the change
          const currentUserData = localStorage.getItem('currentUser');
          if (currentUserData) {
            // Parse the current user data from local storage
            const currentUser = JSON.parse(currentUserData);

            // Set the user property in countryData to the current user
            countryData.user = currentUser.username;
          }
  
          // Update the modified country data in local storage
          localStorage.setItem('country', JSON.stringify(countryData));
  
          // Send the updated country data to the backend API
          this.http.post<any>('http://localhost:8000/apiCountry/save/', countryData).subscribe(
            (response) => {
              console.log(response);
              // Reset the form or perform other actions as needed
              this.resetForm();
              alert('That has been saved to the database.');
            },
            (error) => {
              console.error(error); // error handling code
            }
          );
        }
      }
    } else {
      alert('Please enter a name and select a visibility option.');
    }
  }
  
// Reset the form
  resetForm() {
    this.name = '';
    this.visibility = 'public';
    this.showForm = false;
    this.showCreateForm = true;
  }
}
