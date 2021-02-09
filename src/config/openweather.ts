import axios from 'axios';

export const API_KEY = 'a249abe8903480562fae04453078dae8';
// export const API_KEY = process.env.REACT_APP_WEATHER_KEY;

// ?lat={lat}&lon={lon}&appid={API key}
export const ApiWeather = axios.create({
	baseURL: 'https://api.openweathermap.org/data/2.5/weather',
	timeout: 4000
});
