import {
  deletePlace,
  fetchPlaceDetails,
  fetchPlaces,
  insertPlace,
  updatePlace,
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

export const deleteSelectedPlaceThunk = async (id, thunkAPI) => {
  try {
    await deletePlace(id);
  } catch (error) {
    return error;
  }
};

export const editSelectedPlaceThunk = async (place, thunkAPI) => {
  try {
    await updatePlace(place);
  } catch (error) {
    return error;
  }
};
