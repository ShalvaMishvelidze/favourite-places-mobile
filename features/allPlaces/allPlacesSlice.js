import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addPlaceThunk, getPlacesThunk } from './allPlacesThunk';

const initialState = {
  places: [],
  isLoading: false,
  error: '',
  addedNewPlace: false,
};

export const addPlace = createAsyncThunk('addPlace', addPlaceThunk);
export const getPlaces = createAsyncThunk('getPlaces', getPlacesThunk);

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
      });
  },
});

export default allPlacesSlice.reducer;
