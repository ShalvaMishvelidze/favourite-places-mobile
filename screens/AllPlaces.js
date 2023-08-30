import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import PlacesList from '../components/places/PlacesList';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaces } from '../features/allPlaces/allPlacesSlice';
import * as SplashScreen from 'expo-splash-screen';

const AllPlaces = () => {
  const dispatch = useDispatch();
  const { isLoading, addedNewPlace } = useSelector((state) => state.allPlaces);

  useEffect(() => {
    dispatch(getPlaces());
  }, [addedNewPlace]);

  useEffect(() => {
    if (isLoading) {
      SplashScreen.preventAutoHideAsync();
    } else {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  return <PlacesList />;
};

export default AllPlaces;

const styles = StyleSheet.create({});
