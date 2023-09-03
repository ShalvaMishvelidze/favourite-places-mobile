import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import BtnOutlined from '../components/UI/BtnOutlined';
import { colors } from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSelectedPlace,
  getPlaces,
  setSelectedPlace,
} from '../features/allPlaces/allPlacesSlice';
import * as SplashScreen from 'expo-splash-screen';
import { useLayoutEffect } from 'react';
import IconButton from '../components/UI/IconButton';

const PlaceDetails = ({ route, navigation }) => {
  const { selectedPlace, isLoading } = useSelector((state) => state.allPlaces);
  function showOnMapHandler() {
    navigation.navigate('Map', {
      initialLat: selectedPlace.lat,
      initialLng: selectedPlace.lng,
    });
  }

  const dispatch = useDispatch();

  const selectedPlaceId = route.params.id;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => {
        return (
          <View style={styles.btnContainer}>
            <IconButton
              icon={'pencil'}
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate('Edit', { ...selectedPlace });
              }}
            />
            <IconButton
              icon={'trash'}
              size={24}
              color={tintColor}
              onPress={() => {
                dispatch(deleteSelectedPlace(selectedPlaceId));
                dispatch(getPlaces());
                navigation.goBack();
              }}
            />
          </View>
        );
      },
    });
  }, [navigation, selectedPlace]);

  useEffect(() => {
    if (isLoading) {
      SplashScreen.preventAutoHideAsync();
    } else {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(setSelectedPlace({ id: selectedPlaceId }));
  }, [selectedPlaceId, route.params]);

  return (
    <ScrollView>
      {selectedPlace && (
        <>
          <Image
            style={styles.image}
            source={{ uri: selectedPlace.imageUri }}
          />
          <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
              <Text style={styles.address}>{selectedPlace.address}</Text>
            </View>
            <BtnOutlined icon={'map'} onPress={showOnMapHandler}>
              View on Map
            </BtnOutlined>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  btnContainer: {
    flexDirection: 'row',
  },
  address: {
    color: colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
