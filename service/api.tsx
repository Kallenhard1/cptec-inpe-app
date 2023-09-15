import axios from "axios";

export const baseURL = "http://192.168.0.5:3000";
export const name = axios.request;
export const cityCode = axios.request;
export const days = axios.request;

export const getAllCitiesData = axios
  .get(`${baseURL}/cities`)
  .then((response) => response.data);

export const getCurrentCapitalWeatherdata = axios
  .get(`${baseURL}/weather`)
  .then((response) => response.data);

export const getCurrentAirportWeather = axios
  .get(`${baseURL}/airportWeather`)
  .then((response) => response.data);

export const getCityData = async (name: string) => {
  try {
    const response = await axios.get(`${baseURL}/cities?city:${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching prediction all cities data:", error);
    throw error;
  }
};

export const getSwellData = async (cityCode: number, days: number) => {
  try {
    const response = await axios.get(
      `${baseURL}/swell/${cityCode}/day/:${days}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching prediction swell data:", error);
    throw error;
  }
};

export const getPredictionWeather = async (cityCode: number, days: number) => {
  try {
    const response = await axios.get(
      `${baseURL}/weather/${cityCode}/day/${days}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching prediction weather data:", error);
    throw error;
  }
};

export default {
  getAllCitiesData,
  getCityData,
  getSwellData,
  getCurrentCapitalWeatherdata,
  getCurrentAirportWeather,
  getPredictionWeather,
};
