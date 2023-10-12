import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  //initialize variables
  errorMessage: string = '';
  showCookieConsent: boolean = false;
  
  myfrom: FormGroup;
    constructor(private authService: AuthService, private router: Router) {
      this.myfrom = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.check();
  }

  // Check if the user has accepted or declined cookies
  check(){
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === 'true' || cookiesAccepted === 'false') {
      this.showCookieConsent = false; // Hide the consent bar
    }
  }

  get f() {
    return this.myfrom.controls;
  }

  onSubmit() {
    this.authService.login(this.myfrom.controls['username'].value, this.myfrom.controls['password'].value).pipe(first()).subscribe(
      data => {
        // Check if login is successful and navigate to /profile
        if (data && data.token) {
          this.router.navigate(['/']);
        }
      },
      error => {
        if (error.status === 400) {
          // Handle the 400 Bad Request error and set a custom error message
          this.errorMessage = 'Incorrect username or password';
        } else {
          // Handle other errors as needed
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        console.error(error);
      }
    );
  }
  
  loginAsGuest() {
    this.authService.loginAsGuest().pipe(first()).subscribe(
      data => {
        // Check if login is successful and navigate to /profile
        if (data && data.token) {
          this.router.navigate(['/']);
        }
      }
    );
  }
}
