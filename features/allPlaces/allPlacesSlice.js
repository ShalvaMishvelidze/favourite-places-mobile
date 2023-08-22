import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  places: [],
};

const allPlacesSlice = createSlice({
  name: 'allPlaces',
  initialState,
  reducers: {
    addPlace: (state, { payload }) => {
      state.places.push(payload);
    },
    setPlaces: (state, { payload }) => {
      state.places = [...payload];
    },
  },
});

export const { addPlace, setPlaces } = allPlacesSlice.actions;

export default allPlacesSlice.reducer;
