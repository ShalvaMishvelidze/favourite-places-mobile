import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imageUri: '',
  location: null,
  title: '',
};

const singlePlaceSlice = createSlice({
  name: 'singlePlace',
  initialState,
  reducers: {
    setImageUri: (state, { payload }) => {
      state.imageUri = payload;
    },
    setLocation: (state, { payload }) => {
      state.location = payload;
    },
    setTitle: (state, { payload }) => {
      state.title = payload;
    },
  },
});

export const { setImageUri, setLocation, setTitle } = singlePlaceSlice.actions;

export default singlePlaceSlice.reducer;
