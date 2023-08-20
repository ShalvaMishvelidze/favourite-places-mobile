import { Alert, Button, Image, StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from 'expo-image-picker';
import { colors } from '../../constants/colors';
import BtnOutlined from '../UI/BtnOutlined';

const ImagePicker = () => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [image, setImage] = useState('');

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImage(image.assets[0].uri);
  }

  return (
    <View>
      <View style={styles.imageContainer}>
        {!image && <Text>No image added yet!</Text>}
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <BtnOutlined onPress={takeImageHandler} icon={'camera'}>
        Take Photo
      </BtnOutlined>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary100,
    overflow: 'hidden',
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
