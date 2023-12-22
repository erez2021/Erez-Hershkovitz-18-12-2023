import { createAction, props } from '@ngrx/store';
import { City } from 'src/models/city.interface';

const setSelectedCity = createAction(
  'SET_SELECTED_CITY',
  props<{ selectedCity: City }>()
);
const getSelectedCity = createAction(
  'GET_SELECTED_CITY',
  props<{ selectedCityId: string }>()
);
const updateCityToFavorites = createAction(
  'ADD_CITY_TO_FAVORITES',
  props<{ city: City }>()
);
const setMeasureSystem = createAction(
  'SET_MEASURE_SYSTEM',
  props<{ measureSystem: string }>()
);
const updateFavoriteCities = createAction(
  'UPDATE_FAVORITE_CITIES',
  props<{ city: City }>()
);

export const Actions = {
  setSelectedCity,
  getSelectedCity,
  updateCityToFavorites,
  setMeasureSystem,
  updateFavoriteCities,
};
