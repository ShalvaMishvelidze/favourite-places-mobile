import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import ImagePicker from '../components/places/ImagePicker';
import LocationPicker from '../components/places/LocationPicker';
import { useDispatch } from 'react-redux';
import Btn from '../components/UI/Btn';
import { colors } from '../constants/colors';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import {
  editSelectedPlace,
  getPlaces,
  setEditing,
} from '../features/allPlaces/allPlacesSlice';

const Edit = ({ route, navigation }) => {
  const [state, setState] = useState(route.params);

  const dispatch = useDispatch();

  const { navigate } = navigation;

  useEffect(() => {
    dispatch(setEditing());
  }, []);

  function takeImageHandler(imageUri) {
    setState({ ...state, imageUri });
  }

  const pickLocationHandler = useCallback((location, address) => {
    setState({ ...state, location });
    setState({ ...state, address });
  }, []);

  function savePlaceHandler() {
    dispatch(editSelectedPlace(state));
    dispatch(getPlaces());
    dispatch(setEditing());
    navigate('PlaceDetails', { ...state });
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setState({ ...state, title: value })}
          value={state.title}
        />
      </View>
      <ImagePicker
        onTakeImage={takeImageHandler}
        editImageUri={state.imageUri}
      />
      {state.address && <Text style={styles.address}>{state.address}</Text>}
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Btn onPress={savePlaceHandler}>Save</Btn>
    </ScrollView>
  );
};

export default Edit;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.primary500,
  },
  input: {
    backgroundColor: colors.primary100,
    fontSize: 16,
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary700,
  },
  address: {
    margin: 16,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
