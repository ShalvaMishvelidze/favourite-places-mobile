import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PlacesListItem = ({
  title,
  imageUri: uri,
  address,
  location,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={{
          uri,
        }}
      />
      <View>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
    </Pressable>
  );
};

export default PlacesListItem;

const styles = StyleSheet.create({});
