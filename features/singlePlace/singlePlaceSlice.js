import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imageUri: '',
  location: null,
  title: '',
  address: '',
  id: (new Date() * Math.random()).toString(),
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
    setAddress: (state, { payload }) => {
      state.address = payload;
    },
    resetState: (state) => {
      return { ...initialState, id: (new Date() * Math.random()).toString() };
    },
  },
});

export const { setImageUri, setLocation, setTitle, setAddress, resetState } =
  singlePlaceSlice.actions;

export default singlePlaceSlice.reducer;
