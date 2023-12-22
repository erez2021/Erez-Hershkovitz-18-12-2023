import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { Actions } from 'src/store/actions';
import { WeatherService } from 'src/services/weather.service';
import { forecast } from 'src/models/forecast.interface';
import { location } from 'src/models/location.interface';
import { City } from 'src/models/city.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  cityFormControl = new FormControl('', Validators.required);
  selectedCity: City = {
    id: '215854',
    name: 'Tel Aviv',
    currentWeather: {},
  };

  selectedCityForecast: any = [];
  selectedCityWeather: string = '';
  measureSystem: string = 'Celcius';

  filteredLocations: location[] = [];

  constructor(
    private weatherService: WeatherService,

    private store: Store<{ measureSystem: string; selectedCity: City }>
  ) {
    this.store.subscribe((data: any) => {
      this.measureSystem = data.appState.measureSystem;
      if (this.selectedCity.id !== data.appState.selectedCity.id) {
        this.selectedCity = data.appState.selectedCity;
        this.load5DaysForecast();
      }
    });
  }

  async ngOnInit() {
    this.load5DaysForecast();
    console.log(this.selectedCityForecast);
  }

  async load5DaysForecast() {
    try {
      const selectedCityForecast = await this.weatherService.get5DaysForecast(
        this.selectedCity.id
      );
      this.selectedCityForecast = selectedCityForecast.map((item: forecast) => {
        return {
          locationName: this.selectedCity.name,
          date: item.Date,
          phrase: item.Day.IconPhrase,
          maxTemperature: item.Temperature.Maximum.Value,
          minTemperature: item.Temperature.Minimum.Value,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  onCitySelected(city: string, id: string): void {
    const newSelectedCity = {
      id,
      name: city,
      currentWeather: {},
    };
    this.store.dispatch(
      Actions.setSelectedCity({ selectedCity: newSelectedCity })
    );
    this.filteredLocations = [];
  }

  async searchCity(e: any) {
    const searchWord = e.target.value;
    if (searchWord.length >= 2) {
      const result = await this.weatherService.getCities(searchWord);
      this.filteredLocations = result.reduce((acc: any[], item: any) => {
        acc.push({
          id: item.Key,
          country: item.Country.LocalizedName,
          city: item.LocalizedName,
        });
        return acc;
      }, []);
    } else {
      this.filteredLocations = [];
    }
  }
}
