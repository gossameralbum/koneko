import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SearchScreen from '../screens/SearchScreen';
import AnimeListScreen from '../screens/Animanga/AnimeListScreen';
import MangaListScreen from '../screens/Animanga/MangaListScreen';
import ListsScreen from '../screens/ListsScreen';

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function AnimangaTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="AnimeList" component={AnimeListScreen} options={{ title: 'Anime' }} />
      <TopTab.Screen name="MangaList" component={MangaListScreen} options={{ title: 'Manga' }} />
    </TopTab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <BottomTab.Screen name="Animanga" component={AnimangaTabs} />
        <BottomTab.Screen name="Lists" component={ListsScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
