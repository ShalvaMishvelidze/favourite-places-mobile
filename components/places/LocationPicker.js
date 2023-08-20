import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import BtnOutlined from '../UI/BtnOutlined';
import { colors } from '../../constants/colors';
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';
import { getMapPreview } from '../../utils/location';
import { useNavigation } from '@react-navigation/native';

const LocationPicker = () => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const [location, setLocation] = useState(null);

  const { navigate } = useNavigation();

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const pickedLocation = await getCurrentPositionAsync();
    setLocation({
      lat: pickedLocation.coords.latitude,
      lng: pickedLocation.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigate('Map');
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {!location && <Text>No location picked yet!</Text>}
        {location && (
          <Image
            source={{ uri: getMapPreview(location.lat, location.lng) }}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.actions}>
        <BtnOutlined onPress={getLocationHandler} icon={'location'}>
          Locate User
        </BtnOutlined>
        <BtnOutlined onPress={pickOnMapHandler} icon={'map'}>
          Pick on Map
        </BtnOutlined>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary100,
    overflow: 'hidden',
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
