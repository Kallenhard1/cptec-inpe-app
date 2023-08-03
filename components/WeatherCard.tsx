import React, { useState } from 'react';

import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';

import {
  SafeAreaView
} from 'react-native-safe-area-context';

import {
  useTheme,
  Avatar,
  Card,
  Button,
  Text,
} from 'react-native-paper';

import data from '../service/api';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

interface Idata {
  nome: string;
  uf: string;
  id: number;
}

const WeatherCard: React.FC = () => {
  const { colors } = useTheme<any>();
  const [cities, setCities] = useState<any>();

  const handleClick = async () => {
    try {
      const response = await data;
      setCities(response);
      return cities;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  console.log(cities);

  return (
    <SafeAreaView>
      <ScrollView>
        <Card style={styles.container} mode='outlined'>
          <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
          <Card.Content>
          {cities && cities.length > 0 ? (
              cities.map((city) => (
                <ScrollView key={city.id}>
                  <Text variant="titleLarge">{city.nome}</Text>
                  <Text variant="bodyMedium">{city.uf}</Text>
                </ScrollView>
              ))
            ) : (
              <Text>No cities available</Text>
            )}
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button onPress={handleClick}>Ok</Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 48,
  },
  button: {
    width: '100%',
    marginBottom: 14
  },
  registerLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 48
  }
});

export default WeatherCard;