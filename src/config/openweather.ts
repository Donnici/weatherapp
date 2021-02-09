import axios from 'axios';

export const API_KEY = process.env.REACT_APP_WEATHER_KEY;

export const ApiWeather = axios.create({
	baseURL: 'https://api.openweathermap.org/data/2.5/weather',
	timeout: 4000
});
