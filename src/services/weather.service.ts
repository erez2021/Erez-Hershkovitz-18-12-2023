import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/components/dashboard/modal/modal.component';
import axios from 'axios';

const API_KEY = 'tEEavAr1t1U5mu4Gbpd9fcXA7YXkidKw';
const BASE_URL = 'https://dataservice.accuweather.com/';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private dialog: MatDialog) {}

  private handleHttpError(error: any): never {
    console.error('HTTP Request Error:', error);
    this.dialog.open(ModalComponent, {
      data: { errorMessage: error },
    });
    throw error;
  }

  getCities = async (cityQueryString: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${cityQueryString}`
      );
      return response.data;
    } catch (error) {
      return this.handleHttpError(error);
    }
  };

  getCurrentWeather = async (locationKey: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`
      );
      return response.data;
    } catch (error) {
      return this.handleHttpError(error);
    }
  };

  get5DaysForecast = async (locationKey: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&details=true`
      );
      return response?.data.DailyForecasts;
    } catch (error) {
      return this.handleHttpError(error);
    }
  };
}
