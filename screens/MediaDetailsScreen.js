import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_MEDIA_DETAILS } from '../graphql/queries';
import { SafeAreaView } from 'react-native-safe-area-context';

const MediaDetailsScreen = ({ route, navigation }) => {
  const { id, type } = route.params;
  const { loading, error, data } = useQuery(GET_MEDIA_DETAILS, {
    variables: { id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const media = data.Media;
  const runtime = media.type === 'ANIME' ? `${media.duration} min` : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: media.coverImage.large }} style={styles.coverImage} />
        <Text style={styles.title}>{media.title.english || media.title.romaji}</Text>
        {runtime && <Text style={styles.subtitle}>Runtime: {runtime}</Text>}
        <Text style={styles.subtitle}>Format: {media.format}</Text>
        <Text style={styles.subtitle}>Start Date: {media.startDate.year}-{media.startDate.month}-{media.startDate.day}</Text>
        <Text style={styles.subtitle}>End Date: {media.endDate.year}-{media.endDate.month}-{media.endDate.day}</Text>
        <Text style={styles.subtitle}>Country of Origin: {media.countryOfOrigin}</Text>
        <Text style={styles.subtitle}>Genres: {media.genres.join(', ')}</Text>
        <Text style={styles.description}>{media.description}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add to List</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flexGrow: 1,
    padding: 10,
  },
  coverImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6A0DAD',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6A0DAD',
    padding: 15,
    borderRadius: 50,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default MediaDetailsScreen;
