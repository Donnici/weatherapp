import { useCallback, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

type TypeCoords = {
	lat: number;
	lon: number;
};

type ReturnGeoLocationHooks = {
	geo: TypeCoords;
	loading: boolean;
	locationError: boolean;
	requestPermissionToLocation: CallableFunction;
};

export const useGeoLocation = (): ReturnGeoLocationHooks => {
	const [geo, setGeo] = useState<TypeCoords>({} as TypeCoords);
	const [loading, setLoading] = useState(true);
	const [locationError, setLocationError] = useState(false);
	const [statusLocation, setStatusLocation] = useState<string>('');

	const hasLocationPermission = async (): Promise<string> => {
		if (Platform.OS === 'ios') {
			try {
				const resultIOS = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
				const resultAllIOS = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
				if (resultIOS === RESULTS.GRANTED || resultAllIOS === RESULTS.GRANTED) {
					return RESULTS.GRANTED;
				}
				if (resultIOS === RESULTS.LIMITED || resultAllIOS === RESULTS.LIMITED) {
					return RESULTS.LIMITED;
				} 
				return RESULTS.DENIED;
			} catch (error) {
				return RESULTS.DENIED;
			}
		}
		if (Platform.OS === 'android') {
			try {
				const resultAndroid = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
				return resultAndroid;
			} catch (error) {
				return RESULTS.DENIED;
			}
		}
		return RESULTS.DENIED;
	};

	const requestPermissionToLocation = async (): Promise<void> => {
		const status = await hasLocationPermission();
		if (status === RESULTS.DENIED || status === RESULTS.BLOCKED) {
			openSettings();
		} else {
			await requestPermission(status);
		}
	};

	const requestPermission = async (status: string): Promise<void> => {
		if (status === RESULTS.GRANTED) {
			setLocationError(false);
			setStatusLocation(RESULTS.GRANTED);
		}
		if (Platform.OS === 'ios') {
			try {
				const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
				if (result === RESULTS.GRANTED) {
					setLocationError(false);
					setStatusLocation(RESULTS.GRANTED);
				} else {
					setLocationError(true);
				}
			} catch (error) {
				setLocationError(true);
			}
		}
		if (Platform.OS === 'android') {
			try {
				const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
				if (result === RESULTS.GRANTED) {
					setLocationError(false);
					setStatusLocation(RESULTS.GRANTED);
				} else {
					setLocationError(true);
				}
			} catch (error) {
				setLocationError(true);
			}
		}
		setLocationError(true);
	};

	const currentPosition = useCallback(async () => {
		Geolocation.getCurrentPosition(
			(position) =>
				setGeo({
					lat: position.coords.latitude,
					lon: position.coords.longitude
				}),
			(error) => Alert.alert('Error', JSON.stringify(error)),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		hasLocationPermission()
			.then((status) => {
				requestPermission(status)
					.then(() => {
						console.log(status);
						setLocationError(status !== RESULTS.GRANTED);
					})
					.catch(() => setLocationError(true));
			})
			.catch(() => setLocationError(true));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (statusLocation === RESULTS.GRANTED || statusLocation === RESULTS.LIMITED) {
			currentPosition();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [statusLocation]);

	return {
		geo,
		loading,
		locationError,
		requestPermissionToLocation
	};
};
