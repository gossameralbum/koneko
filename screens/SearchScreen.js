import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useQuery } from '@apollo/client';
import { Card, Image } from 'react-native-elements';
import { SEARCH_MEDIA } from '../graphql/queries';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');

 const { loading, error, data } = useQuery(SEARCH_MEDIA, {
  variables: { search: searchText },
  skip: !searchText,
});

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Anime or Manga..."
        onChangeText={handleSearch}
        value={searchText}
      />
      {loading && <Text style={styles.loadingText}>Loading...</Text>}
      {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
      <ScrollView>
        {data && data.Page.media.map((item) => (
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
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD1DC',
  },
  searchBar: {
    height: 50,
    borderColor: '#800020',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    margin: 10,
    backgroundColor: '#FFF',
  },
  loadingText: {
    textAlign: 'center',
    margin: 20,
    color: '#800020',
  },
  errorText: {
    textAlign: 'center',
    margin: 20,
    color: 'red',
  },
  card: {
    backgroundColor: '#800020',
    borderRadius: 10,
    borderColor: '#800020',
  },
  coverImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  cardContent: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFF',
  },
});

export default SearchScreen;
