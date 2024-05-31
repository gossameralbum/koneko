import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import { Card, Image } from 'react-native-elements';
import { SEARCH_MEDIA, GET_POPULAR_MEDIA } from '../graphql/queries';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');

  const { loading: searchLoading, error: searchError, data: searchData } = useQuery(SEARCH_MEDIA, {
    variables: { search: searchText },
    skip: !searchText,
  });

  const { loading: popularLoading, error: popularError, data: popularData } = useQuery(GET_POPULAR_MEDIA, {
    skip: searchText.length > 0,
  });

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const renderMediaList = (mediaList) => {
    return mediaList.map((item) => (
      <Card containerStyle={styles.card} key={item.id}>
        <Image
          source={{ uri: item.coverImage.large }}
          style={styles.coverImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.title}>
            {item.title.english || item.title.romaji}
          </Text>
          <Text style={styles.subtitle}>{item.type}</Text>
          <Text style={styles.subtitle}>Year: {item.startDate.year}</Text>
        </View>
      </Card>
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search Anime or Manga..."
            onChangeText={handleSearch}
            value={searchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={24} color="#6A0DAD" />
            </TouchableOpacity>
          )}
        </View>
        {searchLoading && <Text style={styles.loadingText}>Loading...</Text>}
        {searchError && <Text style={styles.errorText}>Error: {searchError.message}</Text>}
        <ScrollView>
          {searchText.length > 0 && searchData && renderMediaList(searchData.Page.media)}
          {searchText.length === 0 && popularLoading && <Text style={styles.loadingText}>Loading popular media...</Text>}
          {searchText.length === 0 && popularError && <Text style={styles.errorText}>Error: {popularError.message}</Text>}
          {searchText.length === 0 && popularData && renderMediaList(popularData.Page.media)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderColor: '#6A0DAD', // Purple color
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#FFF',
  },
  searchBar: {
    flex: 1,
    height: 50,
    paddingHorizontal: 20,
  },
  clearButton: {
    paddingRight: 10,
  },
  loadingText: {
    textAlign: 'center',
    margin: 20,
    color: '#6A0DAD',
  },
  errorText: {
    textAlign: 'center',
    margin: 20,
    color: 'red',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#6A0DAD',
    marginBottom: 10,
    padding: 10,
  },
  coverImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  cardContent: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },
  subtitle: {
    fontSize: 12,
    color: '#6A0DAD',
  },
});

export default SearchScreen;
