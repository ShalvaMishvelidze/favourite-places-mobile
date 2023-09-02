import {
  fetchPlaceDetails,
  fetchPlaces,
  insertPlace,
} from '../../utils/database';

export const addPlaceThunk = async (_, thunkAPI) => {
  try {
    const singlePlaceState = thunkAPI.getState().singlePlace;
    await insertPlace(singlePlaceState);
  } catch (error) {
    return error;
  }
};

export const getPlacesThunk = async (_, thunkAPI) => {
  try {
    const response = await fetchPlaces();
    return response;
  } catch (error) {
    return error;
  }
};

export const setSelectedPlaceThunk = async ({ id }, thunkAPI) => {
  try {
    const response = await fetchPlaceDetails({ id });
    return response;
  } catch (error) {
    return error;
  }
};
