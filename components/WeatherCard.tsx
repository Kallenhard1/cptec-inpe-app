import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  useTheme,
  Avatar,
  Card,
  Button,
  Text,
  TextInput,
} from "react-native-paper";

import theme from "../helper/theme";

import axios from "axios";

import {
  name,
  getAllCitiesData,
  getPredictionWeather,
  cityCode,
} from "../service/api";

const LeftContent = (props: any) => (
  <Avatar.Icon {...props} icon="weather-sunny" />
);

interface Idata {
  cidade: string;
  estado: string;
  cityCode: Promise<number>;
  days: Promise<number>;
  atualizado_em: number;
  clima: [];
}

const WeatherCard: React.FC = () => {
  const { colors } = useTheme<any>();
  const [cities, setCities] = useState<Idata[]>([]);
  const [goBack, setGoBack] = useState<boolean>(false);
  const [cityCode, setCityCode] = useState<number | undefined>();
  const [city, setCity] = useState<string>("");
  const [value, setValue] = useState<string>();
  const [state, setState] = useState<string>("");

  const cityCodes = {
    city: {
      "Rio de Janeiro": "241",
    },
    days: 0,
  };

  const convertTextToNumber = (text: string) => {
    const textQuery = text;
    const code: number = +cityCodes.city["Rio de Janeiro"];
    setValue(textQuery);
    setCityCode(code);
    console.log(`Cidade: ${textQuery}.`);
    console.log(code);
    return code;
  };

  const handleClick = async (code: any) => {
    try {
      const response = await getPredictionWeather(code, 0);
      setCities(response.clima);
      setCity(response.cidade);
      setState(response.estado);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNavigate = () => {
    setGoBack(true);
    return goBack;
  };

  useEffect(() => {
    if (goBack) {
      setCities([]);
      setGoBack(false);
    }
    return;
  }, [goBack]);

  return (
    <SafeAreaView>
      <Card style={styles.container} mode="outlined">
        <ScrollView>
          <View>
            <TextInput
              placeholder="Cidade, estado"
              onChangeText={(e) => convertTextToNumber(e)}
              value={value}
            ></TextInput>
          </View>
          {cities && cities.length > 0 ? (
            <View>
              <Text variant="titleLarge">{city}</Text>
              <Text variant="titleLarge">{state}</Text>
              {cities.map((weather: any, index: number) => (
                <View key={index}>
                  <Text variant="titleMedium">{weather.data}</Text>
                  <Text variant="bodyMedium">{weather.condicao_desc}</Text>
                  <Text variant="bodyMedium">Max: {weather.max}°C</Text>
                  <Text variant="bodyMedium">Min: {weather.min}°C</Text>
                </View>
              ))}
            </View>
          ) : (
            <View>
              <Text>No weather data available</Text>
            </View>
          )}
        </ScrollView>
        <Card.Actions>
          <Button onPress={handleNavigate} style={colors}>
            Go Back
          </Button>
          <Button onPress={() => handleClick(cityCode)}>Ok</Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 48,
  },
  button: {
    width: "100%",
    marginBottom: 14,
  },
  registerLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 48,
  },
});

export default WeatherCard;
