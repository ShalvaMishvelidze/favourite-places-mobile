import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import PlaceForm from '../components/places/PlaceForm';

const AddPlace = () => {
  return (
    <ScrollView>
      <PlaceForm />
    </ScrollView>
  );
};

export default AddPlace;

const styles = StyleSheet.create({});
