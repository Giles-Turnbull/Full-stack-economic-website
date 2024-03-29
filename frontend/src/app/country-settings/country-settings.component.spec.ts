import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySettingsComponent } from './country-settings.component';

describe('CountrySettingsComponent', () => {
  let component: CountrySettingsComponent;
  let fixture: ComponentFixture<CountrySettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountrySettingsComponent]
    });
    fixture = TestBed.createComponent(CountrySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
