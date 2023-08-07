import axios from 'axios';

export const baseURL = 'http://192.168.0.5:3000';
export const name = axios.request;

export const getAllCitiesData = axios.get(`${baseURL}/cities`)
  .then((response) => response.data)

export const getCityData = axios.get(`${baseURL}/cities?city:${name}`)
  .then((response) => response.data)

export const getSwellData = axios.get(`${baseURL}/swell/:cityCode/day/:days`)
  .then((response) => response.data)

export const getCurrentCapitalWeatherdata = axios.get(`${baseURL}/weather`)
  .then((response) => response.data)

export const getCurrentAirportWeather = axios.get(`${baseURL}/airportWeather`)
  .then((response) => response.data)

export const getPredictionWeather = axios.get(`${baseURL}/weather/:cityCode/day/:days`)
  .then((response) => response.data)

export default {
  getAllCitiesData,
  getCityData,
  getSwellData,
  getCurrentCapitalWeatherdata,
  getCurrentAirportWeather,
  getPredictionWeather,
};