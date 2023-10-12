import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = 'http://localhost:8000/';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post<any>(this.apiUrl + `accounts/api-token-auth/`,
      { username: username, password: password }, httpOptions).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
    );
  }

  loginAsGuest() {
    const guestUsername = 'Guest';
    const guestPassword = 'Password123@123';

    // Call the existing login method with guest credentials
    return this.login(guestUsername, guestPassword);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  //check if the user is logged in
  isLoggedIn(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser !== null;
  }

  // Check authentication status then navigate to the login page if not authenticated
  checkAuthentication(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
