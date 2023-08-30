import { fetchPlaces, insertPlace } from '../../utils/database';

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
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};
