import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  apiUrl: string = 'http://localhost:8000/apiCountry/';

  constructor(private http: HttpClient) {}

  // Search for public countries
  search(query: string) {
    return this.http.get(this.apiUrl + "countries/" + `?name=${query}`);
  }

  // Search for private countries
  getAllPrivateData(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    });
    
    console.log('headers:', headers);
    console.log('result:', this.http.get(this.apiUrl + 'private/', { headers }));

    // Send the GET request with headers
    return this.http.get(this.apiUrl + 'private/', { headers });
  }
}
