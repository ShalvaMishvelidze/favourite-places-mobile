import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import BtnOutlined from '../UI/BtnOutlined';
import { colors } from '../../constants/colors';
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';
import { getAddress, getMapPreview } from '../../utils/location';
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';

const LocationPicker = ({ onPickLocation, isEditing = false }) => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const isFocused = useIsFocused();

  const [location, setLocation] = useState(null);

  const { navigate } = useNavigation();
  const { params } = useRoute();

  useEffect(() => {
    if (isFocused && params) {
      const mapPickedLocation = {
        lat: params.lat,
        lng: params.lng,
      };
      setLocation(mapPickedLocation);
    }
  }, [params, isFocused]);

  useEffect(() => {
    if (location) {
      getAddress(location.lat, location.lng).then((address) =>
        onPickLocation(location, address)
      );
    }
  }, [location, onPickLocation]);

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
