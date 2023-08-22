import { configureStore } from '@reduxjs/toolkit';
import singlePlaceSlice from './features/singlePlace/singlePlaceSlice';
import allPlacesSlice from './features/allPlaces/allPlacesSlice';

export const store = configureStore({
  reducer: {
    singlePlace: singlePlaceSlice,
    allPlaces: allPlacesSlice,
  },
});
