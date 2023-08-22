import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Btn from '../UI/Btn';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../features/singlePlace/singlePlaceSlice';

const PlaceForm = () => {
  const { title } = useSelector((state) => state.singlePlace);
  const dispatch = useDispatch();

  function savePlaceHandler(params) {}
  function takeImageHandler(params) {}
  function pickLocationHandler() {}

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => dispatch(setTitle(value))}
          value={title}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
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
});
