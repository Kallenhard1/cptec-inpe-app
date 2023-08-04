import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

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

import theme from '../helper/theme'

import data from '../service/api';

const LeftContent = props => <Avatar.Icon {...props} icon="weather-sunny" />

interface Idata {
  nome: string;
  uf: string;
  id: number;
}

const WeatherCard: React.FC = () => {
  const { colors } = useTheme<any>();
  const [cities, setCities] = useState<any>();
  const [goBack, setGoBack] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      const response = await data;
      setCities(response);
      return cities;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // console.log(cities);

  const handleNavigate = () => {
    setGoBack(true);
    return goBack;
  }

  useEffect(() => {
    if (goBack) {
      setCities([]);
      setGoBack(false);
    }
    return;
  }, [goBack]);

  return (
    <SafeAreaView>
      <Card style={styles.container} mode='outlined'>
        <ScrollView>
              {cities && cities.length > 0 && goBack === false ? (
              cities.map((city) => (
                  <ScrollView key={city.id}>
                    <Text variant="titleLarge">{city.nome}</Text>
                    <Text variant="bodyMedium">{city.uf}</Text>
                  </ScrollView>
              ))
            ) : (
              <ScrollView>
              <Card style={styles.container} mode='outlined'>
                <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                <Card.Content>
                  <Text>No cities available</Text>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
              </Card>
            </ScrollView>
            )}
              <Card.Actions>
                <Button onPress={handleNavigate} style={colors}>Go Back</Button>
                <Button onPress={handleClick}>Ok</Button>
              </Card.Actions>
          </ScrollView>
        </Card>
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