import { Component, OnInit } from '@angular/core';
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

  // mockFavoriteCities: City[] = [
  //   {
  //     id: '215854',
  //     name: 'Tel Aviv',
  //     currentWeather: {},
  //   },
  //   {
  //     id: '254674',
  //     name: 'London',
  //     currentWeather: {},
  //   },
  //   {
  //     id: '219874',
  //     name: 'Paris',
  //     currentWeather: {},
  //   },
  //   {
  //     id: '213854',
  //     name: 'New York',
  //     currentWeather: {},
  //   },
  //   {
  //     id: '254574',
  //     name: 'Berlinhggfhjk',
  //     currentWeather: {},
  //   },
  //   {
  //     id: '219784',
  //     name: 'Rome',
  //     currentWeather: {},
  //   },
  // ];

  constructor(
    private weatherService: WeatherService,
    private store: Store<{ favoriteCities: City[] }>
  ) {
    this.store.subscribe((data: any) => {
      console.log(data.appState.favoriteCities);
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
        console.log(updatedCity);

        this.store.dispatch(
          Actions.updateFavoriteCities({ city: updatedCity })
        );
      });
    } catch (error) {
      console.error('Error fetching current weather data:', error);
    }
  }
}
