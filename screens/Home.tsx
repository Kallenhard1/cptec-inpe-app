import React from 'react';

import { ScrollView, View, Text } from 'react-native';

import {
  SafeAreaView
} from 'react-native-safe-area-context';

import WeatherCard from '../components/WeatherCard';

const Home: React.FC = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>
          Home
          <WeatherCard />
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;