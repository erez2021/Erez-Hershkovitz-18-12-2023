import { createReducer, on } from '@ngrx/store';
import { INITIAL_STATE } from './state';
import { Actions } from './actions';

export const appReducer = createReducer(
  INITIAL_STATE,
  on(Actions.setSelectedCity, (lastState, { selectedCity }) => ({
    ...lastState,
    selectedCity,
  })),
  on(Actions.updateCityToFavorites, (lastState, { city }) => {
    const cityIndex = lastState.favoriteCities.findIndex(
      (favoriteCity) => favoriteCity.id === city.id
    );
    const favoriteCities =
      cityIndex !== -1
        ? [
            ...lastState.favoriteCities.slice(0, cityIndex),
            ...lastState.favoriteCities.slice(cityIndex + 1),
          ]
        : [...lastState.favoriteCities, city];

    return { ...lastState, favoriteCities };
  }),
  on(Actions.updateFavoriteCities, (lastState, { city }) => {
    const cityIndex = lastState.favoriteCities.findIndex(
      (favoriteCity) => favoriteCity.id === city.id
    );
    const updatedFavoriteCities = JSON.parse(
      JSON.stringify(lastState.favoriteCities)
    );
    if (cityIndex !== -1) {
      updatedFavoriteCities[cityIndex].currentWeather = {
        ...updatedFavoriteCities[cityIndex],
        currentWeather: city.currentWeather,
      };
    }
    return { ...lastState, favoriteCities: updatedFavoriteCities };
  }),
  on(Actions.setMeasureSystem, (lastState, { measureSystem }) => ({
    ...lastState,
    measureSystem,
  }))
);
