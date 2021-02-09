import { ApiWeather, API_KEY } from '../config';

export const getByLatLon = async (lat: number, lon: number): Promise<unknown> => {
	try {
		const { data } = await ApiWeather.get(`/?lang=pt_br&units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`);
		return data;
	} catch (error) {
		console.log(error);
		console.log(error.response.data);
		return {};
	}
};
