import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Btn from '../UI/Btn';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTitle,
  setImageUri,
  setLocation,
  setAddress,
  resetState,
} from '../../features/singlePlace/singlePlaceSlice';
import { addPlace } from '../../features/allPlaces/allPlacesSlice';
import { useNavigation } from '@react-navigation/native';

const PlaceForm = () => {
  const state = useSelector((state) => state.singlePlace);
  const [reRender, setReRender] = useState(false);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  function takeImageHandler(imageUri) {
    dispatch(setImageUri(imageUri));
  }

  const pickLocationHandler = useCallback((location, address) => {
    dispatch(setLocation(location));
    dispatch(setAddress(address));
  }, []);

  function savePlaceHandler() {
    dispatch(addPlace(state));
    dispatch(resetState());
    setReRender(!reRender);
    navigate('AllPlaces');
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => dispatch(setTitle(value))}
          value={state.title}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      {state.address && <Text style={styles.address}>{state.address}</Text>}
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Btn onPress={savePlaceHandler}>Add Place</Btn>
    </ScrollView>
  );
};

export default PlaceForm;

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
