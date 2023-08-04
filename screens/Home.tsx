import React from 'react';

import { 
  ScrollView,
  StyleSheet,
  View,
  Text } from 'react-native';

import {
  SafeAreaView
} from 'react-native-safe-area-context';

import WeatherCard from '../components/WeatherCard';

const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>
          Home
          <WeatherCard />
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20
  }
});

export default Home;