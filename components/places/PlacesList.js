import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PlacesListItem from './PlacesListItem';
import { colors } from '../../constants/colors';

const PlacesList = ({ places }) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No Places Added Yet - start adding some!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      renderItem={({ item }) => <PlacesListItem {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: colors.primary200,
  },
});
