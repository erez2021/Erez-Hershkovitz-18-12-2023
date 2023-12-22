import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Store } from '@ngrx/store';

import { City } from 'src/models/city.interface';
import { WeatherService } from 'src/services/weather.service';
import { Actions } from 'src/store/actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favoriteCities: City[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private weatherService: WeatherService,
    private store: Store<{ favoriteCities: City[] }>
  ) {
    this.store.subscribe((data: any) => {
      if (this.favoriteCities.length !== data.appState.favoriteCities.length) {
        this.favoriteCities = data.appState.favoriteCities;
        this.loadCurrentWeatherById();
      }
    });
  }

  async ngOnInit() {}
  async loadCurrentWeatherById() {
    try {
      let favoriteCitiesCopy = JSON.parse(JSON.stringify(this.favoriteCities));
      const updatedFavoriteCities = await Promise.all(
        favoriteCitiesCopy.map(async (city: City) => {
          const currentWeather = await this.weatherService.getCurrentWeather(
            city.id
          );
          const [currentWeatherObject] = currentWeather;
          return { ...city, currentWeather: currentWeatherObject };
        })
      );
      updatedFavoriteCities.forEach((updatedCity) => {
        this.store.dispatch(
          Actions.updateFavoriteCities({ city: updatedCity })
        );
      });
    } catch (error) {
      console.error('Error fetching current weather data:', error);
    }
    this.cdr.detectChanges();
  }

  hasCurrentWeather(city: City): boolean {
    return Object.keys(city.currentWeather).length > 0;
  }
}
