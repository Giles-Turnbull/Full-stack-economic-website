import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  msg: any;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

}