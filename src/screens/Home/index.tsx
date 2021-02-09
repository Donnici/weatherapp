/* eslint-disable global-require */
import React, { FC, useRef, useState } from 'react';
import { RefreshCcw } from 'react-native-feather';
import { openSettings } from 'react-native-permissions';
import Animated, { Easing } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@hooks/theme';
import LottieView from 'lottie-react-native';

import Loading from '../../animations/loading.json';
import LocationPermission from '../../animations/locationPermission.json';
import { useCurrentDateTime } from '../../hooks/dateTime';
import { useWeather } from '../../hooks/weather';
import { defineBackground } from '../../theme/colors';
import {
	Container,
	BoxRefresh,
	BoxCity,
	CityText,
	BoxDateTime,
	DayText,
	BoxTemp,
	BoxTempText,
	BoxInfo,
	BoxInfoText,
	LottieStyled,
	BoxInfoItem,
	BoxInfoLabel,
	BoxLocationError,
	BoxLocationErrorText,
	ButtonPermission,
	ButtonPermissionText
} from './home.styled';

const Home: FC = () => {
	const insets = useSafeAreaInsets();
	const dateTime = useCurrentDateTime();
	const { colors } = useTheme();
	const { loading, weather, locationError, updateWeather } = useWeather();
	const spinValue = useRef(new Animated.Value(0)).current;

	const startLoading = () => {
		Animated.timing(spinValue, {
			toValue: 1,
			duration: 1000,
			easing: Easing.linear
		}).start(() =>
			Animated.timing(spinValue, {
				toValue: 0,
				duration: 0,
				easing: Easing.linear
			}).start()
		);
		spinValue.setValue(0);
	};

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['360deg', '0deg']
	});

	const refreshScreen = () => {
		startLoading();
		updateWeather();
	};

	if (loading) {
		return (
			<Container insets={insets}>
				<LottieView source={Loading} autoPlay loop />
			</Container>
		);
	}

	if (locationError) {
		return (
			<Container insets={insets}>
				<BoxLocationError>
					<LottieStyled source={LocationPermission} autoPlay loop />
				</BoxLocationError>
				<BoxLocationError>
					<BoxLocationErrorText>
						Para visualizar os dados da sua cidade precisamos da sua localização
					</BoxLocationErrorText>
					<ButtonPermission onPress={() => openSettings()}>
						<ButtonPermissionText>Permitir</ButtonPermissionText>
					</ButtonPermission>
				</BoxLocationError>
			</Container>
		);
	}

	const getAnimation = (icon: string) => {
		switch (icon) {
			case '01d':
				return require(`../../animations/01d.json`);
			case '01n':
				return require(`../../animations/01n.json`);
			case '02d':
				return require(`../../animations/02d.json`);
			case '02n':
				return require(`../../animations/02n.json`);
			case '03d':
				return require(`../../animations/03d.json`);
			case '03n':
				return require(`../../animations/03n.json`);
			case '04d':
				return require(`../../animations/04d.json`);
			case '04n':
				return require(`../../animations/04n.json`);
			case '10d':
				return require(`../../animations/10d.json`);
			case '10n':
				return require(`../../animations/10n.json`);
			case '11d':
				return require(`../../animations/11d.json`);
			case '11n':
				return require(`../../animations/11n.json`);
			case '13d':
				return require(`../../animations/13d.json`);
			case '13n':
				return require(`../../animations/13n.json`);
			case '50d':
				return require(`../../animations/50d.json`);
			case '50n':
				return require(`../../animations/50n.json`);
			default:
				return require(`../../animations/01d.json`);
		}
	};

	return (
		<Container insets={insets} background={defineBackground()}>
			<BoxRefresh insets={insets} onPress={refreshScreen}>
				<Animated.View style={{ transform: [{ rotate: spin }] }}>
					<RefreshCcw color={colors.text} />
				</Animated.View>
			</BoxRefresh>
			<BoxCity>
				<CityText>{weather.city}</CityText>
				<BoxDateTime>
					<DayText>{dateTime}</DayText>
				</BoxDateTime>
			</BoxCity>
			<BoxTemp>
				<LottieStyled source={getAnimation(weather.img)} autoPlay loop />
			</BoxTemp>
			<BoxTemp>
				<BoxTempText>{Math.floor(weather.temp)}° C</BoxTempText>
			</BoxTemp>
			<BoxInfo>
				<BoxInfoItem>
					<BoxInfoLabel>Min</BoxInfoLabel>
					<BoxInfoText>{Math.floor(weather.temp_min)}° C</BoxInfoText>
				</BoxInfoItem>
				{/* <BoxInfoText>Min: {Math.floor(weather.temp_min)}° C</BoxInfoText> */}
				<BoxInfoItem>
					<BoxInfoLabel>Umidade</BoxInfoLabel>
					<BoxInfoText>{Math.floor(weather.humidity)}%</BoxInfoText>
				</BoxInfoItem>
				<BoxInfoItem>
					<BoxInfoLabel>Max</BoxInfoLabel>
					<BoxInfoText>{Math.floor(weather.temp_max)}° C</BoxInfoText>
				</BoxInfoItem>
			</BoxInfo>
		</Container>
	);
};

export default Home;
