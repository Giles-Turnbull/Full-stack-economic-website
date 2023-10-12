import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  privateData: any[] = [];
  errorMessage: string = '';
  userData: any; // Add a variable to hold user data

  constructor(
    private authService: AuthService,
    private searchService: SearchService,
    private router: Router // Inject the Router module
  ) {}

  ngOnInit() {
    this.authService.checkAuthentication();
    
    // Fetch private data with the authentication token
    const currentUserString = localStorage.getItem('currentUser') || '';

    // Check if currentUserString is not an empty string before parsing
    if (currentUserString !== '') {
      const currentUser = JSON.parse(currentUserString);
      if (currentUser && currentUser.token) {
        const authToken = currentUser.token;
        this.fetchPrivateData(authToken);
      }
      // Assign user data to userData variable
      this.userData = currentUser;
    }
  }

  fetchPrivateData(token: string) {
    console.log('Fetching private data...');
    this.searchService.getAllPrivateData(token).subscribe(
      (data: any) => {
        this.privateData = data;
        this.errorMessage = ''; // Clear any previous error message
      },
      (error) => {
        console.error('Error fetching private data:', error);
        this.errorMessage = `Error fetching private data: ${error.message}`;
        this.privateData = []; // Clear the results in case of an error
      }
    );
  }

  // Method to handle item click and navigate to the '/create' route with selected data
  onItemClick(selectedData: any) {
    // Assuming you want to pass 'country' as a key and the selected data as the value
    const navigationExtras = {
      state: { data: selectedData }
    };

    // Save the selected data to local storage
    localStorage.setItem('country', JSON.stringify(selectedData));

    // Navigate to the '/create' route with the selected data
    this.router.navigate(['/create'], navigationExtras);
  }
}
