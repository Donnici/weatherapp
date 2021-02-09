import { useEffect, useState, useCallback } from 'react';
import Toast from 'react-native-toast-message';

import { setMinutes, setHours, isAfter, isBefore } from 'date-fns';
import { applySpec, path, pipe, prop } from 'rambda';

import { getByLatLon } from '../services/weather';
import { useGeoLocation } from './location';

type TypeCoords = {
	lat: number;
	lon: number;
};

type Weather = {
	id: number;
	main: string;
	description: string;
	icon: string;
};

type WeatherSpec = {
	city: string;
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	humidity: number;
	img: string;
};

type ReturnWeatherHooks = {
	geo: TypeCoords;
	weather: WeatherSpec;
	loading: boolean;
	locationError: boolean;
	updateWeather: CallableFunction;
};

export const generateiconName = (icon: string): string => {
	const now = new Date();
	const startMorning = setMinutes(setHours(now, 5), 30);
	const startNight = setMinutes(setHours(now, 18), 0);

	if (isBefore(now, startMorning) || isAfter(now, startNight)) {
		return icon.replace('d', 'n');
	}
	return icon;
};
const openWeatherSpec = applySpec({
	city: pipe(prop('name'), String),
	temp: path(['main', 'temp']),
	feels_like: path(['main', 'feels_like']),
	temp_min: path(['main', 'temp_min']),
	temp_max: path(['main', 'temp_max']),
	humidity: path(['main', 'humidity']),
	img: pipe(prop('weather'), (weather: Array<Weather>) =>
		weather && weather.length > 0 ? generateiconName(weather[0].icon) : ''
	)
});

export const useWeather = (): ReturnWeatherHooks => {
	const { geo, loading: geoLoading, locationError } = useGeoLocation();
	const [weather, setWeather] = useState<WeatherSpec>({} as WeatherSpec);
	const [loading, setLoading] = useState(true);

	const getWeatherData = useCallback(async (geoloaction) => {
		if (!!geoloaction.lat && !!geoloaction.lon) {
			const data = await getByLatLon(geoloaction.lat, geoloaction.lon);
			setWeather(openWeatherSpec(data));
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		}
	}, []);

	const updateWeather = async () => {
		const data = await getByLatLon(geo.lat, geo.lon);
		if (Object.keys(data as Record<string, unknown>).length === 0) {
			Toast.show({
				type: 'error',
				position: 'top',
				text1: 'Não foi possível atualizar'
			});
		} else {
			Toast.show({
				type: 'success',
				position: 'top',
				text1: 'Clima atualizado com sucesso!'
			});
			setWeather(openWeatherSpec(data));
		}
	};

	useEffect(() => {
		getWeatherData(geo);
	}, [geo, getWeatherData]);

	return {
		geo,
		weather,
		loading: (loading || geoLoading) && !locationError,
		locationError,
		updateWeather
	};
};
