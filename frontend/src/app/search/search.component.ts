// search.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private searchService: SearchService
  ) {}


  ngOnInit(): void {
    // Check authentication status
    this.authService.checkAuthentication();
  }

  goToCreatePage() {
    // Create the country object for "Default01" with the user "admin"
    const defaultCountry = {
      id: 0,
      vietnam_data: {
        id: 0,
        pH: 7,
        EC: 100,
        NH3: 0.1,
        DO: 10,
        NO2_3: 0.5,
        T_P: 0.13,
      },
      thailand_data: {
        id: 0,
        pH: 7,
        EC: 100,
        NH3: 0.1,
        DO: 10,
        NO2_3: 0.5,
        T_P: 0.13,
      },
      cambodia_data: {
        id: 0,
        pH: 7,
        EC: 100,
        NH3: 0.1,
        DO: 10,
        NO2_3: 0.5,
        T_P: 0.13,
      },
      laopdr_data: {
        id: 0,
        pH: 7,
        EC: 100,
        NH3: 0.1,
        DO: 10,
        NO2_3: 0.5,
        T_P: 0.13,
      },
      user: {
        username: 'admin',
      },
      name: 'Default01',
      access: true,
    };

    // Store the default country's info in local storage
    localStorage.setItem('country', JSON.stringify(defaultCountry));

    // Navigate to the /create
    this.router.navigate(['/create']);
  }


  performSearch() {
    console.log('Performing search with query:', this.searchQuery);
    
    if (this.searchQuery.trim() !== '') {
      this.searchService.search(this.searchQuery).subscribe(
        (response: any) => {
          // Log response
          console.log('API Response:', response);
  
          // Update searchResults
          this.searchResults = response;
  
          // Clear the search results if there are no matches
          if (this.searchResults.length === 0) {
            console.log('No results found.');
          }
        },
        (error) => {
          // Log the error
          console.error('Error during search:', error);
        }
      );
    } else {
      // Clear the search results if the query is empty
      this.searchResults = [];
    }
  }

  handleItemClick(result: any) {
    // Store the selected country's information in local storage
    localStorage.setItem('country', JSON.stringify(result));

    // Navigate to the /create
    this.router.navigate(['/create']);
  }
}