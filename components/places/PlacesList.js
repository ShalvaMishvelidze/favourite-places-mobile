import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PlacesListItem from './PlacesListItem';
import { colors } from '../../constants/colors';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const PlacesList = () => {
  const { places } = useSelector((state) => state.allPlaces);
  const { navigate } = useNavigation();

  const selectedPlaceHandler = (id) => {
    navigate('PlaceDetails', { id });
  };

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
      style={styles.list}
      data={places}
      renderItem={({ item }) => (
        <PlacesListItem onPress={selectedPlaceHandler} {...item} />
      )}
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
  list: {
    margin: 24,
  },
});
