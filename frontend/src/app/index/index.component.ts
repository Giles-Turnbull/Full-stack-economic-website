import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Check authentication status
    this.authService.checkAuthentication();
  }
}

