import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnimeListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Anime List Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 20,
    color: '#6A0DAD', // Purple color
  },
});

export default AnimeListScreen;
