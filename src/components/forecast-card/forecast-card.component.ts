import { Component, Input, OnInit } from '@angular/core';
import { getDayByDate } from 'src/utils/utils';
import { Store } from '@ngrx/store';

import { Actions } from 'src/store/actions';
import { City } from 'src/models/city.interface';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.scss'],
})
export class ForecastCardComponent implements OnInit {
  @Input() selectedCityForecast?: any[] = [];
  @Input() selectedCity: City = {
    id: '',
    name: '',
    currentWeather: {},
  };
  @Input() measureSystem: string = 'Celsius';
  favoriteCities: City[] = [];
  toggledImage: string = 'assets/icons/heart.png';
  mockData = [{}];
  constructor(
    private store: Store<{ favoriteCities: City[]; selectedCity: City }>
  ) {
    this.store.subscribe((data: any) => {
      this.favoriteCities = data.appState.favoriteCities;
      const isCityInFavoties = this.favoriteCities.find(
        (city: City) => city.id === data.appState.selectedCity.id
      );
      this.toggledImage = isCityInFavoties
        ? 'assets/icons/redheart.png'
        : 'assets/icons/heart.png';
    });
  }

  ngOnInit(): void {
    console.log(this.selectedCity);
  }
  toggleAddToFavorites() {
    this.toggledImage =
      this.toggledImage === 'assets/icons/heart.png'
        ? 'assets/icons/redheart.png'
        : 'assets/icons/heart.png';
    const audio = new Audio(
      this.toggledImage === 'assets/icons/redheart.png'
        ? 'assets/sounds/sound.mp3'
        : 'assets/sounds/pop.mp3'
    );
    audio.play();
    this.store.dispatch(
      Actions.updateCityToFavorites({ city: this.selectedCity })
    );
  }
}
