import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import SearchScreen from '../screens/SearchScreen';
import AnimeListScreen from '../screens/AnimeListScreen';
import MangaListScreen from '../screens/MangaListScreen';
import ListsScreen from '../screens/ListsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Anime') {
              iconName = focused ? 'tv' : 'tv-outline';
            }  else if (route.name === "Manga") {
                iconName = focused? 'book' : 'book-outline';
            } else if (route.name === 'Lists') {
              iconName = focused ? 'list' : 'list-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6A0DAD', // Purple color
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Anime" component={AnimeListScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Manga" component={MangaListScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Lists" component={ListsScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
