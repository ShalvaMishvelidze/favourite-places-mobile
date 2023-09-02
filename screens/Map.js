import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/UI/IconButton';

const Map = ({ navigation, route }) => {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked!',
        'You have to pick a location (by tapping on the map) first!'
      );
      return;
    }

    navigation.navigate('AddPlace', { ...selectedLocation });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    initialLocation ||
      navigation.setOptions({
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              icon={'save'}
              size={24}
              color={tintColor}
              onPress={savePickedLocationHandler}
            />
          );
        },
      });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      initialRegion={{
        latitude: initialLocation ? initialLocation.lat : 41.716667,
        longitude: initialLocation ? initialLocation.lng : 44.783333,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={styles.map}
      onPress={({ nativeEvent }) => {
        const lat = nativeEvent.coordinate.latitude;
        const lng = nativeEvent.coordinate.longitude;
        if (initialLocation) {
          return;
        }
        setSelectedLocation({ lat, lng });
      }}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
