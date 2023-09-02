import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addPlaceThunk,
  getPlacesThunk,
  setSelectedPlaceThunk,
} from './allPlacesThunk';

const initialState = {
  places: [],
  isLoading: false,
  error: '',
  addedNewPlace: false,
  selectedPlace: null,
};

export const addPlace = createAsyncThunk('addPlace', addPlaceThunk);
export const getPlaces = createAsyncThunk('getPlaces', getPlacesThunk);
export const setSelectedPlace = createAsyncThunk(
  'setSelectedPlace',
  setSelectedPlaceThunk
);

const allPlacesSlice = createSlice({
  name: 'allPlaces',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPlace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPlace.fulfilled, (state) => {
        state.isLoading = false;
        state.addedNewPlace = true;
      })
      .addCase(addPlace.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getPlaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlaces.fulfilled, (state, { payload }) => {
        state.places = payload;
        state.addedNewPlace = false;
        state.isLoading = false;
      })
      .addCase(getPlaces.rejected, (state, { payload }) => {
        state.error = payload;
        state.addedNewPlace = false;
        state.isLoading = false;
      })
      .addCase(setSelectedPlace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setSelectedPlace.fulfilled, (state, { payload }) => {
        state.selectedPlace = payload;
        state.isLoading = false;
      })
      .addCase(setSelectedPlace.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export default allPlacesSlice.reducer;
