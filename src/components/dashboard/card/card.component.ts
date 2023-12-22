import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { City } from 'src/models/city.interface';
import { Actions } from 'src/store/actions';
import {
  getDayByDate,
  getImageByPhrase,
  calculateTemperature,
} from 'src/utils/utils';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() dayForecast: any;
  @Input() measureSystem: string = 'Celsius';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() cityDetails: any;

  heartImage: string = 'assets/icons/redheart.png';

  constructor(private store: Store<{ measureSystem: string }>) {
    this.store.subscribe((data: any) => {
      this.measureSystem = data.appState.measureSystem;
    });
  }

  ngOnInit(): void {
    console.log(this.cityDetails);
  }

  getDay(dateString: string) {
    return getDayByDate(dateString);
  }
  getImage(phrase: string) {
    const weather = getImageByPhrase(phrase);
    return `assets/icons/${weather}.png`;
  }
  convertTemperature(temperature: number) {
    return calculateTemperature(temperature, this.measureSystem);
  }
  get displayMeasureSystem() {
    return `assets/icons/${this.measureSystem}.png`;
  }
  removeFromFavorites(cityDetails: City) {
    const audio = new Audio('assets/sounds/pop.mp3');
    audio.play();
    this.store.dispatch(Actions.updateCityToFavorites({ city: cityDetails }));
  }
}
