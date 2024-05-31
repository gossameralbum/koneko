import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';

const MangaListScreen = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const renderTab = (tabName, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => setTabIndex(index)}
        style={[
          styles.tab,
          {
            backgroundColor: tabIndex === index ? '#6A0DAD' : '#FFF',
            borderBottomWidth: tabIndex === index ? 2 : 0,
          },
        ]}
      >
        <Text style={[styles.tabText, { color: tabIndex === index ? '#FFF' : '#6A0DAD' }]}>{tabName}</Text>
      </TouchableOpacity>
    );
  };

  const renderTabs = () => {
    const tabs = ['Reading', 'Completed', 'Planning', 'Paused', 'Dropped'];
    return tabs.map((tab, index) => renderTab(tab, index));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderTabs()}
        </ScrollView>
      </View>
      <View style={styles.tabContent}>
        <Text style={styles.centerText}>Nothing to see here yet! Add mangas to your {['Reading', 'Completed', 'Planning', 'Paused', 'Dropped'][tabIndex]} list.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: StatusBar.currentHeight || 0, // Ensure content doesn't overlap with status bar
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#6A0DAD',
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 0, // Remove button borders
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  centerText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6A0DAD',
  },
});

export default MangaListScreen;
