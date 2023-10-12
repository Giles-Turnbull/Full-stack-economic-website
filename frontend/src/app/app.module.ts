import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { CountrySettingsComponent } from './country-settings/country-settings.component';
import { SearchService } from './services/search.service';

import { CountryDataService } from './services/country-data.service';
import { CookieConsentComponent } from './cookie-consent/cookie-consent.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    NavbarComponent,
    SearchComponent,
    IndexComponent,
    CreateComponent,
    CountrySettingsComponent,
    CookieConsentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CountryDataService,
    SearchService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
