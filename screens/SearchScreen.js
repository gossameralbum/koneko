// SearchScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { Card, Image } from 'react-native-elements';
import { SEARCH_MEDIA, GET_POPULAR_MEDIA } from '../graphql/queries';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ITEMS_PER_PAGE = 10;

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [mediaList, setMediaList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  const { loading: searchLoading, error: searchError, data: searchData, fetchMore: fetchMoreSearch } = useQuery(SEARCH_MEDIA, {
    variables: { search: searchText, page: 1, perPage: ITEMS_PER_PAGE },
    skip: !searchText,
    onCompleted: (data) => {
      setMediaList(data.Page.media);
      setHasNextPage(data.Page.pageInfo.hasNextPage);
    },
  });

  const { loading: popularLoading, error: popularError, data: popularData, fetchMore: fetchMorePopular } = useQuery(GET_POPULAR_MEDIA, {
    variables: { page: 1, perPage: ITEMS_PER_PAGE },
    skip: searchText.length > 0,
    onCompleted: (data) => {
      setMediaList(data.Page.media);
      setHasNextPage(data.Page.pageInfo.hasNextPage);
    },
  });

  useEffect(() => {
    if (searchData) {
      setMediaList(searchData.Page.media);
      setHasNextPage(searchData.Page.pageInfo.hasNextPage);
    }
  }, [searchData]);

  useEffect(() => {
    if (popularData) {
      setMediaList(popularData.Page.media);
      setHasNextPage(popularData.Page.pageInfo.hasNextPage);
    }
  }, [popularData]);

  const handleSearch = (text) => {
    setSearchText(text);
    setPage(1);
    setMediaList([]);
  };

  const clearSearch = () => {
    setSearchText('');
    setPage(1);
    setMediaList([]);
  };

  const loadMore = () => {
    if (!hasNextPage || (searchLoading && popularLoading)) return;

    const nextPage = page + 1;
    setPage(nextPage);

    const query = searchText.length > 0 ? fetchMoreSearch : fetchMorePopular;

    query({
      variables: {
        page: nextPage,
        perPage: ITEMS_PER_PAGE,
        search: searchText.length > 0 ? searchText : undefined,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setMediaList((prevMediaList) => [...prevMediaList, ...fetchMoreResult.Page.media]);
        setHasNextPage(fetchMoreResult.Page.pageInfo.hasNextPage);
      },
    });
  };

  const renderMediaItem = ({ item }) => {
    const count = item.type === 'ANIME' ? item.episodes : item.chapters;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('MediaDetails', { id: item.id, type: item.type })}>
        <Card containerStyle={styles.card}>
          <View style={styles.cardContent}>
            <Image
              source={{ uri: item.coverImage.large }}
              style={styles.coverImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title.english || item.title.romaji}</Text>
              <Text style={styles.subtitle}>Episodes/Chapters: {count || 'N/A'}</Text>
              <Text style={styles.subtitle}>Year: {item.startDate.year}</Text>
              <Text style={styles.subtitle}>Type: {item.type}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
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
        {searchLoading && page === 1 && <Text style={styles.loadingText}>Loading...</Text>}
        {searchError && <Text style={styles.errorText}>Error: {searchError.message}</Text>}
        {popularLoading && page === 1 && <Text style={styles.loadingText}>Loading popular media...</Text>}
        {popularError && <Text style={styles.errorText}>Error: {popularError.message}</Text>}
        <FlatList
          data={mediaList}
          renderItem={renderMediaItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (searchLoading || popularLoading) && <ActivityIndicator size="large" color="#6A0DAD" />}
        />
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
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  coverImage: {
    width: 80,
    height: 120,
    borderRadius: 10,
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
