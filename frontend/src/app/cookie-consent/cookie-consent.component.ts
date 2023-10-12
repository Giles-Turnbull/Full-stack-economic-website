import { Component } from '@angular/core';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent {
  showCookieConsent = !localStorage.getItem('cookiesAccepted');

  //if the user accepts cookies, dont show the cookie consent banner
  acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    this.showCookieConsent = false;
  }

  //if the user accepts cookies, dont show the cookie consent banner
  declineCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    this.showCookieConsent = false;
  }
}
